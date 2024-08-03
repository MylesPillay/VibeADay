/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#000000';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
export interface GenreColors {
	[key: number]: string;
}

export const genreColors: GenreColors = {
	1: "#29524A", // Afro House
	2: "#A8577E", // Drum & Bass
	3: "#6564DB", // Easy Listening`
	4: "#3B60E4", // Garage
	5: "#D67D14", // Techno
	6: "#A5A299", // UK Hip-Hop 29524A FF5733
	7: "#778899", // Deep House
};


// // You can add more theme-related constants and objects here
// export const colors = {
// 	primary: "#6200EE",
// 	secondary: "#03DAC6",
// 	background: "#F6F6F6",
// 	surface: "#FFFFFF",
// 	error: "#B00020",
// 	text: "#000000",
// 	onPrimary: "#FFFFFF",
// 	onSecondary: "#000000",
// 	onBackground: "#000000",
// 	onSurface: "#000000",
// 	onError: "#FFFFFF",
// };

// export const spacing = {
// 	small: 8,
// 	medium: 16,
// 	large: 24,
// 	// Add more spacing values as needed
// };

// export const fontSizes = {
// 	small: 12,
// 	medium: 16,
// 	large: 20,
// 	// Add more font sizes as needed
// };
