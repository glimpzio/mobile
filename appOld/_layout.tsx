import { Stack } from "expo-router";
import { AuthProvider } from "../hooks";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { BACKGROUND_DARK, BACKGROUND_LIGHT, PADDING_FULL, TEXT_BOLD_MD, TEXT_DARK_3, TEXT_SIZE_MD } from "../utils";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function Layout() {
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        setLoaded(true);

        return () => setLoaded(false);
    }, [setLoaded]);

    if (!loaded) return null;

    return (
        <BottomSheetModalProvider>
            <Stack
                screenOptions={{
                    header: ({ options: { title } }) => (
                        <SafeAreaView style={styles.safeView}>
                            <View style={styles.header}>
                                <Text style={styles.headerText}>{title}</Text>
                            </View>
                        </SafeAreaView>
                    ),
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="auth/signin" options={{ presentation: "modal", title: "Sign In" }} />
                <Stack.Screen name="auth/create" options={{ presentation: "modal" }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </BottomSheetModalProvider>
    );
}

const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        backgroundColor: BACKGROUND_DARK,
    },
    header: {
        padding: PADDING_FULL,
        backgroundColor: BACKGROUND_LIGHT,
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        fontWeight: TEXT_BOLD_MD,
        fontSize: TEXT_SIZE_MD,
        color: TEXT_DARK_3,
    },
});
