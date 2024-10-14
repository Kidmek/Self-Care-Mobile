import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '~/constants/theme';

export const assessmentStyle = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // paddingTop: SIZES.medium,
  },
  outerWheel: {
    textAnchor: 'middle',
    alignmentBaseline: 'middle',
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    fontFamily: FONT.bold,
  },
  headerQns: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.uiElementColors.text.primary,
    paddingBottom: SIZES.medium,
  },
  moodsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: SIZES.large,
    paddingHorizontal: SIZES.xxLarge,
    paddingVertical: SIZES.xxLarge,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodRow: {
    flexDirection: 'row',
    gap: SIZES.small,
  },
  singleMood: {
    gap: SIZES.small,
    borderWidth: StyleSheet.hairlineWidth,
    padding: SIZES.xLarge,
    borderRadius: SIZES.large,
    backgroundColor: COLORS.primaryColors.lightBlue + '5A',
    alignItems: 'center',
    flex: 1,
  },
  moodName: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.uiElementColors.text.primary,
  },
  moodEmoji: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
  },
  historyContainer: {
    flex: 1,
    paddingHorizontal: SIZES.medium,
    gap: SIZES.small,
  },
});
