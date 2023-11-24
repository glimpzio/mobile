import { Button, FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { gql, useQuery } from "@apollo/client";
import * as ClipBoard from "expo-clipboard";

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
        <FlatList
            data={data!.emailConnections}
            renderItem={({ item }) => (
                <View>
                    <View>
                        <Text>{item.email}</Text>
                    </View>
                    <Button
                        title="Copy Email"
                        onPress={async () => {
                            if (Platform.OS === "web") navigator.clipboard.writeText(item.email);
                            else await ClipBoard.setUrlAsync(item.email);
                        }}
                    />
                    <View>
                        <Text>Connected on {new Date(item.connectedAt * 1000).toDateString()}</Text>
                    </View>
                </View>
            )}
            keyExtractor={(item) => item.id}
        />
    );
}

const styles = StyleSheet.create({});
