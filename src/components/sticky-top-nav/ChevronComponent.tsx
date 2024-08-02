import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface ChevronComponentProps {
	isExpanded: boolean;
	handleExpandGenreList: () => void;
	topChevronStyle: any;
	bottomChevronStyle: any;
}

const ChevronComponent = ({
	isExpanded,
	handleExpandGenreList,
	topChevronStyle,
	bottomChevronStyle
}: ChevronComponentProps) => {
	return (
		<View style={styles.chevronIconsContainer}>
			<TouchableOpacity activeOpacity={1} onPress={handleExpandGenreList}>
				<Animated.View style={topChevronStyle}>
					<MaterialCommunityIcons
						name={isExpanded ? "chevron-down" : "chevron-up"}
						color={"#FFFFFF"}
						size={45}
					/>
				</Animated.View>
				<Animated.View style={bottomChevronStyle}>
					<MaterialCommunityIcons
						name={isExpanded ? "chevron-up" : "chevron-down"}
						color={"#FFFFFF"}
						size={45}
					/>
				</Animated.View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	chevronIconsContainer: {
		display: "flex",
		flexDirection: "column",
		margin: "3%",
		marginTop: 0,
		justifyContent: "space-around",
		width: "12%",
		height: "5%",
		alignItems: "center",
		alignSelf: "flex-start"
	}
});

export default ChevronComponent;
