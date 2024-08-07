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
export function getGenreColor(colorId: number): string {
    return genreColors[colorId] || "#FFFFFF";
}

export function getGenreAccentColor(colorId: number): string {
    return genreAccentColors[colorId] || "#000000";
}
export interface GenreColors {
  [key: number]: string;
}

export const genreColors: GenreColors = {
  1: "#29524A",
  2: "#663858",
  3: "#edc34c",
  4: "#2e52b3",
  5: "#58409c"
};
export const genreAccentColors: GenreColors = {
  1: "#DDF093",
  2: "gold",
  3: "#3607f0",
  4: "#ffe30f",
  5: "#37db70",
};

