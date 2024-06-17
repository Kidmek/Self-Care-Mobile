import { StyleSheet } from 'react-native';

import { SIZES, COLORS, FONT } from '~/constants/theme';

export const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: SIZES.large,
    width: '90%',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: SIZES.large,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: SIZES.xxLarge,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: SIZES.large,
    textAlign: 'center',
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
  },
  declineBtn: {
    backgroundColor: COLORS.red,
  },
  acceptBtn: {
    backgroundColor: COLORS.green,
  },
  neutralBtn: {
    backgroundColor: COLORS.gray,
  },
  btn: {
    flex: 1,
    paddingHorizontal: SIZES.xSmall,
    paddingVertical: SIZES.xSmall,
    borderRadius: SIZES.small,
  },

  btnContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    gap: SIZES.xxLarge,
  },

  info: {
    paddingHorizontal: SIZES.small,
    marginBottom: SIZES.xxLarge,
  },
  // Logout

  textContainer: {
    gap: SIZES.large,
  },
  modalHeader: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
  },
  logoutText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
  },
  logoutContainer: {
    alignItems: 'flex-start',
    gap: SIZES.xxLarge,
  },
});
