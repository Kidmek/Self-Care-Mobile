import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { assessmentStyle } from '../home/assessment/assessment.style';
import ReminderModal from '../modal/ReminderModal';

import { getLocalReminders, setLocalReminders } from '~/api/storage';
import { commonStyles } from '~/common/common.style';
import ImageContainer from '~/common/imageContainer/ImageContainer';
import { REMINDER_STRINGS } from '~/constants/strings/home/reminder';
import { COLORS, SIZES } from '~/constants/theme';

export default function Reminder() {
  const [visible, setVisible] = useState(false);
  const [reminders, setReminders] = useState([]);
  const { t: i18n } = useTranslation();
  const toast = useToast();
  const fetch = async () => {
    if (false) {
      // Fetch from backend and save locally
    } else {
      //
      const data = (await getLocalReminders()) ?? [];
      setReminders([...data]);
    }
  };
  const handleSave = () => {};
  const hanldeDelete = (id) => {
    if (false) {
      // delete from backend
    }
    Alert.alert('', i18n(REMINDER_STRINGS.DELETE_PROMPT), [
      {
        text: 'No',
        onPress: () => null,
      },
      {
        text: 'Yes',
        onPress: () => {
          const newData = [...reminders.filter((h) => h.time !== id)];
          setLocalReminders(newData);
          setReminders(newData);
          toast.show('Deleted', {
            type: 'success',
          });
        },
      },
    ]);
  };

  const renderItem = () => {};
  return (
    <ImageContainer>
      <ReminderModal
        visible={visible}
        setVisible={setVisible}
        i18n={i18n}
        save={handleSave}
        // selected={selected}
      />
      <View style={commonStyles.container()}>
        <FlatList
          data={reminders}
          renderItem={renderItem}
          contentContainerStyle={{
            ...assessmentStyle.historyContainer,
          }}
          ListEmptyComponent={() => {
            return (
              <Text
                style={{
                  ...assessmentStyle.container,
                  textAlign: 'center',
                  ...assessmentStyle.headerQns,
                }}>
                {i18n(REMINDER_STRINGS.EMPTY_HISTORY)}
              </Text>
            );
          }}
          // contentContainerStyle={{ ' }}
        />
        <Pressable
          style={styles.addButton}
          onPress={() => {
            setVisible(true);
          }}>
          <Ionicons name="add" size={SIZES.xxLarge} />
        </Pressable>
      </View>
    </ImageContainer>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: SIZES.xxLarge + SIZES.tabHeight,
    right: SIZES.xxLarge,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.primaryColors.lightBlue,
    padding: SIZES.medium,
  },
});
