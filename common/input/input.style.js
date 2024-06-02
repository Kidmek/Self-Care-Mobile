import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '~/constants/theme';

export default StyleSheet.create({
  container: {
    gap: SIZES.xxSmall,
  },
  label: {
    fontFamily: FONT.regular,
  },
  input: (error) => {
    return {
      backgroundColor: 'transparent',
      borderWidth: error ? 1 : StyleSheet.hairlineWidth,
      borderRadius: SIZES.xxSmall,
      padding: SIZES.xSmall,
      fontFamily: FONT.regular,
      fontSize: SIZES.medium,
      flex: 1,
      borderColor: error ? COLORS.red : null,
      textAlignVertical: 'top',
    };
  },
  passContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: -SIZES.tabIcons - SIZES.small,
    right: SIZES.tabIcons + SIZES.medium,
    zIndex: 100,
    padding: SIZES.xxSmall,
  },
  errorText: {
    color: COLORS.red,
    fontFamily: FONT.regular,
    marginTop: -SIZES.xxSmall,
  },

  // DropDown

  textStyle: {},
  labelStyle: {},
  placeholderStyle: {
    fontFamily: FONT.regular,
    color: COLORS.placeholder,
  },

  //
});
