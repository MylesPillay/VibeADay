import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import { genreAccentColors, genreColors } from "../utils/constants/Colors";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const LoadingComponent = () => {
	return (
		<View style={styles.container}>
			<View style={styles.loadingView}>
				<ActivityIndicator
					color={genreAccentColors[1]?.toString()}
					size={"large"}
				/>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	loadingView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: genreColors[1]?.toString(),
		width: windowWidth,
		height: windowHeight
	}
});

export default LoadingComponent;
