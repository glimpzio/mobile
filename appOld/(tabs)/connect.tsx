import { gql, useMutation } from "@apollo/client";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useCache } from "../../hooks/useCache";
import { useEffect, useState } from "react";
import * as ClipBoard from "expo-clipboard";
import { ScrollView } from "react-native-gesture-handler";

interface Data {
    createInvite: {
        id: string;
        publicProfile: {
            firstName: string;
        };
    };
}

export default function Connect() {
    const { value, setValue } = useCache("connect-page");
    const [invite, setInvite] = useState<Data | null>(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
    if (!baseUrl) throw Error("missing base url");

    const profileUrl = invite ? `${baseUrl}/profile/${invite.createInvite.id}` : null;

    const CREATE_INVITE = gql`
        mutation CreateInvite {
            createInvite {
                id
                publicProfile {
                    firstName
                }
            }
        }
    `;

    const [mutateFunction] = useMutation<Data>(CREATE_INVITE);

    useEffect(() => {
        if (value === undefined) return;
        else if (value === null) {
            mutateFunction().then(({ data }) => {
                if (!data) return;

                setValue(JSON.stringify(data));
            });
        } else setInvite(JSON.parse(value));
    }, [value, setInvite]);

    if (!profileUrl || !invite)
        return (
            <View>
                <Text>Missing profile URL.</Text>
            </View>
        );

    return (
        <ScrollView>
            <View
                onLayout={(event) => {
                    const { width, height } = event.nativeEvent.layout;
                    setContainerSize({ width, height });
                }}
            >
                <QRCode value={profileUrl} size={Math.max(containerSize.width, containerSize.height) * 0.9} />
            </View>
            <View>
                <Text>{invite.createInvite.publicProfile.firstName}</Text>
            </View>
            <View>
                <View>{invite.createInvite.id}</View>
            </View>
            <View>
                <Button
                    title="Copy Invite Link"
                    onPress={async () => {
                        if (Platform.OS === "web") navigator.clipboard.writeText(profileUrl);
                        else await ClipBoard.setUrlAsync(profileUrl);
                    }}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
