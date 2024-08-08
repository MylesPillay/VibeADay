import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import DailyTrackGallery from "../../components/DailyTrackGallery";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
	getGenreAccentColor,
	getGenreColor
} from "@/src/utils/constants/Colors";
import { NavigatorTrack, Track } from "../../utils/types/Tracks";
import { useRouter } from "expo-router";
import { createClient } from "@supabase/supabase-js";

export default function HomeScreen() {
	const windowWidth = Dimensions.get("window").width;
	const windowHeight = Dimensions.get("window").height;

	const router = useRouter();
	const [tracks, setTracks] = useState<Track[]>([]);
	const [navigatorTracks, setNavigatorTracks] = useState<NavigatorTrack[]>(
		[]
	);
	const [selectedDay, setSelectedDay] = useState<string>("Sunday");
	const handleDaySelection = (day: string) => {
		setSelectedDay(day);
	};

	const handleGenreListSelection = (selectedTrack: number) => {
		setDisplayedTrack(selectedTrack);
	};
	useEffect(() => {
		const fetchTracks = async () => {
			const supabase = createClient(
				process.env.SUPABASE_API_URL as string,
				process.env.SUPABASE_API_SECRET_ACCESS_TOKEN as string
			);
			setLoading(true);
			try {
				let { data, error } = await supabase
					.from("daily_tracks")
					.select("*")
					.eq("drop_day", selectedDay)
					.order("created_at", { ascending: false })
					.limit(5);

				if (error) throw error;
				if (data) {
					setTracks(data);
					setNavigatorTracks(
						data.map((track, index) => ({
							genreName: track.genre_title,
							bgColor: getGenreColor(
								track.genre_colour as number
							),
							accentColor: getGenreAccentColor(
								track.genre_colour as number
							),
							trackIndex: index
						}))
					);
					setLoading(false);
				}
			} catch (error) {
				setError("Failed to fetch tracks");
				console.error(error);
			}
		};

		fetchTracks();
	}, [selectedDay]);

	console.log(tracks, "this is the tracks");
	console.log(navigatorTracks, "this is the navigator tracks");
	const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [displayedTrack, setDisplayedTrack] = React.useState<number>(0);
	const flatListRef = useRef<FlatList<Track> | null>(null);

	const [flipChevrons, setFlipChevrons] = useState<boolean | undefined>(
		undefined
	);

	const navigateToGenrePlaylist = () => {
		router.push({
			pathname: "./genre-playlist",
			params: {
				genreName: navigatorTracks[displayedTrack]?.genreName,
				bgColor: navigatorTracks[displayedTrack]?.bgColor,
				accentColor: navigatorTracks[displayedTrack]?.accentColor
			}
		});
	};
	return (
		<View
			style={[
				styles.spacerWrapper,
				{ width: windowWidth, height: windowHeight }
			]}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<DailyTrackGallery />
			</GestureHandlerRootView>
		</View>
	);
}

const styles = StyleSheet.create({
	spacerWrapper: {
		display: "flex",
		alignContent: "center",
		paddingVertical: "5%"
	}
});
