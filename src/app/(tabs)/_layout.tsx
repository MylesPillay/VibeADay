import { Tabs } from "expo-router";
import React from "react";
import { Dimensions, Text } from "react-native";

import { Colors } from "../../utils/constants/Colors";
import { useColorScheme } from "../../hooks/useColorScheme.web";
import { TabBarIcon } from "../../components/navigation/TabBarIcon";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor:
					Colors[colorScheme === "dark" ? "dark" : "light"].tint,

				tabBarInactiveTintColor: "#FFFFFF75",
				tabBarActiveBackgroundColor: "#000000",
				tabBarInactiveBackgroundColor: "#000000",
				headerShown: false,
				tabBarStyle: {
					height: windowHeight * 0.1,
					backgroundColor:
						Colors[colorScheme === "dark" ? "dark" : "light"].tint
				}
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
