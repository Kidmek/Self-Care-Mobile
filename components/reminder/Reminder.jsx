import { Ionicons } from '@expo/vector-icons';
import { useStoreActions } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import SingleReminder from './SingleReminder';
import { assessmentStyle } from '../home/assessment/assessment.style';
import ReminderModal from '../modal/ReminderModal';

import { getLocalReminders, setLocalReminders } from '~/api/storage';
import { commonStyles } from '~/common/common.style';
import ImageContainer from '~/common/imageContainer/ImageContainer';
import {
  REMINDER_FREQUENCY,
  REMINDER_STRINGS,
  REMINDER_TYPES,
} from '~/constants/strings/home/reminder';
import { COLORS, SIZES } from '~/constants/theme';

export default function Reminder() {
  const [visible, setVisible] = useState(false);
  const [reminders, setReminders] = useState([]);
  const { t } = useTranslation();
  const toast = useToast();
  const setLoading = useStoreActions((actions) => actions.setLoading);

  const fetch = async () => {
    if (false) {
      // Fetch from backend and save locally
    } else {
      //

      setLoading(true);
      const data = (await getLocalReminders()) ?? [];
      setReminders([...data]);
      setLoading(false);
    }
  };
  const handleSave = async (data) => {
    if (false) {
      // Fetch from backend and save locally
    } else {
      //
      setLoading(true);
      await setLocalReminders([data, ...reminders]);
      setVisible(false);
      fetch();
      setLoading(false);
    }
  };
  const hanldeDelete = (id) => {
    if (false) {
      // delete from backend
    }
    Alert.alert('', t(REMINDER_STRINGS.DELETE_PROMPT), [
      {
        text: 'No',
        onPress: () => null,
      },
      {
        text: 'Yes',
        onPress: async () => {
          setLoading(true);
          const newData = [...reminders.filter((h) => h.createdAt !== id)];
          await setLocalReminders(newData);
          setReminders(newData);
          setLoading(false);
          toast.show('Deleted', {
            type: 'success',
          });
        },
      },
    ]);
  };

  const renderItem = ({ item }) => {
    return <SingleReminder data={item} onPressDelete={hanldeDelete} onPress={() => {}} />;
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <ImageContainer>
      <ReminderModal
        visible={visible}
        setVisible={setVisible}
        t={t}
        save={handleSave}
        // selected={selected}
      />
      <View style={commonStyles.container()}>
        <FlatList
          data={reminders}
          renderItem={renderItem}
          contentContainerStyle={{
            ...assessmentStyle.historyContainer,
            paddingHorizontal: 0,
          }}
          ListEmptyComponent={() => {
            return (
              <Text
                style={{
                  ...assessmentStyle.container,
                  textAlign: 'center',
                  ...assessmentStyle.headerQns,
                }}>
                {t(REMINDER_STRINGS.EMPTY_HISTORY)}
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
