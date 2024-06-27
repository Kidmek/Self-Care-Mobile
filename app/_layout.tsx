import { StoreProvider } from 'easy-peasy';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { SplashScreen, Stack, useNavigation } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from 'react-native-toast-notifications';

import { getLastLoggedIn, getLocalSettings, setLocalSettings } from '~/api/storage';
import HeaderIcon from '~/common/header/HeaderIcon';
import Loader from '~/common/loader/Loader';
import { store } from '~/common/store';
import Toast from '~/common/toast/Toast';
import { useNotifications } from '~/common/useNotifications';
import LogoutModal from '~/components/modal/LogoutModal';
import PinModal from '~/components/modal/PinModal';
import { HEADER_TYPES } from '~/constants/strings/common';
import { SETTING_STRINGS } from '~/constants/strings/setting';
import { getMinutes } from '~/utils/helper';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)',
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldShowAlert: true,
    shouldSetBadge: true,
  }),
});

export default function RootLayout() {
  const navigation = useNavigation();

  const { expoPushToken, notification } = useNotifications();

  // useEffect(() => {
  //   // console.log('token id:', expoPushToken);
  //   // console.log('Notification', notification);
  // }, [notification]);
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [settings, setSettings] = useState({});
  const [fontsLoaded] = useFonts({
    Bold: require('../assets/fonts/Montserrat-Bold.ttf'),
    Medium: require('../assets/fonts/Montserrat-SemiBold.ttf'),
    Regular: require('../assets/fonts/Montserrat-Regular.ttf'),
  });

  useEffect(() => {
    getLocalSettings().then(async (s) => {
      if (s === null) {
        const initSettings = {};
        // @ts-ignore
        initSettings[SETTING_STRINGS.ALLOW_NOTIFIACTION] = true;
        // @ts-ignore
        initSettings[SETTING_STRINGS.PIN_LOCK] = false;
        // @ts-ignore
        initSettings[SETTING_STRINGS.SOUND] = true;
        // @ts-ignore
        initSettings[SETTING_STRINGS.VIBRATION] = true;
        setSettings(initSettings);
        setLocalSettings(initSettings);
        console.log('Initialized Settings', initSettings);
      } else {
        const last = (await getLastLoggedIn()) ?? new Date().setFullYear(2000);
        if (s?.[SETTING_STRINGS.PIN_LOCK] === true && getMinutes(new Date(last), new Date()) > 30) {
          setVisible(true);
        }
        setSettings(s);
      }
    });
  }, []);

  useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <StoreProvider store={store}>
      <LogoutModal />
      <Loader />
      <PinModal visible={visible} setVisible={setVisible} t={t} settings={settings} />
      <ToastProvider
        placement="bottom"
        duration={2000}
        animationType="zoom-in"
        animationDuration={250}
        swipeEnabled
        renderToast={(toast) => <Toast toast={toast} />}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="assessment" options={{ headerShown: false }} />
            <Stack.Screen name="techniques" options={{ headerShown: false }} />
            <Stack.Screen
              name="password"
              options={{
                headerTransparent: true,
                headerLeft: () => <HeaderIcon type={HEADER_TYPES.BACK} />,
                headerTitle: '',
              }}
            />
            <Stack.Screen
              name="change"
              options={{
                headerTransparent: true,
                headerLeft: () => <HeaderIcon type={HEADER_TYPES.BACK} />,
                headerTitle: '',
              }}
            />
          </Stack>
        </GestureHandlerRootView>
      </ToastProvider>
    </StoreProvider>
  );
}
