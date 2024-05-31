import { useStoreActions, useStoreState } from 'easy-peasy';
import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

import { modalStyles } from './modal.style';

import { logout } from '~/api/storage';
import { MODAL_TYPES } from '~/constants/strings/common';

const LogoutModal = () => {
  const navigation = useNavigation();
  const modalShown = useStoreState((state) => state.modalShown);
  const hideModal = useStoreActions((action) => action.hideModal);
  return (
    <Modal
      animationType="slide"
      transparent
      visible={Object.values(MODAL_TYPES).includes(modalShown)}
      onRequestClose={() => {
        hideModal();
      }}>
      <View style={modalStyles.centeredView}>
        <View style={{ ...modalStyles.modalView, ...modalStyles.logoutContainer }}>
          <View style={modalStyles.textContainer}>
            <Text style={modalStyles.modalHeader}>Logout</Text>

            <Text style={modalStyles.logoutText}>Are you sure you want to log out?</Text>
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
                // console.log(navigation.getParent());
                // navigation.goBack();
                navigation.navigate('auth');
              }}
              style={[modalStyles.declineBtn, modalStyles.btn]}>
              <Text style={modalStyles.textStyle}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;
