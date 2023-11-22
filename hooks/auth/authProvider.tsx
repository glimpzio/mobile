import { createContext, useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";

interface Props {
    children: any;
}

export interface AuthData {
    accessToken: string;
    sub: string;
    email: string | null;
    expiresAt: number;
}

export const authContext = createContext<[AuthData | null, React.Dispatch<React.SetStateAction<AuthData | null>>] | null>(null);

export default function AuthProvider(props: Props) {
    const state = useState<AuthData | null>(null);

    useEffect(() => {
        WebBrowser.maybeCompleteAuthSession();
    }, []);

    return <authContext.Provider value={state}>{props.children}</authContext.Provider>;
}
