import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Modal, TouchableOpacity, Pressable } from 'react-native';

import { modalStyles } from './modal.style';

import CustomInput from '~/common/input/CustomInput';
import { INPUT_TYPE } from '~/constants/strings/common';
import { TRACKING_EMOJIS, TRACKING_STRINGS } from '~/constants/strings/home/assessment/tracking';
import { HOME_STRINGS } from '~/constants/strings/home/home';

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  save?: (value: string) => void;
  selected: any;
};
export default function TrackingModal({ visible, setVisible, save, selected }: Props) {
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
      <Pressable
        style={modalStyles.centeredView}
        onPress={() => {
          setVisible(false);
        }}>
        <Pressable
          style={{
            ...modalStyles.modalView,
            ...modalStyles.logoutContainer,
            // alignItems: 'center',
          }}>
          <View style={{ ...modalStyles.textContainer }}>
            {selected && (
              <Text style={modalStyles.modalHeader}>
                {t(save ? selected : selected.mood)}
                {/* @ts-ignore */}
                {TRACKING_EMOJIS[save ? selected : selected.mood]}
              </Text>
            )}

            <Text style={modalStyles.logoutText}>{t(TRACKING_STRINGS.ADDITIONAL_INFO)}</Text>
          </View>
          <View style={modalStyles.btnContainer}>
            <View style={{ flex: 1 }}>
              <CustomInput
                state={save ? value : selected?.description}
                setState={setValue}
                type={INPUT_TYPE.MULTI}
                disabled={!save}
              />
            </View>
          </View>

          {save && (
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
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
