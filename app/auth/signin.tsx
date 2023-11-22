import { Button, Text, View } from "react-native";
import { useAuth } from "../../hooks";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Page() {
    const router = useRouter();
    const { login, logout, authData } = useAuth(false);

    useEffect(() => {
        if (authData) router.push("/");
        else if (authData === null) {
            const appUri = process.env.EXPO_PUBLIC_APP_URI;
            const webUri = process.env.EXPO_PUBLIC_WEB_URI;

            const auth0Domain = process.env.EXPO_PUBLIC_AUTH0_DOMAIN;
            const auth0ClientId = process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID;
            const auth0Audience = process.env.EXPO_PUBLIC_AUTH0_AUDIENCE;

            if (!appUri || !webUri || !auth0Domain || !auth0ClientId || !auth0Audience) throw Error("missing authentication data");

            login(appUri, webUri, auth0Domain, auth0ClientId, auth0Audience);
        }
    }, [login, authData, router]);

    return (
        <View>
            {authData ? <Text>Already signed in.</Text> : <Text>Signing you in.</Text>}
            <Button title="Logout" onPress={logout} />
        </View>
    );
}
