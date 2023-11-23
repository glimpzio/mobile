import { InMemoryCache } from "@apollo/client";
import { Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function Connect() {
    // **** Now I need to come up with some cached connection approach (maybe use in memory caching ?)

    return (
        <View>
            <QRCode value="https://www.google.com" />
        </View>
    );
}
