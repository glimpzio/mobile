import { useAuth } from "../../hooks";
import { Redirect } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function SignIn() {
    // const { login, authData } = useAuth(false);

    const triggerLogin = async () => {
        const appUri = process.env.EXPO_PUBLIC_APP_URI;
        const webUri = process.env.EXPO_PUBLIC_WEB_URI;

        const auth0Domain = process.env.EXPO_PUBLIC_AUTH0_DOMAIN;
        const auth0ClientId = process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID;
        const auth0Audience = process.env.EXPO_PUBLIC_AUTH0_AUDIENCE;

        if (!appUri || !webUri || !auth0Domain || !auth0ClientId || !auth0Audience) throw Error("missing authentication data");

        // await login(appUri, webUri, auth0Domain, auth0ClientId, auth0Audience);
    };

    // if (authData) return <Redirect href="/" />;

    return (
        <View>
            <View>
                <View>
                    <Text>Create Account</Text>
                </View>
                <View>
                    <Text>If you don't have an existing account.</Text>
                </View>
                <View>
                    <Button title="Create Account" onPress={triggerLogin} />
                </View>
            </View>
            <View>
                <Text>Or</Text>
            </View>
            <View>
                <View>
                    <Text>Sign In</Text>
                </View>
                <View>
                    <Text>If you already have an existing account.</Text>
                </View>
                <View>
                    <Button title="Sign In" onPress={triggerLogin} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
