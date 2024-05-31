import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '~/constants/theme';

export const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: SIZES.tabHeight,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SIZES.smallPicture,
  },
  cardContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    width: '80%',
    paddingVertical: SIZES.xxLarge,
    borderRadius: SIZES.large,
    backgroundColor: COLORS.primaryColors.lightBlue + '8A',
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.uiElementColors.text.primary,
  },
});
