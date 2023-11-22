import { Stack } from "expo-router";
import { AuthProvider } from "../hooks";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { useEffect, useState } from "react";

export default function Layout() {
    const graphqlApiUrl = process.env.EXPO_PUBLIC_API_URL;
    if (!graphqlApiUrl) throw Error("missing graphql api url");

    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        setLoaded(true);

        return () => setLoaded(false);
    }, [setLoaded]);

    if (!loaded) return null;

    const client = new ApolloClient({
        uri: graphqlApiUrl,
        cache: new InMemoryCache(),
    });

    return (
        <AuthProvider>
            <ApolloProvider client={client}>
                <Stack>
                    <Stack.Screen name="index" options={{ title: "Home" }} />
                    <Stack.Screen name="auth/signin" options={{ title: "Sign In", presentation: "modal" }} />
                    <Stack.Screen name="auth/create" options={{ title: "Create Profile", presentation: "modal" }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack>
            </ApolloProvider>
        </AuthProvider>
    );
}
