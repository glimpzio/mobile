import { Redirect } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../hooks";

export default function Index() {
    const { completeAuth } = useAuth(false);

    useEffect(() => {
        completeAuth();
    }, []);

    return <Redirect href="/connect" />;
}
