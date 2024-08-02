import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
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
	const windowHeight = Dimensions.get("window").height;
	return (
		<View
			style={[
				styles.chevronIconsContainer,
				{ maxHeight: windowHeight * 0.08 }
			]}>
			<TouchableOpacity activeOpacity={1} onPress={handleExpandGenreList}>
				<Animated.View style={topChevronStyle}>
					<MaterialCommunityIcons
						name={isExpanded ? "chevron-down" : "chevron-up"}
						color={"#FFFFFF"}
						size={isExpanded ? 46 : 45}
					/>
				</Animated.View>
				<Animated.View style={bottomChevronStyle}>
					<MaterialCommunityIcons
						name={isExpanded ? "chevron-up" : "chevron-down"}
						color={"#FFFFFF"}
						size={isExpanded ? 46 : 45}
					/>
				</Animated.View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	chevronIconsContainer: {
		display: "flex",
		zIndex: 200,
		flexDirection: "column",
		justifyContent: "center"
	}
});

export default ChevronComponent;
