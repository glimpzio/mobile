import { Button, Text, View } from "react-native";
import { useAuth } from "../hooks";
import { Link } from "expo-router";

export default function Page() {
    // useAuth(true);

    return (
        <View>
            <Text>Hello world</Text>
            <Link href="/tabs/test" asChild>
                <Button title="Connect" />
            </Link>
        </View>
    );
}
