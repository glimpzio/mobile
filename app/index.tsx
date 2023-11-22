import { Button, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../hooks";

export default function Page() {
    const { authData, login, logout } = useAuth(true);

    return (
        <View style={styles.container}>
            <Text>Hello world</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
