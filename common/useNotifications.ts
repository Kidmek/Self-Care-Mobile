import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { router, useNavigation } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';

export interface PushNotificationState {
  expoPushToken?: Notifications.ExpoPushToken;
  notification?: Notifications.Notification;
}

export const useNotifications = (): PushNotificationState => {
  const navigation = useNavigation();
  const [expoPushToken, setExpoPushToken] = useState<Notifications.ExpoPushToken | undefined>();

  const [notification, setNotification] = useState<Notifications.Notification | undefined>();

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification');
        return;
      }
      try {
        token = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas.projectId,
        });
      } catch (err) {
        console.log('Er', err);
      }
    } else {
      alert('Must be using a physical device for Push notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
        bypassDnd: true,
      });
      Notifications.setNotificationChannelAsync('no-vibration', {
        name: 'No Vibration',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [],
        lightColor: '#FF231F7C',
        lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
        bypassDnd: true,
      });
      Notifications.setNotificationChannelAsync('no-sound', {
        name: 'No Sound',
        importance: Notifications.AndroidImportance.MAX,
        sound: null,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
        bypassDnd: true,
      });
      Notifications.setNotificationChannelAsync('no-sound-vibration', {
        name: 'None',
        importance: Notifications.AndroidImportance.MAX,
        sound: null,
        vibrationPattern: [],
        lightColor: '#FF231F7C',
        lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
        bypassDnd: true,
      });
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      if (response.notification.request.content.data?.reminderId) {
        setTimeout(() => {
          router.push(
            // @ts-ignore
            `/(drawer)/(tabs)/reminders?id=${response.notification.request.content.data?.reminderId}`
          );
        }, 500);
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current!);

      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  return {
    expoPushToken,
    notification,
  };
};
