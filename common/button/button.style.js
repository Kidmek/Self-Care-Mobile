import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '~/constants/theme';

export default StyleSheet.create({
  container: {
    gap: SIZES.xxSmall,
  },
  text: {
    fontFamily: FONT.bold,
    color: COLORS.pureWhite,
    textAlign: 'center',
    fontSize: SIZES.large,
  },
  button: {
    borderRadius: SIZES.xxSmall,
    padding: SIZES.medium,
    backgroundColor: COLORS.primary,
  },
});
