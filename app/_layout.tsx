import { Stack } from "expo-router";
import { AuthProvider } from "../hooks";

export default function Layout() {
    return (
        <AuthProvider>
            <Stack>
                <Stack.Screen name="index" options={{ title: "Home" }} />
                <Stack.Screen name="auth/signin" options={{ title: "Sign In" }} />
                <Stack.Screen name="auth/create" options={{ title: "Create Profile" }} />
            </Stack>
        </AuthProvider>
    );
}
