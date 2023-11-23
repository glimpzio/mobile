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
            <Stack screenOptions={{ headerStyle: styles.header, headerTitleStyle: styles.title, headerTintColor: styles.title.color }}>
                <Stack.Screen name="index" options={{ title: "Home" }} />
                <Stack.Screen name="auth/signin" options={{ title: "Sign In", presentation: "modal" }} />
                <Stack.Screen name="auth/create" options={{ title: "Create Profile", presentation: "modal" }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: COLOR_ZINC_900,
    },
    title: {
        color: COLOR_WHITE,
    },
});
