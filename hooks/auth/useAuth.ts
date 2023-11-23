import * as SecureStore from "expo-secure-store";
import * as ExpoCrypto from "expo-crypto";
import * as WebBrowser from "expo-web-browser";

import { useContext, useEffect } from "react";
import { AuthData, authContext } from "./authProvider";
import { Platform } from "react-native";
import { Buffer } from "buffer";
import { useRouter } from "expo-router";

const KEY = "KEY_AUTH_TOKEN";

function jwtDecode(token: string) {
    const parts = token.split(".").map((part) => Buffer.from(part.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString());

    return JSON.parse(parts[1]);
}

function generateNonce() {
    var charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz+/";
    let result = "";

    let length = 16;

    while (length > 0) {
        const random = ExpoCrypto.getRandomBytes(16);

        random.forEach(function (c) {
            if (length == 0) {
                return;
            }
            if (c < charset.length) {
                result += charset[c];
                length--;
            }
        });
    }

    return result;
}

function parseResultUrl(url: string) {
    const params = url
        .split("#")[1]
        .split("&")
        .map((param) => param.split("="));

    return params;
}

function findParam(param: string, params: string[][]) {
    const out = params.filter((x) => x[0] === param);
    if (out.length === 0) throw Error("param does not exist");

    return out[0][1];
}

export function useAuth(protect: boolean) {
    const arr = useContext(authContext);
    if (!arr) throw Error("missing auth context provider");

    const [authData, setAuthData] = arr;

    const router = useRouter();

    useEffect(() => {
        if (protect && authData === null) router.push("/auth/signin");
    }, [router, authData, protect]);

    useEffect(() => {
        if (Platform.OS === "web") {
            const item = localStorage.getItem(KEY);
            if (item) {
                const parsedAuthData: AuthData = JSON.parse(item);

                if (Math.floor(Date.now() / 1000) <= parsedAuthData.expiresAt) setAuthData(parsedAuthData);
                else setAuthData(null);
            } else setAuthData(null);
        } else {
            SecureStore.getItemAsync(KEY).then((item) => {
                if (item) {
                    const parsedAuthData: AuthData = JSON.parse(item);

                    if (Math.floor(Date.now() / 1000) <= parsedAuthData.expiresAt) setAuthData(parsedAuthData);
                    else setAuthData(null);
                } else setAuthData(null);
            });
        }
    }, [setAuthData]);

    async function login(uriApp: string, uriWeb: string, auth0Domain: string, auth0ClientId: string, auth0Audience: string): Promise<boolean> {
        let uri: string;
        if (Platform.OS === "web") uri = uriWeb;
        else uri = uriApp;

        const nonce = generateNonce();

        const authUrl = `https://${auth0Domain}/authorize?response_type=token%20id_token&nonce=${nonce}&client_id=${auth0ClientId}&redirect_uri=${encodeURI(
            uri
        )}&scope=openid%20email&audience=${auth0Audience}`;

        const result: any = await WebBrowser.openAuthSessionAsync(authUrl, uri);
        if (!result.url) return false;

        const params = parseResultUrl(result.url);

        const expiresIn = findParam("expires_in", params);
        const accessToken = findParam("access_token", params);
        const idToken = findParam("id_token", params);

        const idTokenDecoded = jwtDecode(idToken);

        const data: AuthData = {
            accessToken: accessToken,
            expiresAt: Math.floor(Date.now() / 1000) + parseInt(expiresIn),
            sub: idTokenDecoded.sub,
            email: idTokenDecoded.email ? idTokenDecoded.email : null,
        };

        setAuthData(data);

        const dataString = JSON.stringify(data);

        if (Platform.OS === "web") localStorage.setItem(KEY, dataString);
        else SecureStore.setItemAsync(KEY, dataString);

        return true;
    }

    function logout() {
        setAuthData(null);

        if (Platform.OS === "web") localStorage.removeItem(KEY);
        else SecureStore.deleteItemAsync(KEY);

        router.push("/auth/signin");
    }

    function completeAuth() {
        WebBrowser.maybeCompleteAuthSession();
    }

    return { login, logout, completeAuth, authData };
}
