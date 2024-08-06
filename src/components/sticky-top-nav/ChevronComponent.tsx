import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { RFValue } from "react-native-responsive-fontsize";

interface ChevronComponentProps {
	handleExpandGenreList: () => void;
	topChevronStyle: any;
	bottomChevronStyle: any;
	flipChevrons: boolean;
	accentColour: string;
}

const ChevronComponent = ({
	handleExpandGenreList,
	topChevronStyle,
	bottomChevronStyle,
	flipChevrons,
	accentColour
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
						name={!flipChevrons ? "chevron-up" : "chevron-down"}
						color={accentColour}
						size={flipChevrons ? 46 : 45}
					/>
				</Animated.View>
				<Animated.View style={bottomChevronStyle}>
					<MaterialCommunityIcons
						name={!flipChevrons ? "chevron-down" : "chevron-up"}
						color={accentColour}
						size={flipChevrons ? 46 : 45}
					/>
				</Animated.View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	chevronIconsContainer: {
		display: "flex",
		flexDirection: "column"
	}
});

export default ChevronComponent;
