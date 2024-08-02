import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '~/constants/theme';

export const commonStyles = StyleSheet.create({
  largeImage: {
    width: SIZES.largePicture,
    height: SIZES.largePicture,
  },
  header: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
  },
  container: (top) => {
    return {
      gap: SIZES.large,
      paddingHorizontal: SIZES.xxLarge,
      paddingTop: top,
      flex: 1,
    };
  },
  headerLeft: {
    borderRadius: SIZES.largePicture,
    borderWidth: StyleSheet.hairlineWidth,
    height: SIZES.xxLarge * 1.5,
    width: SIZES.xxLarge * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  divider: (color) => {
    return {
      height: StyleSheet.hairlineWidth,
      backgroundColor: color ?? COLORS.circleAndInfo,
      width: '100%',
      marginVertical: SIZES.medium,
    };
  },
  verticalDivider: (color) => {
    return {
      width: StyleSheet.hairlineWidth,
      backgroundColor: color ?? COLORS.circleAndInfo,
      height: '100%',
    };
  },
  innerContainer: {
    paddingHorizontal: SIZES.medium,
    flex: 1,
  },
});
