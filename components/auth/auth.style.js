import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES } from '~/constants/theme';

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.pureWhite,
    paddingHorizontal: SIZES.large,
    // paddingTop: SIZES.smallPicture,
    alignContent: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: SIZES.xxLarge,
    gap: SIZES.xxLarge,
  },
  header: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
    textAlign: 'center',
    color: COLORS.primary,
    letterSpacing: SIZES.xxSmall / 2,
    marginVertical: SIZES.smallPicture,
  },
  subHeader: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    textAlign: 'center',
    marginBottom: SIZES.xxLarge,
    // color: COLORS.primary,
    // letterSpacing: SIZES.xxSmall / 2,
  },
  body: {
    // marginVertical: SIZES.smallPicture,
    gap: SIZES.xxLarge,
  },
  inputContainer: {
    gap: SIZES.small,
  },
  forgetTxt: {
    fontFamily: FONT.regular,
    fontWeight: '100',
    alignSelf: 'flex-end',
    textDecorationLine: 'underline',
  },
  termsAndCondition: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: SIZES.small,
    marginTop: SIZES.small,
  },

  //

  registerTextStyle: {
    color: COLORS.gray,
    textAlign: 'center',
    fontFamily: FONT.medium,
    fontWeight: '700',
    fontSize: SIZES.medium,
    alignSelf: 'center',
    padding: SIZES.medium,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    marginTop: SIZES.medium,
    fontFamily: FONT.medium,
  },
  loginSectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  signUpSectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 15,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    position: 'relative',
  },
  buttonStyle: {
    backgroundColor: COLORS.primary,
    borderWidth: 0,
    color: COLORS.white,
    borderColor: COLORS.primary,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: COLORS.white,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: COLORS.gray2,
  },
  phoneInputStyle: {
    flex: 1,
    paddingLeft: 55,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: COLORS.gray2,
  },

  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  bottomTextStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  redirectTextStyle: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
    fontWeight: '900',
  },
  logoStyle: {
    width: '50%',
    height: 125,
    resizeMode: 'contain',
    margin: 30,
  },

  prefix: {
    alignSelf: 'center',
    position: 'absolute',
    paddingLeft: 15,
  },
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { paddingHorizontal: SIZES.large },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },

  //

  //
});
