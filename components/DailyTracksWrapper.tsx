import React, { useState, useRef, useEffect } from "react";
import {
	View,
	FlatList,
	Dimensions,
	ActivityIndicator,
	StyleSheet
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

const genres: string[] = [
	"EasyListening",
	"Garage",
	"UKHipHop",
	"Techno",
	"DrumAndBass"
];

const genreColors: { [key: string]: string } = {
	EasyListening: "#BFD7EA",
	Garage: "#000000",
	UKHipHop: "#A5A299",
	Techno: "#3A2449",
	DrumAndBass: "#C73E1D"
};
function getGenreColor(genre: string): string {
	const normalizedGenre = genre.replace(/[\s-]/g, "");
	return genreColors[normalizedGenre] || "#000000";
}

const TrackGallery = (): JSX.Element => {
	const [tracks, setTracks] = useState<Track[]>([]);
	const [loading, setLoading] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);
	const flatListRef = useRef<FlatList<Track> | null>(null);

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
				console.error("Failed to fetch tracks", error);
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
	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: getGenreColor(tracks[currentIndex]?.genre) }
			]}>
			<View style={styles.stickyHeader}>
				{genres.map((item, index) => (
					<View
						key={index}
						style={[
							styles.genreSquare,
							{
								backgroundColor: getGenreColor(
									tracks[currentIndex]?.genre
								),
								opacity: index === currentIndex ? 1 : 0.5
							}
						]}
					/>
				))}
			</View>
			<FlatList
				ref={flatListRef}
				data={tracks}
				pagingEnabled
				showsVerticalScrollIndicator={false}
				onScroll={(e) => {
					const index = Math.round(
						e.nativeEvent.contentOffset.y /
							Dimensions.get("window").height
					);
					setCurrentIndex(index);
				}}
				renderItem={({ item }) => (
					<View style={styles.trackContainer}>
						<DailyTrackCard
							trackName={item.song_title}
							artistName={item.song_artist}
							genreName={item.genre}
							artwork={{ uri: item.artwork }}
							goToPreviousTrack={goToPreviousTrack}
							goToNextTrack={goToNextTrack}
							bgColour={getGenreColor(
								tracks[currentIndex]?.genre
							)}
						/>
					</View>
				)}
				keyExtractor={(item, index) =>
					item.created_at + index.toString()
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	stickyHeader: {
		position: "absolute",
		top: 50,
		right: 10,
		zIndex: 10
	},
	genreSquare: {
		width: 50,
		height: 50,
		marginVertical: 5
	},
	trackContainer: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
		justifyContent: "center",
		alignItems: "center"
	}
});

export default TrackGallery;
