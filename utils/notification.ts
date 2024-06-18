import * as Notifications from 'expo-notifications';

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
  sound: boolean,
  reminderId: string
) {
  const [timeString, AM_PM] = time ? time?.trim()?.split(/(\s+)/) : ['', ''];
  const [hour, minute] = time ? timeString?.split(':').map(Number) : [0, 0];
  const trigger = now
    ? {
        seconds: 10,
        // repeats: true,
      }
    : day
      ? {
          hour: hour + (AM_PM === 'AM' ? 0 : 12),
          minute,
          weekday: day ? Object.keys(DAYS).indexOf(day) + 2 : undefined,
          repeats: true,
        }
      : {
          hour: hour + (AM_PM === 'AM' ? 0 : 12),
          minute,
          repeats: true,
        };

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: {
        reminderId,
      },
    },

    trigger,
    // @ts-ignore
    channelId:
      vibrate && sound
        ? 'default'
        : !vibrate && sound
          ? 'no-vibrations'
          : !sound && vibrate
            ? 'no-sound'
            : 'no-sound-vibration',
  });
  // console.log('Notification Id', id);
  return id;
}

export async function cancelNotification(notifId?: string) {
  if (notifId) {
    await Notifications.cancelScheduledNotificationAsync(notifId);
    // console.log('Canceled ', notifId);
  } else {
    // await Notifications.dismissAllNotificationsAsync();
    await Notifications.cancelAllScheduledNotificationsAsync();
    // console.log('Canceled All ', notifId);
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
          sound,
          data.createdAt
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
            sound,
            data.createdAt
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
