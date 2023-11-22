import { Button, Text, View } from "react-native";
import { useAuth } from "../hooks";

export default function Page() {
    const { authData, login, logout } = useAuth();

    return (
        <View>
            <Text>Hello world</Text>
            <Text>{JSON.stringify(authData)}</Text>
            <Button
                title="Login"
                onPress={async () => {
                    const appUri = process.env.EXPO_PUBLIC_APP_URI;
                    const webUri = process.env.EXPO_PUBLIC_WEB_URI;

                    const auth0Domain = process.env.EXPO_PUBLIC_AUTH0_DOMAIN;
                    const auth0ClientId = process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID;
                    const auth0Audience = process.env.EXPO_PUBLIC_AUTH0_AUDIENCE;

                    if (!appUri || !webUri || !auth0Domain || !auth0ClientId || !auth0Audience) throw Error("missing authentication data");

                    await login(appUri, webUri, auth0Domain, auth0ClientId, auth0Audience);
                }}
            />
            <Button title="Logout" onPress={logout} />
        </View>
    );
}
