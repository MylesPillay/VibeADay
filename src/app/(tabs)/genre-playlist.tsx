import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import GenrePlaylistComponent from "@/src/components/GenrePlaylistComponent";
import { useGlobalSearchParams } from "expo-router";

import { createClient } from "@supabase/supabase-js";

import { getGenreColor } from "@/src/utils/constants/Colors";
import { Track } from "@/src/utils/types/Tracks";

export default function GenrePlaylistScreen() {
	const { genreName, bgColor, accentColor } = useGlobalSearchParams();

	const [tracks, setTracks] = useState<Track[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const backgroundColor = getGenreColor(tracks?.[0]?.genre_colour);

	useEffect(() => {
		const fetchTracks = async () => {
			const supabase = createClient(
				process.env.SUPABASE_API_URL as string,
				process.env.SUPABASE_API_SECRET_ACCESS_TOKEN as string
			);
			setLoading(true);
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

	if (loading) {
		return (
			<View
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100%",
					width: "100%",
					backgroundColor: bgColor?.toString()
				}}>
				<ActivityIndicator
					color={accentColor?.toString()}
					size={"large"}
				/>
			</View>
		);
	}

	if (error) {
		return (
			<View>
				<Text>{error}</Text>;
			</View>
		);
	}
	return (
		<View
			style={[
				styles.spacerWrapper,
				{ backgroundColor: backgroundColor }
			]}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<GenrePlaylistComponent
					tracks={tracks}
					genreName={genreName as string}
					backgroundColor={backgroundColor}
					accentColor={accentColor as string}
				/>
			</GestureHandlerRootView>
		</View>
	);
}

const styles = StyleSheet.create({
	spacerWrapper: {
		display: "flex",
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		paddingVertical: "10.5%",
		height: "100%",
		width: "100%"
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2
	}
});
