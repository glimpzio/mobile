import { Stack } from "expo-router";
import { AuthProvider } from "../hooks";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export default function Layout() {
    const graphqlApiUrl = process.env.EXPO_PUBLIC_API_URL;
    if (!graphqlApiUrl) throw Error("missing graphql api url");

    const client = new ApolloClient({
        uri: graphqlApiUrl,
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            <AuthProvider>
                <Stack>
                    <Stack.Screen name="index" options={{ title: "Home" }} />
                    <Stack.Screen name="auth/signin" options={{ title: "Sign In" }} />
                    <Stack.Screen name="auth/create" options={{ title: "Create Profile" }} />
                </Stack>
            </AuthProvider>
        </ApolloProvider>
    );
}
