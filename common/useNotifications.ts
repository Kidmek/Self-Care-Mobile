import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';

import { setReminderId } from '~/api/storage';
import { vibrationPattern } from '~/constants/strings/common';
import { requestNotificationPermissions } from '~/utils/notification';
const commonValues = {
  importance: Notifications.AndroidImportance.HIGH,
  lightColor: '#FF231F7C',
  lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
  bypassDnd: true,
};
export const useNotifications = () => {
  async function register() {
    requestNotificationPermissions();

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        vibrationPattern,
        ...commonValues,
      });
      Notifications.setNotificationChannelAsync('no-vibration', {
        name: 'No Vibration',
        vibrationPattern: undefined,
        sound: 'default',
        ...commonValues,
      });
      Notifications.setNotificationChannelAsync('no-sound', {
        name: 'Vibrate',
        sound: null,
        vibrationPattern,
        ...commonValues,
      });
      Notifications.setNotificationChannelAsync('no-sound-vibration', {
        name: 'Silent',
        sound: null,
        vibrationPattern: undefined,
        ...commonValues,
      });
    }
  }

  useEffect(() => {
    register();

    function redirect(notification: Notifications.Notification) {
      console.log('Notification data:', notification.request.content.data);
      if (notification.request.identifier) {
        setReminderId(notification.request.identifier).then(() => {
          setTimeout(() => {
            console.log('Redirecting to /reminders');
            //@ts-ignore
            router.push('/reminders');
          }, 500);
        });
      }
    }

    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response received:', response);
      redirect(response.notification);
    });

    return () => {
      subscription.remove();
    };
  }, []);
};
