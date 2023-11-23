import { Tabs } from "expo-router";
import { useAuth } from "../../hooks";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Button, StyleSheet } from "react-native";

export default function TabLayout() {
    const { authData, logout } = useAuth(true);

    const graphqlApiUrl = process.env.EXPO_PUBLIC_API_URL;
    if (!graphqlApiUrl) throw Error("missing graphql api url");

    const httpLink = createHttpLink({
        uri: graphqlApiUrl,
    });

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${authData ? authData.accessToken : ""}`,
            },
        };
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            <Tabs screenOptions={{ headerStyle: styles.header, headerTitleStyle: styles.title, tabBarStyle: styles.tabBar }}>
                <Tabs.Screen name="connect" options={{ headerTitle: "Connect", tabBarLabel: "Connect" }} />
                <Tabs.Screen name="connections" options={{ headerTitle: "My Connections", tabBarLabel: "Connections" }} />
                <Tabs.Screen name="profile" options={{ headerTitle: "My Profile", tabBarLabel: "Profile", headerRight: () => <Button title="Logout" onPress={logout} /> }} />
            </Tabs>
        </ApolloProvider>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#18181b",
    },
    tabBar: {
        backgroundColor: "#18181b",
    },
    title: {
        color: "#e5e5e5",
        fontWeight: "700",
    },
});
