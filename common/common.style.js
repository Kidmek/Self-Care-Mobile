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
      paddingTop: top,
      flex: 1,
      backgroundColor: COLORS.pureWhite,
    };
  },
  headerLeft: {
    // marginTop: SIZES.medium,
    // marginHorizontal: SIZES.medium,
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
  innerContainer: {
    paddingHorizontal: SIZES.medium,
    flex: 1,
  },
});
