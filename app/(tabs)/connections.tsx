import { Button, Linking, Text, View } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { Link } from "expo-router";

interface Data {
    emailConnections: {
        id: string;
        userId: string;
        email: string;
        connectedAt: number;
    }[];
}

export default function Connections() {
    const GET_CONNECTIONS = gql`
        query GetConnections {
            emailConnections {
                id
                userId
                email
                connectedAt
            }
        }
    `;

    const { loading, error, data } = useQuery<Data>(GET_CONNECTIONS);

    if (loading)
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );

    if (error)
        return (
            <View>
                <Text>Failed to fetch data.</Text>
            </View>
        );

    return (
        <View>
            {data?.emailConnections.map((connection, i) => (
                <View key={i}>
                    <Button title={connection.email} onPress={() => Linking.openURL(`mailto:${connection.email}`)} />
                    <Text>{new Date(connection.connectedAt * 1000).toDateString()}</Text>
                </View>
            ))}
        </View>
    );
}
