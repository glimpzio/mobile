import { Tabs } from "expo-router";
import { useAuth } from "../../hooks";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
    const { authData } = useAuth(true);

    if (!authData) return null;

    const graphqlApiUrl = process.env.EXPO_PUBLIC_API_URL;
    if (!graphqlApiUrl) throw Error("missing graphql api url");

    const httpLink = createHttpLink({
        uri: graphqlApiUrl,
    });

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${authData.accessToken}`,
            },
        };
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            <Tabs
                screenOptions={{
                    header: ({}) => (
                        <SafeAreaView>
                            <View>
                                <Text>Hello World</Text>
                            </View>
                        </SafeAreaView>
                    ),
                }}
            >
                <Tabs.Screen name="connect" options={{ tabBarLabel: "Connect", tabBarIcon: ({ color, size }) => <Ionicons name="link" size={size} color={color} /> }} />
                <Tabs.Screen name="connections" options={{ tabBarLabel: "Connections", tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} /> }} />
                <Tabs.Screen name="profile" options={{ tabBarLabel: "Profile", tabBarIcon: ({ color, size }) => <Ionicons name="headset" size={size} color={color} /> }} />
            </Tabs>
        </ApolloProvider>
    );
}

const styles = StyleSheet.create({});
