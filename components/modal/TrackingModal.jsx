import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

import { modalStyles } from './modal.style';

import CustomInput from '~/common/input/CustomInput';
import { INPUT_TYPE } from '~/constants/strings/common';
import {
  TRACKING,
  TRACKING_EMOJIS,
  TRACKING_STRINGS,
} from '~/constants/strings/home/assessment/tracking';
import { HOME_STRINGS } from '~/constants/strings/home/home';

export default function TrackingModal({ visible, setVisible, save, selected }) {
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  useEffect(() => {
    if (visible) {
      setValue('');
    }
  }, [visible]);
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
            // alignItems: 'center',
          }}>
          <View style={{ ...modalStyles.textContainer }}>
            {selected && (
              <Text style={modalStyles.modalHeader}>
                {t(selected)}
                {TRACKING_EMOJIS[selected]}
              </Text>
            )}

            <Text style={modalStyles.logoutText}>{t(TRACKING_STRINGS.ADDITIONAL_INFO)}</Text>
          </View>
          <View style={modalStyles.btnContainer}>
            <View style={{ flex: 1 }}>
              <CustomInput state={value} setState={setValue} type={INPUT_TYPE.MULTI} />
            </View>
          </View>

          <View style={modalStyles.btnContainer}>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
              }}
              style={[modalStyles.neutralBtn, modalStyles.btn]}>
              <Text style={modalStyles.textStyle}>{t(HOME_STRINGS.CANCEL)}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                save(value);
              }}
              style={[modalStyles.acceptBtn, modalStyles.btn]}>
              <Text style={modalStyles.textStyle}>{t(HOME_STRINGS.SAVE)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
