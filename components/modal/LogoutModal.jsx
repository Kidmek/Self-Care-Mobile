import { useStoreActions, useStoreState } from 'easy-peasy';
import { useNavigation } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

import { modalStyles } from './modal.style';

import { logout } from '~/api/storage';
import { HOME_STRINGS } from '~/constants/strings/home/home';

const LogoutModal = () => {
  const { t: i18n } = useTranslation();
  const navigation = useNavigation();

  const logoutShown = useStoreState((state) => state.logoutShown);
  const hideModal = useStoreActions((action) => action.hideModal);
  return (
    <Modal
      animationType="slide"
      transparent
      visible={logoutShown}
      onRequestClose={() => {
        hideModal();
      }}>
      <View style={modalStyles.centeredView}>
        <View style={{ ...modalStyles.modalView, ...modalStyles.logoutContainer }}>
          <View style={modalStyles.textContainer}>
            <Text style={modalStyles.modalHeader}>{i18n(HOME_STRINGS.LOGOUT)}</Text>

            <Text style={modalStyles.logoutText}>{i18n(HOME_STRINGS.LOGOUT_QNS)}</Text>
          </View>

          <View style={modalStyles.btnContainer}>
            <TouchableOpacity
              onPress={() => {
                hideModal();
              }}
              style={[modalStyles.neutralBtn, modalStyles.btn]}>
              <Text style={modalStyles.textStyle}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                await logout();
                hideModal();
                navigation.reset({
                  index: 0,
                  routeNames: ['index'],
                  routes: [
                    {
                      name: 'index',
                    },
                  ],
                });
              }}
              style={[modalStyles.declineBtn, modalStyles.btn]}>
              <Text style={modalStyles.textStyle}>{i18n(HOME_STRINGS.LOGOUT)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;
