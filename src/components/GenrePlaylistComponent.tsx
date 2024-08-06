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
export type GenrePlaylistParams = {
	genreName: string;
};

const GenrePlaylistComponent = ({
	route
}: {
	route: RouteProp<Record<string, GenrePlaylistParams>, string>;
}) => {
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

	if (loading) {
		return <ActivityIndicator size='large' />;
	}

	if (error) {
		return <Text>{error}</Text>;
	}
	console.log(tracks, "this is the tracks");

	return (
		<View
			style={{
				display: "flex",
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				paddingTop: "20%",
				width: "100%",
				height: "100%"
			}}>
			<FlatList
				data={tracks}
				keyExtractor={(item: any) => item.id.toString()}
				renderItem={({ item }) => <PlaylistItem track={item} />}
			/>
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
