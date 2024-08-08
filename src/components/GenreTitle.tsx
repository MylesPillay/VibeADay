import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { NavigatorTrack } from "../utils/types/Tracks";
import { Typography } from "../utils/constants/Styles";

interface GenreTitleProps {
	displayedTrack: number;
	tracks?: NavigatorTrack[];
	genreName?: string;
	accentColor?: string;
}

const windowWidth = Dimensions.get("window").width;

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
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		width: windowWidth * 0.77,
		backgroundColor: "#00000025"
	}
});

export default GenreTitleComponent;
