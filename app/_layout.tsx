import { Slot } from "expo-router";
import { AuthProvider } from "../hooks";

export default function Layout() {
    return (
        <AuthProvider>
            <Slot />
        </AuthProvider>
    );
}
