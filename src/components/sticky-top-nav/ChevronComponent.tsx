import React from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { RFValue } from "react-native-responsive-fontsize";
import { getResponsiveFontSize } from "@/src/utils/helpers/Responsive";

interface ChevronComponentProps {
	onPress: () => void;
	topChevronStyle: any;
	bottomChevronStyle: any;
	flipChevrons: boolean;
	accentColor: string;
}

const ChevronComponent = ({
	onPress,
	topChevronStyle,
	bottomChevronStyle,
	flipChevrons,
	accentColor
}: ChevronComponentProps) => {
	const windowHeight = Dimensions.get("window").height;
	return (
		<View style={[styles.chevronIconsContainer]}>
			<TouchableOpacity activeOpacity={1} onPress={onPress}>
				<Animated.View style={topChevronStyle}>
					<MaterialCommunityIcons
						name={!flipChevrons ? "chevron-up" : "chevron-down"}
						color={accentColor}
						size={
							flipChevrons
								? getResponsiveFontSize(76)
								: getResponsiveFontSize(75)
						}
					/>
				</Animated.View>
				<Animated.View style={bottomChevronStyle}>
					<MaterialCommunityIcons
						name={!flipChevrons ? "chevron-down" : "chevron-up"}
						color={accentColor}
						size={
							flipChevrons
								? getResponsiveFontSize(76)
								: getResponsiveFontSize(75)
						}
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
		alignItems: "flex-end"
	}
});

export default ChevronComponent;
