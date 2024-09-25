import * as Notifications from 'expo-notifications';

export async function cancelNotification(notifId?: string) {
  if (notifId) {
    await Notifications.cancelScheduledNotificationAsync(notifId);
  } else {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }
}
