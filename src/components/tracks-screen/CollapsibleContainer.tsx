import {
	containerStyle,
	handleExpandGenreList
} from "@/src/utils/constants/Animations";
import { NavigatorTrack, Track } from "@/src/utils/types/Tracks";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	withTiming
} from "react-native-reanimated";
import GenreListSelector from "../GenreListSelector";
import ChevronComponent from "../sticky-top-nav/ChevronComponent";

interface CollapsibleContainerProps {
	isExpanded: boolean;
	setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
	flipChevrons: boolean | undefined;
	setFlipChevrons: React.Dispatch<React.SetStateAction<boolean | undefined>>;
	handleGenreListSelection: (index: number) => void;
	navigatorTracks: NavigatorTrack[];
	displayedTrack: number;
	tracks: Track[];
	handleDaySelection: (selectedDay: string) => void;
	genreNameTextAnimationStyle: any;
	dayListAnimationStyles: any;
	topChevronStyle: any;
	bottomChevronStyle: any;
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CollapsibleContainer = ({
	isExpanded,
	setIsExpanded,
	flipChevrons,
	setFlipChevrons,
	handleGenreListSelection,
	navigatorTracks,
	displayedTrack,
	tracks,
	handleDaySelection,
	genreNameTextAnimationStyle,
	dayListAnimationStyles,
	topChevronStyle,
	bottomChevronStyle
}: CollapsibleContainerProps): JSX.Element => {
	const animatedContentStyle = useAnimatedStyle(() => {
		return {
			height: withTiming(isExpanded ? windowHeight * 0.7 : 0, {
				duration: 300
			})
			// opacity: withTiming(isExpanded ? 1 : 0, { duration: 300 })
		};
	});

	return (
		// 	<Animated.View
		// 		style={[
		// 			styles.collapsibleContainer,
		// 			{
		// 				height: windowHeight * 0.1,
		// 				width: windowWidth * 0.97
		// 			},
		// 			containerStyle,
		// 			{
		// 				backgroundColor: navigatorTracks?.[displayedTrack]?.bgColor
		// 			}
		// 		]}>
		// 		{isExpanded ? (
		// 			<View
		// 				style={{
		// 					zIndex: 300,

		// 					backgroundColor:
		// 						navigatorTracks?.[displayedTrack]?.bgColor
		// 					// paddingVertical: windowHeight * 0.05
		// 				}}>
		// 				<GenreListSelector
		// 					tracks={navigatorTracks}
		// 					displayedTrack={displayedTrack}
		// 					isExpanded={isExpanded}
		// 					setFlipChevrons={setFlipChevrons}
		// 					handleGenreListSelection={(index: number) => {
		// 						handleGenreListSelection(index);
		// 					}}
		// 					genreNameAnimationStyle={genreNameTextAnimationStyle}
		// 					dayListAnimationStyles={dayListAnimationStyles}
		// 					accentColor={
		// 						navigatorTracks[displayedTrack]?.accentColor
		// 					}
		// 					drop_day={tracks[displayedTrack]?.drop_day}
		// 					handleDaySelection={handleDaySelection}
		// 					setIsExpanded={setIsExpanded}
		// 				/>
		// 			</View>
		// 		) : (
		// 			<></>
		// 		)}

		// 		<View style={styles.collapsibleChevron}>
		// 			<ChevronComponent
		// 				onPress={() =>
		// 					handleExpandGenreList(
		// 						isExpanded,
		// 						setIsExpanded,
		// 						setFlipChevrons
		// 					)
		// 				}
		// 				topChevronStyle={topChevronStyle}
		// 				bottomChevronStyle={bottomChevronStyle}
		// 				flipChevrons={!!flipChevrons}
		// 				accentColor={navigatorTracks[displayedTrack]?.accentColor}
		// 			/>
		// 		</View>
		// 	</Animated.View>
		// );
		<View style={styles.container}>
			<Animated.View
				style={[
					styles.background,
					{
						backgroundColor:
							navigatorTracks?.[displayedTrack]?.bgColor
					}
				]}
			/>
			<Animated.View
				style={[styles.animatedContent, animatedContentStyle]}>
				<GenreListSelector
					tracks={navigatorTracks}
					displayedTrack={displayedTrack}
					isExpanded={isExpanded}
					setFlipChevrons={setFlipChevrons}
					handleGenreListSelection={handleGenreListSelection}
					genreNameAnimationStyle={genreNameTextAnimationStyle}
					dayListAnimationStyles={dayListAnimationStyles}
					accentColor={navigatorTracks[displayedTrack]?.accentColor}
					drop_day={tracks[displayedTrack]?.drop_day}
					handleDaySelection={handleDaySelection}
					setIsExpanded={setIsExpanded}
				/>
			</Animated.View>
			<View style={styles.chevronContainer}>
				<ChevronComponent
					onPress={() =>
						handleExpandGenreList(
							isExpanded,
							setIsExpanded,
							setFlipChevrons
						)
					}
					topChevronStyle={topChevronStyle}
					bottomChevronStyle={bottomChevronStyle}
					flipChevrons={!!flipChevrons}
					accentColor={navigatorTracks[displayedTrack]?.accentColor}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	// chevronContainer: {
	// 	justifyContent: "center"
	// },
	collapsibleChevron: {
		display: "flex",
		zIndex: 5
	},
	collapsibleContainer: {
		position: "absolute",
		bottom: 0,
		maxHeight: "100%",
		paddingBottom: windowHeight * 0.075,
		backgroundColor: "purple",
		justifyContent: "space-between",
		alignSelf: "center"
	},
	container: {
		position: "absolute",
		bottom: 0,
		width: windowWidth,
		backgroundColor: "transparent"
	},
	animatedContent: {
		width: "100%",
		overflow: "hidden"
	},
	chevronContainer: {
		height: windowHeight * 0.1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center"
	},
	background: {
		...StyleSheet.absoluteFillObject
	}
});

export default CollapsibleContainer;
