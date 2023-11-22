import { createContext, useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { useRouter } from "expo-router";

interface Props {
    children: any;
}

export interface AuthData {
    accessToken: string;
    sub: string;
    email: string | null;
    expiresAt: number;
}

export const authContext = createContext<[AuthData | null | undefined, React.Dispatch<React.SetStateAction<AuthData | null | undefined>>] | null | undefined>(null);

export default function AuthProvider(props: Props) {
    const state = useState<AuthData | null | undefined>(undefined);

    useEffect(() => {
        WebBrowser.maybeCompleteAuthSession();
    }, []);

    return <authContext.Provider value={state}>{props.children}</authContext.Provider>;
}
