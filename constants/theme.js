import { Dimensions } from 'react-native';

export const width = Dimensions.get('screen').width;
export const height = Dimensions.get('screen').height;

export const COLORS = {
  primary: '#1d4ed8',
  secondary: '#444262',
  circleAndInfo: '#2E81D3',
  tertiary: '#FF7754',
  grey: '#5E5D5E',
  lightGrey: '#c2c2c2',
  dark: '#1A1A1A',
  gray: '#83829A',
  gray2: '#C1C0C8',
  gray3: '#F2F0F8',
  black: '#000000',
  green: '#008000',
  white: '#F3F4F8',
  pureWhite: '#FFFFFF',
  lightWhite: '#FAFAFC',
  blue: '#0096FF',
  lightBlue: '#ADD8E6',
  azure: '#F0FFFF',
  red: '#EF4444',
  placeholder: '#8b9cb5',
  primaryColors: {
    lightBlue: '#A8DADC',
    lightGreen: '#A8E6CF',
  },
  secondaryColors: {
    softTeal: '#81C7B9',
    softCoral: '#F7A7A6',
  },
  accentColors: {
    paleYellow: '#FDFD96',
    softLavender: '#C3B1E1',
  },
  neutralColors: {
    white: '#FFFFFF',
    lightGray: '#F0F0F0',
    mediumGray: '#B0B0B0',
    darkGray: '#707070',
  },
  uiElementColors: {
    iconsAndButtons: {
      lightBlue: '#A8DADC',
      softTeal: '#81C7B9',
    },
    text: {
      primary: '#707070',
      secondary: '#B0B0B0',
    },
    bordersAndDividers: '#F0F0F0',
    highlightsAndFocusedElements: '#F7A7A6',
  },
};

export const SIZES = {
  xxSmall: 6,
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
  smallPicture: width * 0.25,
  mediumPicture: width * 0.35,
  xMediumPicture: width * 0.45,
  largePicture: width * 0.55,
  xLargePicture: width * 0.65,
  xxLargePicture: width * 0.75,
  tabIcons: 25,
  inputIcons: 30,
  welcomeTabIcons: 28,
  tabHeight: height * 0.07,
  navHeight: height * 0.13,
};

export const FONT = {
  regular: 'Regular',
  medium: 'Medium',
  bold: 'Bold',
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export const WHEEL_COLORS = [
  '#FF6347', // Tomato
  '#4682B4', // Steel Blue
  '#32CD32', // Lime Green
  '#FFD700', // Gold
  '#6A5ACD', // Slate Blue
  '#FF69B4', // Hot Pink
  '#FFA500', // Orange
  '#20B2AA', // Light Sea Green
];
