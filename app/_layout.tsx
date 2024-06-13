import { StoreProvider } from 'easy-peasy';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { SplashScreen, Stack } from 'expo-router';
import { useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from 'react-native-toast-notifications';

import Loader from '~/common/loader/Loader';
import { store } from '~/common/store';
import Toast from '~/common/toast/Toast';
import LogoutModal from '~/components/modal/LogoutModal';

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
  const [fontsLoaded] = useFonts({
    Bold: require('../assets/fonts/Montserrat-Bold.ttf'),
    Medium: require('../assets/fonts/Montserrat-SemiBold.ttf'),
    Regular: require('../assets/fonts/Montserrat-Regular.ttf'),
  });

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
          </Stack>
        </GestureHandlerRootView>
      </ToastProvider>
    </StoreProvider>
  );
}
