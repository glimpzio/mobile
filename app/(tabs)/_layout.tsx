import { Tabs } from "expo-router";
import { useAuth } from "../../hooks";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Button, StyleSheet } from "react-native";
import { COLOR_WHITE, COLOR_ZINC_900 } from "../../utils";

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
                <Tabs.Screen name="connections" options={{ headerTitle: "Connections", tabBarLabel: "Connections" }} />
                <Tabs.Screen name="profile" options={{ headerTitle: "Profile", tabBarLabel: "Profile", headerRight: () => <Button title="Logout" onPress={logout} /> }} />
            </Tabs>
        </ApolloProvider>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: COLOR_ZINC_900,
    },
    tabBar: {
        backgroundColor: COLOR_ZINC_900,
    },
    title: {
        color: COLOR_WHITE,
    },
});
