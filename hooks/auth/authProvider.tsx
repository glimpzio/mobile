import { createContext, useState } from "react";

interface Props {
    children: any;
}

export interface AuthData {
    accessToken: string;
    sub: string;
    email: string | null;
    expiresAt: number;
}

export const authContext = createContext<[AuthData | null | undefined, React.Dispatch<React.SetStateAction<AuthData | null | undefined>>] | null | undefined>(undefined);

export default function AuthProvider(props: Props) {
    const state = useState<AuthData | null | undefined>(undefined);

    // return <authContext.Provider value={state}>{props.children}</authContext.Provider>;
    return <authContext.Provider value={state}></authContext.Provider>;
}
