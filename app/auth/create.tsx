import { Button, Text, View } from "react-native";
import { useAuth } from "../../hooks";

export default function Page() {
    const { logout } = useAuth(true);

    return (
        <View>
            <Text>Create a new profile</Text>
        </View>
    );
}
