import { Tabs } from "expo-router";

export default function TabBar() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#007AFF", headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "Sobre",
        }}
      />
      <Tabs.Screen
        name="[id]"
        options={{
          href: null,
          title: "Detalhes da Tarefa",
        }}
      />
    </Tabs>
  );
}