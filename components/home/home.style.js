import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '~/constants/theme';

export const homeStyle = StyleSheet.create({
  container: {
    gap: SIZES.large,
    paddingHorizontal: SIZES.xxLarge,
    paddingTop: SIZES.xLarge,
  },
  singleCardContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: SIZES.xLarge,
    borderRadius: SIZES.large,
    backgroundColor: COLORS.primaryColors.lightBlue + '8A',
    alignItems: 'center',
  },
  singleCardTitle: {
    textAlign: 'center',
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.uiElementColors.text.primary,
  },
  cardsContainerTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.circleAndInfo,
  },
  cardsContainer: {
    gap: SIZES.large,
  },
  cardsContainerHeader: {
    gap: SIZES.large,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
