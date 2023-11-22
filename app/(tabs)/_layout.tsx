import { Tabs } from "expo-router";
import { useAuth } from "../../hooks";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export default function TabLayout() {
    const { authData } = useAuth(true);

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
            <Tabs>
                <Tabs.Screen name="connect" options={{ headerTitle: "Connect", tabBarLabel: "Connect" }} />
                <Tabs.Screen name="connections" options={{ headerTitle: "My Connections", tabBarLabel: "Connections" }} />
                <Tabs.Screen name="profile" options={{ headerTitle: "My Profile", tabBarLabel: "Profile" }} />
            </Tabs>
        </ApolloProvider>
    );
}
