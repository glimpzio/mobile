import { Text, View } from "react-native";
import { useAuth } from "../../hooks";

export default function Create() {
    useAuth(true);

    return (
        <View>
            <Text>Create a new profile</Text>
        </View>
    );
}
