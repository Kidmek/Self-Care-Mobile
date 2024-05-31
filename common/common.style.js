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
    marginTop: SIZES.medium,
    marginLeft: SIZES.medium,
    borderRadius: SIZES.largePicture,
    borderWidth: StyleSheet.hairlineWidth,
    height: SIZES.xxLarge * 1.5,
    width: SIZES.xxLarge * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
