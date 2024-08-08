import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { NavigatorTrack } from "../utils/types/Tracks";
import { Typography } from "../utils/constants/Styles";

interface GenreTitleProps {
	displayedTrack: number;
	tracks?: NavigatorTrack[];
	genreName?: string;
	accentColor?: string;
}

const GenreTitleComponent = ({
	tracks,
	displayedTrack,
	genreName,
	accentColor
}: GenreTitleProps) => {
	return (
		<View style={styles.titleContainer}>
			<Text
				adjustsFontSizeToFit
				numberOfLines={1}
				style={[
					Typography.h1Text,
					{
						color: accentColor
							? accentColor
							: tracks?.[displayedTrack]?.accentColor,
						textAlign: "center"
					}
				]}>
				{genreName ? genreName : tracks?.[displayedTrack]?.genreName}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	titleContainer: {
		textAlign: "center",
		alignItems: "center",
		alignContent: "center",
		flex: 1,
		marginHorizontal: RFValue(5, 580)
	}
});

export default GenreTitleComponent;
