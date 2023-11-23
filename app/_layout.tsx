import { Stack } from "expo-router";
import { AuthProvider } from "../hooks";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { COLOR_WHITE, COLOR_ZINC_900 } from "../utils";

export default function Layout() {
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        setLoaded(true);

        return () => setLoaded(false);
    }, [setLoaded]);

    if (!loaded) return null;

    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="auth/signin" options={{ presentation: "modal" }} />
                <Stack.Screen name="auth/create" options={{ presentation: "modal" }} />
                <Stack.Screen name="(tabs)" />
            </Stack>
        </AuthProvider>
    );
}
