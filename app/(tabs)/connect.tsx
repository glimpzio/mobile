import { gql, useMutation } from "@apollo/client";
import { Button, Platform, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useCache } from "../../hooks/useCache";
import { useEffect, useState } from "react";
import * as ClipBoard from "expo-clipboard";

interface Data {
    createInvite: {
        id: string;
    };
}

export default function Connect() {
    const { value, setValue } = useCache("connect-page");
    const [invite, setInvite] = useState<string | null>(null);

    const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
    if (!baseUrl) throw Error("missing base url");

    const profileUrl = invite ? `${baseUrl}/profile/${invite}` : null;

    const CREATE_INVITE = gql`
        mutation CreateInvite {
            createInvite {
                id
            }
        }
    `;

    const [mutateFunction] = useMutation<Data>(CREATE_INVITE);

    useEffect(() => {
        if (value === undefined) return;
        else if (value === null) {
            mutateFunction().then(({ data }) => {
                if (!data) return;

                const inviteId = data.createInvite.id;
                setValue(inviteId);
            });
        } else setInvite(value);
    }, [value]);

    return (
        <View>
            {profileUrl && (
                <>
                    <QRCode value={profileUrl} />
                    <Text>Code: {invite!}</Text>
                    <Button
                        title="Copy Link"
                        onPress={async () => {
                            if (Platform.OS === "web") navigator.clipboard.writeText(profileUrl);
                            else await ClipBoard.setUrlAsync(profileUrl);
                        }}
                    />
                </>
            )}
        </View>
    );
}
