import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Modal, StyleSheet, ScrollView, Pressable } from 'react-native';

import { modalStyles } from './modal.style';

import { WHEEL_STRINGS } from '~/constants/strings/home/assessment/wheel';
import { FONT, SIZES } from '~/constants/theme';

export default function InfoModal({ visible, setVisible, info, t }) {
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
          }}>
          <View style={styles.header}>
            <Text style={modalStyles.modalHeader}>{t(WHEEL_STRINGS.GUIDELINE)}</Text>
            <Pressable
              onPress={() => {
                setVisible(false);
              }}>
              <Ionicons
                name="close-circle-outline"
                style={styles.closeIcon}
                size={SIZES.tabIcons}
              />
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={styles.infoContainer}>
            {Object.keys(WHEEL_STRINGS)
              ?.filter((k) => k.includes('STEP'))
              .map((k) => {
                return (
                  <View key={k} style={styles.singleStepContainer}>
                    <Ionicons
                      name="information-circle-outline"
                      style={styles.infoIcon}
                      size={SIZES.tabIcons}
                    />
                    <Text style={styles.text}>{t(WHEEL_STRINGS[k])}</Text>
                  </View>
                );
              })}
          </ScrollView>
          <View />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
  infoIcon: {},
  singleStepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    // gap: SIZES.small,
  },
  text: {
    fontFamily: FONT.regular,
  },
  infoContainer: {
    gap: SIZES.small,
    justifyContent: 'space-evenly',
  },
});
