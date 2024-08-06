import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { getLocalReminders, setLocalReminders } from '~/api/storage';
import {
  DAYS,
  REMINDER_FREQUENCY,
  REMINDER_STRINGS,
  REMINDER_TYPES,
} from '~/constants/strings/home/reminder';

export type Reminder = {
  createdAt: string;
  frequency: keyof typeof REMINDER_FREQUENCY;
  notificationId: string[];
  time: string;
  type: keyof typeof REMINDER_TYPES;
  day?: string;
  days?: string[];
};

export async function scheduleNotification(
  now: boolean,
  day: string | null,
  time: string,
  title: string,
  body: string,
  vibrate: boolean,
  sound: boolean
) {
  Notifications.setNotificationHandler({
    handleNotification: async (notification) => {
      // Manually display the notification for Android - till foreground issue is resolved

      const isManualAndroidNotification =
        Platform.OS === 'android' && !notification.request.trigger;
      if (Platform.OS === 'android' && notification.request.trigger) {
        const appNotification = notification.request.content;
        await Notifications.scheduleNotificationAsync({
          identifier: notification.request.identifier,
          content: {
            title: appNotification?.title || '',
            body: appNotification?.body || '',
          },
          trigger: null,
        });
      }

      return {
        shouldShowAlert: Platform.OS === 'ios' || isManualAndroidNotification,
        shouldPlaySound: Platform.OS === 'ios' || isManualAndroidNotification,
        shouldSetBadge: false,
      };
    },
  });

  const [timeString, AM_PM] = time ? time?.trim()?.split(/(\s+)/) : ['', ''];
  const [hour, minute] = time ? timeString?.split(':').map(Number) : [0, 0];
  const trigger = now
    ? {
        seconds: 5,
      }
    : day
      ? {
          hour: hour + (AM_PM === 'AM' ? 0 : 12),
          minute,
          weekday: Object.keys(DAYS).indexOf(day) + 2,
          repeats: true,
        }
      : {
          hour: hour + (AM_PM === 'AM' ? 0 : 12),
          minute,
          repeats: true,
        };
  const channelId =
    vibrate && sound
      ? 'default'
      : !vibrate && sound
        ? 'no-vibration'
        : !sound && vibrate
          ? 'no-sound'
          : 'no-sound-vibration';
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: {
      ...trigger,
      channelId,
    },
  });
  console.log('Notification Sent ', {
    id,
    vibrate,
    sound,
    channelId,
  });
  return id;
}

export async function cancelNotification(notifId?: string) {
  if (notifId) {
    await Notifications.cancelScheduledNotificationAsync(notifId);
  } else {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }
}

export async function changeAllType(vibration: boolean, sound: boolean, t: any) {
  await cancelNotification();

  const reminders = await getLocalReminders();
  let notificationId: string[] = [];
  const newReminderPromises = await reminders?.map(async (data: Reminder) => {
    if (REMINDER_FREQUENCY[data.frequency] === REMINDER_FREQUENCY.DAILY) {
      notificationId = [
        await scheduleNotification(
          false,
          null,
          data?.time,
          t(REMINDER_STRINGS.SELF_CARE_REMINDER),
          REMINDER_TYPES[data.type],
          vibration,
          sound
        ),
      ];
    } else {
      const days = data.day ? [data?.day] : data?.days;
      for (const day in days) {
        notificationId.push(
          await scheduleNotification(
            false,
            day,
            data?.time,
            t(REMINDER_STRINGS.SELF_CARE_REMINDER),
            REMINDER_TYPES[data.type],
            vibration,
            sound
          )
        );
      }
    }
    data.notificationId = notificationId;
    return data;
  });
  const newReminders = await Promise.all(newReminderPromises);
  setLocalReminders(newReminders);
}

export async function requestNotificationPermissions() {
  const settings = await Notifications.getPermissionsAsync();

  if (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  ) {
    return true;
  } else {
    const { status } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    });
    return status;
  }
}
