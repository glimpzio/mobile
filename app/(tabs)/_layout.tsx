import { Tabs } from "expo-router";
import { useAuth } from "../../hooks";

export default function Test() {
    useAuth(true);

    return (
        <Tabs>
            <Tabs.Screen name="connect" options={{ headerTitle: "Connect", tabBarLabel: "Connect" }} />
            <Tabs.Screen name="connections" options={{ headerTitle: "My Connections", tabBarLabel: "Connections" }} />
            <Tabs.Screen name="profile" options={{ headerTitle: "My Profile", tabBarLabel: "Profile" }} />
        </Tabs>
    );
}
