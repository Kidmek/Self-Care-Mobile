import Slider from '@react-native-community/slider';
import { TFunction } from 'i18next';
import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Pressable } from 'react-native';

import { modalStyles } from './modal.style';

import { WHEEL_SECTIONS, WHEEL_STRINGS } from '~/constants/strings/home/assessment/wheel';
import { HOME_STRINGS } from '~/constants/strings/home/home';
import { COLORS, SIZES } from '~/constants/theme';
import { checkIfAmh } from '~/utils/helper';

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  save?: (value: number) => void;
  t: TFunction<'translation', undefined>;
  segment: any;
};

export default function WheelModal({ visible, setVisible, save, segment, t }: Props) {
  const [value, setValue] = useState(1);
  const getFullName = () => {
    const section = WHEEL_SECTIONS.find((s) => s.shortName === segment.label)!;
    return checkIfAmh() ? section.am_longName : section.longName;
  };
  useEffect(() => {
    if (segment?.value) {
      setValue(segment.value);
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
        style={[modalStyles.centeredView]}
        onPress={() => {
          setVisible(false);
        }}>
        <Pressable
          style={{
            ...modalStyles.modalView,
            ...modalStyles.logoutContainer,
            alignItems: 'center',
          }}>
          <View
            style={[
              modalStyles.textContainer,
              { alignItems: 'center', pointerEvents: 'box-none' },
            ]}>
            {segment?.label && <Text style={modalStyles.modalHeader}>{getFullName()}</Text>}

            <Text style={modalStyles.logoutText}>
              {t(save ? WHEEL_STRINGS.SATISFIED_QNS : WHEEL_STRINGS.SATIFACTION)}
            </Text>
            <Text
              style={{
                ...modalStyles.modalHeader,
                textAlign: 'center',
                color: COLORS.circleAndInfo,
                fontSize: SIZES.xxLarge,
              }}>
              {value}
            </Text>
            {save && (
              <Slider
                style={{
                  minWidth: '100%',
                }}
                value={value}
                onValueChange={setValue}
                step={1}
                minimumValue={1}
                maximumValue={10}
                minimumTrackTintColor={COLORS.circleAndInfo}
                maximumTrackTintColor={COLORS.accentColors.softLavender}
                thumbTintColor={COLORS.circleAndInfo}
              />
            )}
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
