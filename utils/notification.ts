import * as Notifications from 'expo-notifications';

import { DAYS } from '~/constants/strings/home/reminder';

export async function scheduleNotification(now: boolean, day: string, time: string) {
  //   const scheduledTime = getNextScheduledTime(day, time);
  const [hour, minute] = time ? time.split(' ')[0]?.split(':') : ['0', '0'];
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Don't forget!",
      body: 'This is your scheduled notification.',
      sound: true,
    },
    trigger: now
      ? {
          seconds: 5,
        }
      : {
          hour: parseInt(hour, 10),
          minute: parseInt(minute, 10),
          day: Object.keys(DAYS).indexOf(day),
          repeats: true,
        },
  });
  console.log('Notification Id', id);
  return id;
}

export async function cancelNotification(notifId: string) {
  await Notifications.cancelAllScheduledNotificationsAsync();
  await Notifications.cancelScheduledNotificationAsync(notifId);
}

// function getNextScheduledTime(day: number, time: string) {
//   const now = new Date();
//   const nextDay = new Date();

//   // Set the next occurrence of the selected day
//   nextDay.setDate(now.getDate() + ((7 - now.getDay() + day) % 7));

//   // Set the specific time
//   const [hours, minutes] = time.split(':');
//   nextDay.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);

//   // If it's already past the specified time this week, move to next week
//   if (nextDay <= now) {
//     nextDay.setDate(nextDay.getDate() + 7);
//   }

//   return nextDay;
// }
