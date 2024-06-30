import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

import { modalStyles } from './modal.style';

import { HOME_STRINGS } from '~/constants/strings/home/home';
import { REMINDER_TYPES_QNS } from '~/constants/strings/home/reminder';

const ReminderModal = ({ visible, setVisible, save, t, selected }) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}>
      <View style={modalStyles.centeredView}>
        <View
          style={{
            ...modalStyles.modalView,
            ...modalStyles.logoutContainer,
            alignItems: 'center',
          }}>
          <View style={{ ...modalStyles.textContainer }}>
            <Text style={modalStyles.modalHeader}>{t(REMINDER_TYPES_QNS[selected?.type])}</Text>
          </View>
          <View style={modalStyles.btnContainer}>
            <TouchableOpacity
              onPress={() => {
                if (save) save(HOME_STRINGS.NO);
              }}
              style={[modalStyles.declineBtn, modalStyles.btn]}>
              <Text style={modalStyles.textStyle}>{t(HOME_STRINGS.NO)}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (save) save(HOME_STRINGS.YES);
              }}
              style={[modalStyles.acceptBtn, modalStyles.btn]}>
              <Text style={modalStyles.textStyle}>{t(HOME_STRINGS.YES)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReminderModal;
