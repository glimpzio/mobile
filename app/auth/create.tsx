import { Button, Text, View } from "react-native";
import { useAuth } from "../../hooks";

export default function Page() {
    const { logout } = useAuth(true);

    return (
        <View>
            <Text>Create a new profile</Text>
            {/* **** I'm gonna have an edit profile button at the top for them to do so and then within that there will be the logout button */}
        </View>
    );
}
