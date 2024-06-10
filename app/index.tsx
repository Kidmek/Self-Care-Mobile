import { Redirect, useRootNavigationState } from 'expo-router';
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
import { AUTH_STAGE } from '~/constants/strings/common';
import '~/constants/strings/index';
import { COLORS, SIZES } from '~/constants/theme';

export default function Auth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const { top } = useSafeAreaInsets();
  const [selected, setSelected] = useState('');
  const [languageOpen, setLanguageOpen] = useState(false);
  const [step, setStep] = useState<AUTH_STAGE>(AUTH_STAGE.LOGIN);
  const [otp, setOtp] = useState('');
  const rootNavigationState = useRootNavigationState();
  // Check connection TODO
  // const unsubscribe = NetInfo.addEventListener((state) => {
  //   console.log('Connection type', state.type);
  //   console.log('Is connected?', state.isConnected);
  // });

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'am', label: 'Amharic' },
    { value: 'af', label: 'Afargna' },
  ];

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
    const isLoggedIn = async () => {
      console.log('checking login');
      // TODO
      // if (await getToken()) {
      if (true) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    isLoggedIn();
  }, []);

  useEffect(() => {
    setLanguage(selected);
    i18next.changeLanguage(selected);
  }, [selected]);
  if (!rootNavigationState?.key || isLoggedIn === undefined) return null;

  if (isLoggedIn) {
    return <Redirect href="(drawer)" />;
  }

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
        onChangeValue={(value) => {
          if (value) {
          }
        }}
        placeholder="Language"
      />
      {step === AUTH_STAGE.LOGIN ? (
        <Login setStep={setStep} />
      ) : step === AUTH_STAGE.REGISTER ? (
        <Signup setStep={setStep} />
      ) : step === AUTH_STAGE.OTP ? (
        <OTP setStep={setStep} setOtp={setOtp} />
      ) : (
        <NewPass setStep={setStep} otp={otp} />
      )}
    </View>
  );
}
