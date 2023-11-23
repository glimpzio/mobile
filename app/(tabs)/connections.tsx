import { Button, FlatList, Linking, Platform, StyleSheet, Text, View } from "react-native";
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
            <View style={styles.rootTextContainer}>
                <Text style={styles.text}>Loading...</Text>
            </View>
        );

    if (error)
        return (
            <View style={styles.rootTextContainer}>
                <Text style={styles.text}>Failed to fetch data.</Text>
            </View>
        );

    return (
        <View style={styles.rootContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.textSmall}>Users who share their email address with you after signing up via your invite link will show up here.</Text>
            </View>
            <FlatList
                data={data!.emailConnections}
                renderItem={({ item, index }) => {
                    const connectedAt = new Date(item.connectedAt * 1000);

                    return (
                        <View style={styles.itemContainer} key={index}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>{item.email}</Text>
                            </View>
                            <Button
                                color={styles.buttonSendColor.color}
                                title="Copy Email"
                                onPress={async () => {
                                    if (Platform.OS === "web") navigator.clipboard.writeText(item.email);
                                    else await ClipBoard.setUrlAsync(item.email);
                                }}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.textSmall}>Connected on {connectedAt.toUTCString()}</Text>
                            </View>
                        </View>
                    );
                }}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "flex-start",
        padding: 16,
        backgroundColor: "#09090b",
    },
    rootTextContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#09090b",
    },
    itemContainer: {
        flex: 1,
        backgroundColor: "#18181b",
        padding: 16,
        marginBottom: 16,
    },
    headerContainer: {
        marginVertical: 24,
    },
    textContainer: {
        marginVertical: 12,
    },
    text: {
        fontSize: 14,
        color: "#a3a3a3",
        fontWeight: "700",
        textAlign: "center",
    },
    textSmall: {
        fontSize: 12,
        color: "#737373",
        fontWeight: "500",
        textAlign: "center",
    },
    buttonSendColor: {
        color: "#0ea5e9",
    },
});
