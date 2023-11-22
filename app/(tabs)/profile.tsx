import { Button, Text, View } from "react-native";
import { useAuth } from "../../hooks";

export default function Profile() {
    const { logout } = useAuth(false);

    return (
        <View>
            <Text>Profile</Text>
            <Button title="Logout" onPress={logout} />
        </View>
    );
}
