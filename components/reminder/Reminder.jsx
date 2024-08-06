import { Ionicons } from '@expo/vector-icons';
import { useStoreActions } from 'easy-peasy';
import { useFocusEffect, useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import SingleReminder from './SingleReminder';
import SingleReminderResult from './SingleReminderResult';
import { assessmentStyle } from '../home/assessment/assessment.style';
import DoneReminderModal from '../modal/DoneReminderModal';
import ReminderModal from '../modal/ReminderModal';

import { addAnalyticApi } from '~/api/analytics';
import {
  addReminderResult,
  getLocalReminders,
  getLocalSettings,
  getReminderId,
  getReminderResult,
  removeReminderId,
  setLocalReminders,
} from '~/api/storage';
import { commonStyles } from '~/common/common.style';
import HeaderIcon from '~/common/header/HeaderIcon';
import ImageContainer from '~/common/imageContainer/ImageContainer';
import { AnalyticField, HEADER_TYPES } from '~/constants/strings/common';
import { HOME_STRINGS } from '~/constants/strings/home/home';
import {
  REMINDER_FREQUENCY,
  REMINDER_STRINGS,
  REMINDER_TYPES,
} from '~/constants/strings/home/reminder';
import { SETTING_STRINGS } from '~/constants/strings/setting';
import { COLORS, SIZES } from '~/constants/theme';
import { cancelNotification, scheduleNotification } from '~/utils/notification';

export default function Reminder() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState();
  const [visible, setVisible] = useState(false);
  const [isHistory, setIsHistory] = useState(false);
  const [doneVisible, setDoneVisible] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [history, setHistory] = useState([]);
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
      const savedHistory = (await getReminderResult()) ?? [];
      setReminders([...data]);
      setHistory([...savedHistory]);
      setLoading(false);
    }
  };
  const handleSave = async (data) => {
    if (!data.frequency || !data.type) {
      return;
    }
    let notificationId = [];
    if (false) {
      // Fetch from backend and save locally
    } else {
      //
      setLoading(true);
      getLocalSettings().then(async (settings) => {
        if (settings[SETTING_STRINGS.ALLOW_NOTIFIACTION] === true) {
          if (REMINDER_FREQUENCY[data.frequency] === REMINDER_FREQUENCY.DAILY) {
            notificationId = [
              // TEST
              await scheduleNotification(
                null,
                data?.time,
                t(REMINDER_STRINGS.SELF_CARE_REMINDER),
                t(REMINDER_TYPES[data.type]),
                settings[SETTING_STRINGS.VIBRATION],
                settings[SETTING_STRINGS.SOUND]
              ),
            ];
          } else {
            const days = data.day ? [data?.day] : data?.days;
            for (const day in days) {
              notificationId.push(
                await scheduleNotification(
                  day,
                  data?.time,
                  t(REMINDER_STRINGS.SELF_CARE_REMINDER),
                  t(REMINDER_TYPES[data.type]),
                  settings[SETTING_STRINGS.VIBRATION],
                  settings[SETTING_STRINGS.SOUND]
                )
              );
            }
          }
          data.notificationId = notificationId;
        }
        await setLocalReminders([data, ...reminders]);

        setVisible(false);
        fetch();
      });
      setLoading(false);
    }
    addAnalyticApi({
      type: AnalyticField.REMINDER,
    });
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
          const newData = [
            ...reminders.filter((h) => {
              if (h.createdAt === id) {
                h.notificationId?.map((n) => {
                  if (n) {
                    cancelNotification(n);
                  }
                });
              }
              return h.createdAt !== id;
            }),
          ];
          await setLocalReminders(newData);
          setReminders(newData);
          setLoading(false);
          toast.show(t(HOME_STRINGS.DELETED), {
            type: 'success',
          });
        },
      },
    ]);
  };

  const handleDone = async (done) => {
    if (selected) {
      await addReminderResult({
        ...selected,
        answeredAt: new Date(),
        answer: done,
      });
      addAnalyticApi({
        type: done === HOME_STRINGS.YES ? AnalyticField.REMINDER_YES : AnalyticField.REMINDER_NO,
      });
      setDoneVisible(false);
    }
  };

  const renderItem = ({ item }) => {
    return <SingleReminder data={item} onPressDelete={hanldeDelete} onPress={() => {}} t={t} />;
  };

  const renderHistory = ({ item }) => {
    return (
      <SingleReminderResult data={item} onPressDelete={hanldeDelete} onPress={() => {}} t={t} />
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (isHistory) {
        } else {
          return (
            <HeaderIcon name="hourglass-outline" onPress={() => setIsHistory(!isHistory)} margin />
          );
        }
      },
      headerLeft: () => {
        return (
          <HeaderIcon
            type={HEADER_TYPES.BACK}
            onPress={isHistory ? () => setIsHistory(!isHistory) : undefined}
            margin
          />
        );
      },
    });
  }, [isHistory]);

  useEffect(() => {
    fetch();
  }, [isHistory]);

  useFocusEffect(() => {
    getReminderId().then(async (id) => {
      if (id) {
        console.log('Reminder Not Id', id);
        const reminder = reminders.find((r) => r.notificationId?.includes(id));
        if (reminder) {
          setSelected(reminder);
          setDoneVisible(true);
        }
      } else {
        if (doneVisible) {
          setDoneVisible(false);
        }
      }
      await removeReminderId();
    });
  });
  return (
    <ImageContainer hasTab>
      <ReminderModal visible={visible} setVisible={setVisible} t={t} save={handleSave} />
      <DoneReminderModal
        visible={doneVisible}
        setVisible={setDoneVisible}
        t={t}
        save={handleDone}
        selected={selected}
      />

      <View
        style={[
          commonStyles.container(),
          isHistory
            ? {
                paddingHorizontal: 0,
              }
            : {
                paddingHorizontal: SIZES.medium,
              },
        ]}>
        {isHistory ? (
          <FlatList
            data={history}
            renderItem={renderHistory}
            style={{
              ...assessmentStyle.historyContainer,
            }}
            contentContainerStyle={{
              gap: SIZES.small,
            }}
            keyExtractor={(item) => item.answeredAt}
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
          />
        ) : (
          <>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={reminders}
              renderItem={renderItem}
              style={{
                ...assessmentStyle.historyContainer,
                paddingHorizontal: 0,
              }}
              contentContainerStyle={{
                gap: SIZES.small,
              }}
              keyExtractor={(item) => item.createdAt}
              ListEmptyComponent={() => {
                return (
                  <Text
                    style={{
                      ...assessmentStyle.container,
                      textAlign: 'center',
                      ...assessmentStyle.headerQns,
                    }}>
                    {t(REMINDER_STRINGS.NO_REMINDER_RESULTS)}
                  </Text>
                );
              }}
            />
            <Pressable
              style={styles.addButton}
              onPress={() => {
                setVisible(true);
              }}>
              <Ionicons name="add" size={SIZES.xxLarge} />
            </Pressable>
          </>
        )}
      </View>
    </ImageContainer>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: SIZES.xxLarge,
    right: SIZES.xxLarge,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.primaryColors.lightBlue,
    padding: SIZES.medium,
  },
});
