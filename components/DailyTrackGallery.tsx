import React, { useState, useRef, useEffect } from "react";
import {
	View,
	FlatList,
	Dimensions,
	ScrollView,
	Button,
	ActivityIndicator
} from "react-native";
import { createClient } from "@supabase/supabase-js";
import DailyTrackCard from "./DailyTrackCard";
interface Track {
	created_at: string;
	song_title: string;
	song_artist: string;
	genre: string;
	spotify_url: string;
	soundcloud_url: string;

	artwork: string;
}
interface TrackGalleryProps {
	tracks?: {
		data: Track[];
	};
}
const TrackGallery = (): JSX.Element => {
	const [tracks, setTracks] = useState<Track[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [currentIndex, setCurrentIndex] = useState(2);
	const flatListRef = useRef<FlatList<Track> | null>(null);
	const windowWidth = Dimensions.get("window").width;

	useEffect(() => {
		const fetchTracks = async () => {
			const supabase = createClient(
				"https://ibxvkrljdklwqhiovpma.supabase.co",
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlieHZrcmxqZGtsd3FoaW92cG1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2NjQ5NzEsImV4cCI6MjAzNDI0MDk3MX0.C8Ns1R3PnRTKnG0oP4xWD2z595r3LBiZusRnrggwNLI"
			);
			try {
				let { data, error } = await supabase
					.from("dailyTracks")
					.select("*");
				if (error) throw error;
				if (data) {
					setTracks(data);
				}
			} catch (error) {
				setError("Failed to fetch tracks");
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchTracks();
	}, []);

	const goToPreviousTrack = () => {
		if (currentIndex > 0) {
			flatListRef.current?.scrollToIndex({
				index: currentIndex - 1,
				animated: true
			});
			setCurrentIndex(currentIndex - 1);
		}
	};

	const goToNextTrack = () => {
		if (currentIndex < tracks.length - 1) {
			flatListRef.current?.scrollToIndex({
				index: currentIndex + 1,
				animated: true
			});
			setCurrentIndex(currentIndex + 1);
		}
	};

	if (loading) {
		return <ActivityIndicator size='large' />;
	}

	if (error) {
		console.log(error, "this is the error message");
	}

	return (
		<View
			style={{
				flex: 1,
				height: "100%",

				justifyContent: "center",
				alignContent: "center",
				alignItems: "center"
			}}>
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
					<View
						style={{
							width: windowWidth,
							height: "100%",
							justifyContent: "center",
							alignContent: "center",
							alignItems: "center"
						}}>
						<DailyTrackCard
							trackName={item.song_title}
							artistName={item.song_artist}
							genreName={item.genre}
							artwork={{ uri: item.artwork }}
							goToPreviousTrack={goToPreviousTrack}
							goToNextTrack={goToNextTrack}
						/>
					</View>
				)}
				keyExtractor={(item, index) =>
					item.created_at + index.toString()
				}
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
