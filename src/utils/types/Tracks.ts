
export interface Track {
	genreName: string;
	created_at: string;
	song_title: string;
	song_artist: string;
	artwork: string;
	spotify_url?: string;
	soundcloud_url?: string;
	bandcamp_url?: string;
	apple_music_url?: string;
	facebook_url?: string;
	instagram_url?: string;
	genre_colour: number;
	drop_day?:
		| "Monday"
		| "Tuesday"
		| "Wednesday"
		| "Thursday"
		| "Friday"
		| "Saturday"
		| "Sunday";
}

export interface NavigatorTrack {
	genreName: string;
	bgColor: string;
	accentColor: string;
	trackIndex: number;
}
