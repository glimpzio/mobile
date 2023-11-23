import { FlatList, Platform } from "react-native";
import { gql, useQuery } from "@apollo/client";
import * as ClipBoard from "expo-clipboard";
import { Button, Container, Text } from "../../components";
import { COLOR_ZINC_900, COLOR_ZINC_950 } from "../../utils";

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
            <Container direction="vertical-center" pad style={{ backgroundColor: COLOR_ZINC_950 }}>
                <Text alignment="center" type="normal">
                    Loading...
                </Text>
            </Container>
        );

    if (error)
        return (
            <Container direction="vertical-center" pad style={{ backgroundColor: COLOR_ZINC_950 }}>
                <Text alignment="center" type="normal">
                    Failed to fetch data.
                </Text>
            </Container>
        );

    return (
        <Container direction="vertical-start" pad style={{ backgroundColor: COLOR_ZINC_950 }}>
            <Container direction="none" pad>
                <Text alignment="center" type="sm">
                    Users who share their email address with you after signing up via your invite link will show up here.
                </Text>
            </Container>
            <FlatList
                data={data!.emailConnections}
                renderItem={({ item, index }) => (
                    <Container direction="none" pad style={{ backgroundColor: COLOR_ZINC_900 }} key={index}>
                        <Container direction="none">
                            <Text alignment="center" type="normal">
                                {item.email}
                            </Text>
                        </Container>
                        <Button
                            color="sky"
                            title="Copy Email"
                            onPress={async () => {
                                if (Platform.OS === "web") navigator.clipboard.writeText(item.email);
                                else await ClipBoard.setUrlAsync(item.email);
                            }}
                        />
                        <Container direction="none">
                            <Text alignment="center" type="sm">
                                Connected on {new Date(item.connectedAt * 1000).toDateString()}
                            </Text>
                        </Container>
                    </Container>
                )}
                keyExtractor={(item) => item.id}
            />
        </Container>
    );
}
