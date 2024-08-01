import React, { useState, useRef, useEffect } from "react";
import { View, FlatList, Dimensions, ActivityIndicator } from "react-native";
import { createClient } from "@supabase/supabase-js";
import StickyTopNavigator from "./StickyTopNavigator";
import { genreColors } from "../constants/Colors";
import DailyTrackCard from "./DailyTrackCard";

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
							genreName: track.genre_title,
							bgColour: getGenreColor(
								track.genre_colour as number
							),
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
	console.log(navigatorTracks, "this is the navigator tracks");
	console.log(displayedTrack, "this is the displayed track");
	console.log(tracks, "this is the tracks");

	return (
		<View
			style={{
				flex: 1,
				height: "100%",
				width: "100%",
				justifyContent: "center",
				alignContent: "center",
				alignItems: "center"
			}}>
			<StickyTopNavigator
				tracks={navigatorTracks}
				displayedTrack={displayedTrack}
				setDisplayedTrack={setDisplayedTrack}
			/>
			<DailyTrackCard
				trackName={tracks[displayedTrack].song_title}
				artistName={tracks[displayedTrack].song_artist}
				genreName={tracks[displayedTrack].genreName}
				artwork={{ uri: tracks[displayedTrack].artwork }}
				goToPreviousTrack={goToPreviousTrack}
				goToNextTrack={goToNextTrack}
				bgColour={navigatorTracks[displayedTrack]?.bgColour}
			/>
		</View>
	);
};

export default TrackGallery;
