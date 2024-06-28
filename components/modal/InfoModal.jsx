import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Modal, StyleSheet, ScrollView, Pressable } from 'react-native';

import { modalStyles } from './modal.style';

import { ASSESSMENT_STRINGS } from '~/constants/strings/home/assessment/assessment';
import { TRACKING_STRINGS } from '~/constants/strings/home/assessment/tracking';
import { WHEEL_STRINGS } from '~/constants/strings/home/assessment/wheel';
import { JOURNALING_STRINGS } from '~/constants/strings/home/self care/journal';
import { TECHNIQUES_STRINGS } from '~/constants/strings/home/self care/techniques';
import { FONT, SIZES } from '~/constants/theme';

export default function InfoModal({ visible, setVisible, t, type }) {
  const getStrings = () => {
    switch (type) {
      case ASSESSMENT_STRINGS.LIFE_WHEEL:
        return WHEEL_STRINGS;
      case ASSESSMENT_STRINGS.MOOD_TRACKING:
        return TRACKING_STRINGS;
      case TECHNIQUES_STRINGS.JOURNALING:
        return JOURNALING_STRINGS;
    }
  };
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
            paddingBottom: 0,
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
          {getStrings() && (
            <ScrollView
              contentContainerStyle={styles.infoContainer}
              showsVerticalScrollIndicator={false}>
              {Object.keys(getStrings())
                ?.filter((k) => k.startsWith('STEP'))
                .map((k) => {
                  const isNB = getStrings()['NB_STEP'] === k;
                  return (
                    <View key={k} style={styles.singleStepContainer}>
                      {!isNB && (
                        <Ionicons
                          name="information-circle-outline"
                          style={styles.infoIcon}
                          size={SIZES.tabIcons}
                        />
                      )}
                      <Text
                        style={[styles.text, isNB && modalStyles.modalHeader]}
                        textBreakStrategy="balanced">
                        {t(getStrings()[k])}
                      </Text>
                    </View>
                  );
                })}
            </ScrollView>
          )}
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
    maxWidth: '100%',
    minWidth: '100%',
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
  infoIcon: {},
  singleStepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  text: {
    maxWidth: '90%',
    minWidth: '90%',
    fontFamily: FONT.regular,
  },
  infoContainer: {
    gap: SIZES.small,
    // justifyContent: 'space-evenly',
  },
});
