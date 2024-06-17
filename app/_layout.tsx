import { StoreProvider } from 'easy-peasy';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { SplashScreen, Stack } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from 'react-native-toast-notifications';

import { getLocalSettings } from '~/api/storage';
import HeaderIcon from '~/common/header/HeaderIcon';
import Loader from '~/common/loader/Loader';
import { store } from '~/common/store';
import Toast from '~/common/toast/Toast';
import LogoutModal from '~/components/modal/LogoutModal';
import PinModal from '~/components/modal/PinModal';
import { HEADER_TYPES } from '~/constants/strings/common';
import { SETTING_STRINGS } from '~/constants/strings/setting';

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
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [settings, setSettings] = useState();
  const [fontsLoaded] = useFonts({
    Bold: require('../assets/fonts/Montserrat-Bold.ttf'),
    Medium: require('../assets/fonts/Montserrat-SemiBold.ttf'),
    Regular: require('../assets/fonts/Montserrat-Regular.ttf'),
  });
  useEffect(() => {
    getLocalSettings().then((s) => {
      if (s?.[SETTING_STRINGS.PIN_LOCK] === true) {
        setVisible(true);
      }
      setSettings(s);
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
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
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
