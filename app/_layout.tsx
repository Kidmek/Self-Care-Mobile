import { StoreProvider } from 'easy-peasy';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import i18next from 'i18next';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from 'react-native-toast-notifications';

import { getLanguage, getLocalSettings, initilizeSettings } from '~/api/storage';
import HeaderIcon from '~/common/header/HeaderIcon';
import Loader from '~/common/loader/Loader';
import { store } from '~/common/store';
import Toast from '~/common/toast/Toast';
import { useNotifications } from '~/common/useNotifications';
import { HEADER_TYPES } from '~/constants/strings/common';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '',
};

export default function RootLayout() {
  useNotifications();

  const [fontsLoaded] = useFonts({
    Bold: require('../assets/fonts/Montserrat-Bold.ttf'),
    Medium: require('../assets/fonts/Montserrat-SemiBold.ttf'),
    Regular: require('../assets/fonts/Montserrat-Regular.ttf'),
  });

  useEffect(() => {
    getLanguage().then((res) => {
      if (res) {
        i18next.changeLanguage(res);
      }
    });
    getLocalSettings().then(async (s) => {
      if (s === null) {
        await initilizeSettings();
      }
    });
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <StoreProvider store={store}>
      <ToastProvider
        placement="bottom"
        duration={2000}
        animationType="zoom-in"
        animationDuration={250}
        swipeEnabled
        renderToast={(toast) => <Toast toast={toast} />}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Loader />
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            <Stack.Screen name="assessment" options={{ headerShown: false }} />
            <Stack.Screen name="techniques" options={{ headerShown: false }} />
            <Stack.Screen
              name="terms"
              options={{ headerShown: true, presentation: 'modal', title: 'Terms and Conditions' }}
            />
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
