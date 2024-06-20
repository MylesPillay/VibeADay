import React, { useState, useRef, useEffect } from "react";
import { View, FlatList, Dimensions } from "react-native";
import DailyTrackCard from "./DailyTrackCard"; // Import the TrackCard component

const tracks = [
	{
		id: "1",
		trackName: "Track One",
		artistName: "Artist One",
		genreName: "Genre One",
		artwork: require("@/assets/images/Awake.jpg")
	},
	{
		id: "2",
		trackName: "Track Two",
		artistName: "Artist Two",
		genreName: "Genre Two",
		artwork: require("@/assets/images/Cactus.jpg")
	},
	{
		id: "3",
		trackName: "Track Three",
		artistName: "Artist Three",
		genreName: "Genre Three",
		artwork: require("@/assets/images/Dutch_Flowerz.jpg")
	},
	{
		id: "4",
		trackName: "Track Four",
		artistName: "Artist Four",
		genreName: "Genre Four",
		artwork: require("@/assets/images/Mezzanine.jpg")
	},
	{
		id: "5",
		trackName: "Track Five",
		artistName: "Artist Five",
		genreName: "Genre Five",
		artwork: require("@/assets/images/Racing_With_The_Sun.jpg")
	}
];
const TrackGallery = () => {
	const [currentIndex, setCurrentIndex] = useState(2); // Start with the third item (index 2)
	const flatListRef = useRef<FlatList | null>(null);
	const windowWidth = Dimensions.get("window").width;

	const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
		if (viewableItems.length > 0) {
			setCurrentIndex(viewableItems[0].index);
		}
	}).current;

	const viewabilityConfig = useRef({
		itemVisiblePercentThreshold: 50
	}).current;

	const goToPreviousTrack = () => {
		if (currentIndex > 0) {
			flatListRef.current?.scrollToIndex({
				index: currentIndex - 1,
				animated: true
			});
		}
	};

	const goToNextTrack = () => {
		if (currentIndex < tracks.length - 1) {
			flatListRef.current?.scrollToIndex({
				index: currentIndex + 1,
				animated: true
			});
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				ref={flatListRef}
				data={tracks}
				horizontal
				pagingEnabled
				initialScrollIndex={2}
				getItemLayout={(data, index) => ({
					length: windowWidth,
					offset: windowWidth * index,
					index
				})}
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (
					<View style={{ width: windowWidth }}>
						<DailyTrackCard
							trackName={item.trackName}
							artistName={item.artistName}
							genreName={item.genreName}
							artwork={item.artwork}
							goToPreviousTrack={goToPreviousTrack}
							goToNextTrack={goToNextTrack}
						/>
					</View>
				)}
				keyExtractor={(item) => item.id}
				onViewableItemsChanged={onViewableItemsChanged}
				viewabilityConfig={viewabilityConfig}
				onScrollToIndexFailed={(info) => {
					const wait = new Promise((resolve) =>
						setTimeout(resolve, 500)
					);
					wait.then(() => {
						flatListRef.current?.scrollToIndex({
							index: info.index,
							animated: true
						});
					});
				}}
			/>
		</View>
	);
};

export default TrackGallery;
