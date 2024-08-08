// utils/responsive.ts
import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const baseScreenHeight = 667; // Reference height, e.g., iPhone SE (2nd generation)

const getResponsiveFontSize = (size: number) => {
  const ratio = SCREEN_HEIGHT / baseScreenHeight;
  const newSize = size * ratio;
  return Math.round(newSize);
};

export { getResponsiveFontSize };