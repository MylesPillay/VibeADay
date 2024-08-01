import React, { useState, useRef, useEffect } from "react";
import { View, FlatList, Dimensions, ActivityIndicator } from "react-native";
import { createClient } from "@supabase/supabase-js";
import StickyTopNavigator from "./StickyTopNavigator";
import { genreColors } from "../constants/Colors";

interface Track {
	genreName: string;
	created_at: string;
	song_title: string;
	song_artist: string;
	spotify_url?: string;
	soundcloud_url?: string;

	artwork: string;
}

export interface NavigatorTrack {
	genreName: string;
	bgColour: string;
	trackIndex: number;
}
const TrackGallery = (): JSX.Element => {
	const [tracks, setTracks] = useState<Track[]>([]);
	const [navigatorTracks, setNavigatorTracks] = useState<NavigatorTrack[]>(
		[]
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [displayedTrack, setDisplayedTrack] = React.useState<number>(0);
	const flatListRef = useRef<FlatList<Track> | null>(null);
	const windowWidth = Dimensions.get("window").width;
	function getGenreColor(colorId: number): string {
		return genreColors[colorId] || "#000000";
	}

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
					setNavigatorTracks(
						data.map((track, index) => ({
							genreName: track.genre,
							bgColour: getGenreColor(track.genre_id),
							trackIndex: index
						}))
					);
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
		if (displayedTrack > 0) {
			flatListRef.current?.scrollToIndex({
				index: displayedTrack - 1,
				animated: true
			});
			setDisplayedTrack(displayedTrack - 1);
		}
	};

	const goToNextTrack = () => {
		if (displayedTrack < tracks.length - 1) {
			flatListRef.current?.scrollToIndex({
				index: displayedTrack + 1,
				animated: true
			});
			setDisplayedTrack(displayedTrack + 1);
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
			<StickyTopNavigator
				tracks={navigatorTracks}
				displayedTrack={displayedTrack}
				setDisplayedTrack={setDisplayedTrack}
			/>
			{/* <FlatList
				ref={flatListRef}
				data={tracks}
				horizontal
				style={{ height: "100%", minHeight: "100%" }}
				pagingEnabled
				initialScrollIndex={2}
				getItemLayout={(data, index) => ({
					length: windowWidth,
					offset: windowWidth * index,
					index
				})}
				showsHorizontalScrollIndicator={false}
				renderItem={(item) => (
					<View
						style={{
							width: windowWidth,
							height: "100%",
							justifyContent: "center",
							alignContent: "center",
							alignItems: "center"
						}}>
						<DailyTrackCard
							trackName={item.item.song_title}
							artistName={item.item.song_artist as string}
							genreName={item.item.genreName}
							artwork={{ uri: item.item.artwork }}
							goToPreviousTrack={goToPreviousTrack}
							goToNextTrack={goToNextTrack}
							bgColour={""}
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
			/> */}
		</View>
	);
};

export default TrackGallery;
