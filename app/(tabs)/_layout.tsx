import { Tabs } from "expo-router";
import { useAuth } from "../../hooks";
import { Button } from "react-native";

export default function TabLayout() {
    const { logout } = useAuth(true);

    return (
        <Tabs>
            <Tabs.Screen name="connect" options={{ headerTitle: "Connect", tabBarLabel: "Connect", headerRight: () => <Button title="Logout" onPress={logout} /> }} />
            <Tabs.Screen name="connections" options={{ headerTitle: "My Connections", tabBarLabel: "Connections" }} />
            <Tabs.Screen name="profile" options={{ headerTitle: "My Profile", tabBarLabel: "Profile" }} />
        </Tabs>
    );
}
