import { useAuth } from "../../hooks";
import { Redirect } from "expo-router";
import { Container, Button, Text } from "../../components";
import { COLOR_ZINC_950 } from "../../utils";

export default function SignIn() {
    const { login, authData } = useAuth(false);

    const triggerLogin = async () => {
        const appUri = process.env.EXPO_PUBLIC_APP_URI;
        const webUri = process.env.EXPO_PUBLIC_WEB_URI;

        const auth0Domain = process.env.EXPO_PUBLIC_AUTH0_DOMAIN;
        const auth0ClientId = process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID;
        const auth0Audience = process.env.EXPO_PUBLIC_AUTH0_AUDIENCE;

        if (!appUri || !webUri || !auth0Domain || !auth0ClientId || !auth0Audience) throw Error("missing authentication data");

        await login(appUri, webUri, auth0Domain, auth0ClientId, auth0Audience);
    };

    if (authData) return <Redirect href="/" />;

    return (
        <Container direction="vertical-center" pad expand style={{ backgroundColor: COLOR_ZINC_950 }}>
            <Container direction="vertical-end" expand>
                <Container direction="none">
                    <Text alignment="center" type="xl">
                        Create Account
                    </Text>
                </Container>
                <Container direction="none">
                    <Text alignment="center" type="sm">
                        If you don't have an existing account.
                    </Text>
                </Container>
                <Container direction="none">
                    <Button color="sky" title="Create Account" onPress={triggerLogin} />
                </Container>
            </Container>
            <Container direction="vertical-center" pad>
                <Text alignment="center" type="sm">
                    Or
                </Text>
            </Container>
            <Container direction="vertical-start" pad expand>
                <Container direction="none">
                    <Text alignment="center" type="xl">
                        Sign In
                    </Text>
                </Container>
                <Container direction="none">
                    <Text alignment="center" type="sm">
                        If you already have an existing account.
                    </Text>
                </Container>
                <Container direction="none">
                    <Button color="sky" title="Sign In" onPress={triggerLogin} />
                </Container>
            </Container>
        </Container>
    );
}
