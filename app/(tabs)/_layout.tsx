import { Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				tabBarInactiveTintColor: "#FFFFFF75",
				tabBarActiveBackgroundColor: "#000000",
				tabBarInactiveBackgroundColor: "#000000",
				headerShown: false
			}}>
			<Tabs.Screen
				name='index'
				options={{
					title: "My Selecta",
					tabBarIcon: ({ focused }) => (
						<TabBarIcon
							name={focused ? "disc" : "disc-outline"}
							color={focused ? "#FFFFFF" : "#FFFFFF75"}
						/>
					),
					tabBarLabel: ({ focused }) => (
						<Text
							style={{
								color: focused ? "#FFFFFF" : "#FFFFFF75",
								fontSize: 12
							}}>
							My Selecta
						</Text>
					)
				}}
			/>
			<Tabs.Screen
				name='_the_crates'
				options={{
					title: "The Crates",
					tabBarIcon: ({ focused }) => (
						<TabBarIcon
							name={focused ? "albums" : "albums-outline"}
							color={focused ? "#FFFFFF" : "#FFFFFF75"}
						/>
					),
					tabBarLabel: ({ focused }) => (
						<Text
							style={{
								color: focused ? "#FFFFFF" : "#FFFFFF75",
								fontSize: 12
							}}>
							The Crates
						</Text>
					)
				}}
			/>
		</Tabs>
	);
}
