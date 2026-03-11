import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');
export const SCREEN_HEIGHT = height;
export const SCREEN_WIDTH = width;
let guidelineBaseWidth: number = 375;
let guidelineBaseHeight: number = 812;

if (width > height) {
  [guidelineBaseWidth, guidelineBaseHeight] = [
    guidelineBaseHeight,
    guidelineBaseWidth,
  ];
}

const horizontalScale = (size: number): number =>
  (width / guidelineBaseWidth) * size;
const verticalScale = (size: number): number =>
  (height / guidelineBaseHeight) * size;

const moderateScale = (size: number, factor = 0.5): number =>
  size + (horizontalScale(size) - size) * factor;

export {
  horizontalScale,
  verticalScale,
  moderateScale,
  height,
  width,
};