import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="connect" options={{ headerTitle: "Connect", tabBarLabel: "Connect" }} />
            <Tabs.Screen name="connections" options={{ headerTitle: "My Connections", tabBarLabel: "Connections" }} />
            <Tabs.Screen name="profile" options={{ headerTitle: "My Profile", tabBarLabel: "Profile" }} />
        </Tabs>
    );
}
