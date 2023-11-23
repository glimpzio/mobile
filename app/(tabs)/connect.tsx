import { gql, useMutation } from "@apollo/client";
import { Platform, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useCache } from "../../hooks/useCache";
import { useEffect, useState } from "react";
import * as ClipBoard from "expo-clipboard";
import { Button, Container, Text } from "../../components";
import { COLOR_NEUTRAL_300, COLOR_ZINC_950 } from "../../utils";

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
    }, [value]);

    if (!profileUrl || !invite)
        return (
            <Container direction="vertical-center" pad expand style={styles.background}>
                <Text alignment="center" type="normal">
                    Missing profile URL.
                </Text>
            </Container>
        );

    return (
        <Container direction="vertical-center" pad expand style={styles.background} scroll>
            <Container
                direction="horizontal-center"
                pad
                onLayout={(event) => {
                    const { width, height } = event.nativeEvent.layout;
                    setContainerSize({ width, height });
                }}
            >
                <QRCode value={profileUrl} backgroundColor={styles.background.backgroundColor} color={COLOR_NEUTRAL_300} size={Math.max(containerSize.width, containerSize.height) * 0.9} />
            </Container>
            <Container direction="horizontal-center" pad>
                <Text alignment="center" type="lg">
                    {invite.createInvite.publicProfile.firstName}
                </Text>
            </Container>
            <Container direction="horizontal-center" pad>
                <Text alignment="center" type="normal">
                    {invite.createInvite.id}
                </Text>
            </Container>
            <Container direction="none">
                <Button
                    color="sky"
                    title="Copy Invite Link"
                    onPress={async () => {
                        if (Platform.OS === "web") navigator.clipboard.writeText(profileUrl);
                        else await ClipBoard.setUrlAsync(profileUrl);
                    }}
                />
            </Container>
        </Container>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: COLOR_ZINC_950,
    },
});
