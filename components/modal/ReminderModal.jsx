import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

import { modalStyles } from './modal.style';

import { HOME_STRINGS } from '~/constants/strings/home/home';

const ReminderModal = ({ visible, setVisible, save, selected, i18n }) => {
  const [value, setValue] = useState();
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
          <View style={{ ...modalStyles.textContainer }} />
          <View style={modalStyles.btnContainer}>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
              }}
              style={[modalStyles.neutralBtn, modalStyles.btn]}>
              <Text style={modalStyles.textStyle}>{i18n(HOME_STRINGS.CANCEL)}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                save(value);
              }}
              style={[modalStyles.acceptBtn, modalStyles.btn]}>
              <Text style={modalStyles.textStyle}>{i18n(HOME_STRINGS.SAVE)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReminderModal;
