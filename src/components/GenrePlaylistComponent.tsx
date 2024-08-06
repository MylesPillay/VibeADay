import React, { useState, useEffect } from "react";
import {
	View,
	FlatList,
	StyleSheet,
	Text,
	ActivityIndicator
} from "react-native";
import { createClient } from "@supabase/supabase-js";
import { Track } from "./DailyTrackGallery";
import PlaylistItem from "./PlaylistItem";
import { RouteProp } from "@react-navigation/native";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { genreAccentColors, genreColors } from "../constants/Colors";
import GenreTitleComponent from "./GenreTitle";
export type GenrePlaylistParams = {
	genreName: string;
};

const GenrePlaylistComponent = ({}: {}) => {
	const { genreName } = useGlobalSearchParams();
	const [tracks, setTracks] = useState<Track[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTracks = async () => {
			const supabase = createClient(
				process.env.SUPABASE_API_URL as string,
				process.env.SUPABASE_API_SECRET_ACCESS_TOKEN as string
			);
			try {
				const { data, error } = await supabase
					.from("daily_tracks")
					.select("*")
					.eq("genre_title", genreName)
					.order("created_at", { ascending: false });

				if (error) throw error;
				setTracks(data as Track[]);
			} catch (error) {
				setError("Failed to fetch tracks");
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchTracks();
	}, [genreName]);

	function getGenreColor(colorId: number): string {
		return genreColors[colorId] || "#ffffff";
	}
	function getGenreAccentColor(colorId: number): string {
		return genreAccentColors[colorId] || "#000000";
	}

	if (loading) {
		return <ActivityIndicator size='large' />;
	}

	if (error) {
		return <Text>{error}</Text>;
	}
	console.log(tracks, "this is the tracks");
	const backgroundColor = getGenreColor(tracks[0].genre_colour);
	const accentColour = getGenreAccentColor(tracks[0].genre_colour);
	return (
		<View
			style={{
				display: "flex",
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				paddingTop: "20%",
				width: "100%",
				height: "100%",
				backgroundColor: backgroundColor
			}}>
			<GenreTitleComponent
				displayedTrack={0}
				genreName={genreName as string}
				accentColor={accentColour}
			/>
			<View
				style={{
					height: "90%",
					marginHorizontal: "10%",
					alignItems: "center",
					justifyContent: "flex-start"
				}}>
				{tracks.map((track, index) => (
					<PlaylistItem track={track} accentColour={accentColour} />
				))}
			</View>
		</View>
	);
};

export default GenrePlaylistComponent;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff"
	}
});
