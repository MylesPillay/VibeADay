
export function handleGenreListSelection (selectedTrack: number, setDisplayedTrack: React.Dispatch<React.SetStateAction<number>>, handleExpandGenreList: () => void) {
		setDisplayedTrack(selectedTrack);
		handleExpandGenreList();
	};
	export function handleGenreDotSelect  (selectedTrack: number,setDisplayedTrack: React.Dispatch<React.SetStateAction<number>> ) {
		setDisplayedTrack(selectedTrack);
	};