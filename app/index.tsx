import { router, useRootNavigationState } from 'expo-router';
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getLanguage, getToken, setLanguage } from '~/api/storage';
import Login from '~/components/auth/Login';
import NewPass from '~/components/auth/NewPass';
import OTP from '~/components/auth/Otp';
import Signup from '~/components/auth/Signup';
import { AUTH_STAGE, languages } from '~/constants/strings/common';
import '~/constants/strings/index';
import { COLORS, SIZES } from '~/constants/theme';

export default function Auth() {
  const { top } = useSafeAreaInsets();
  const [selected, setSelected] = useState(languages[0].value);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

  const [languageOpen, setLanguageOpen] = useState(false);
  const [step, setStep] = useState<AUTH_STAGE>(AUTH_STAGE.LOGIN);
  const [otp, setOtp] = useState('');
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLanguage = await getLanguage();
        if (storedLanguage) {
          i18next.changeLanguage(storedLanguage);
          setSelected(storedLanguage);
        }
      } catch (e) {
        console.log('Error at index.tsx', e);
      }
    };
    loadLanguage();
  }, []);

  useEffect(() => {
    if (selected) {
      setLanguage(selected);
      i18next.changeLanguage(selected);
    }
  }, [selected]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await getToken();
        setIsLoggedIn(!!token);
      } catch (error) {
        console.log('Error checking login status', error);
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn !== undefined) {
      if (isLoggedIn || true) {
        // @ts-ignore
        router.replace('/(drawer)/(tabs)');
      }
    }
  }, [isLoggedIn, rootNavigationState?.key]);

  if (!rootNavigationState?.key || isLoggedIn === undefined) return null;

  return (
    <View
      style={{
        paddingTop: top,
        flex: 1,
        backgroundColor: COLORS.pureWhite,
      }}>
      <DropDownPicker
        style={{
          backgroundColor: 'transparent',
        }}
        containerStyle={{
          width: '35%',
          alignSelf: 'flex-end',
          marginRight: SIZES.small,
          backgroundColor: 'transparent',
          zIndex: 100,
        }}
        value={selected}
        items={languages}
        setOpen={setLanguageOpen}
        open={languageOpen}
        setValue={setSelected}
        placeholder="Language"
      />
      {step === AUTH_STAGE.LOGIN ? (
        <Login setStep={setStep} />
      ) : step === AUTH_STAGE.REGISTER ? (
        <Signup setStep={setStep} />
      ) : step === AUTH_STAGE.OTP ? (
        // @ts-ignore
        <OTP setStep={setStep} setOtp={setOtp} />
      ) : (
        <NewPass setStep={setStep} otp={otp} />
      )}
    </View>
  );
}
