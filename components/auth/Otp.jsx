import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useToast } from 'react-native-toast-notifications';

import { authStyles } from './auth.style';

import { postSkeleton } from '~/api/apiConfig';
import { getUserData } from '~/api/storage';
import CustomButton from '~/common/button/CustomButton';
import { AUTH_STRINGS } from '~/constants/strings/auth';
import { AUTH_STAGE, OTP_LENGTH, WAIT_TIME } from '~/constants/strings/common';
import { COLORS, SIZES } from '~/constants/theme';

export default function OTP({ setStep, setOtp }) {
  const { t: i18n } = useTranslation();
  const toast = useToast();
  const [errortext, setErrortext] = useState();
  const [code, setCode] = useState();
  const [timer, setTimer] = useState(WAIT_TIME);
  const ref = useBlurOnFulfill({ code, cellCount: OTP_LENGTH });
  // eslint-disable-next-line no-unused-vars
  const [_, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });

  const setLoading = useStoreActions((actions) => actions.setLoading);
  const isForgotPass = useStoreState((state) => state.isForgotPass);

  const handleSubmitButton = async () => {
    if (code && code.length === OTP_LENGTH) {
      setErrortext(null);
      const user = await getUserData();
      postSkeleton({
        url: 'auth/verify-otp',
        dataToSend: { email: user?.email, otp: code, save: !isForgotPass },
        errorMsg: 'Unable to verify',
        successMsg: 'Successfully verified',
        onSuccess: () => {
          // setTimer(WAIT_TIME);
          if (isForgotPass) {
            setOtp(code);
            setStep(AUTH_STAGE.NEW_PASS);
          } else {
            setStep(AUTH_STAGE.LOGIN);
          }
        },
        toast,
        setLoading,
      });
    } else {
      setErrortext('Please fill out all slots');
    }
  };
  const resend = async () => {
    const user = await getUserData();
    postSkeleton({
      url: 'auth/resend-otp',
      params: { username: user?.username, register: !isForgotPass },
      errorMsg: 'Unable to resend',
      successMsg: 'Successfully resent',
      onSuccess: () => {
        setTimer(WAIT_TIME);
      },
      toast,
      setLoading,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let second = timer.second;
      let minute = timer.minute;
      if (second > 0) {
        second--;
      }

      if (second === 0) {
        if (minute === 0) {
          clearInterval(interval);
        } else {
          second = 59;
          minute--;
        }
      }
      setTimer({
        second,
        minute,
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer.second]);

  useEffect(() => {}, []);

  return (
    <View style={authStyles.container}>
      <Text
        style={{
          ...authStyles.header,
        }}>
        {i18n(AUTH_STRINGS.VERIFICATION)}
      </Text>

      <View>
        <Text
          style={{
            ...authStyles.subHeader,
          }}>
          {i18n(AUTH_STRINGS.VERIFICATION_PLACEHOLDER)}
        </Text>
        <CodeField
          ref={ref}
          value={code}
          onChangeText={setCode}
          cellCount={OTP_LENGTH}
          rootStyle={authStyles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[authStyles.cell, isFocused && authStyles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        {errortext !== '' ? <Text style={authStyles.errorTextStyle}>{errortext}</Text> : null}
        <View style={authStyles.bottomTextStyle}>
          <Text style={authStyles.registerTextStyle}>
            {i18n(AUTH_STRINGS.NO_CODE)}{' '}
            {timer.second > 0 || timer.minute > 0 ? (
              <Text
                style={[
                  authStyles.registerTextStyle,
                  authStyles.redirectTextStyle,
                  { textDecorationLine: 'none' },
                ]}>
                {i18n(AUTH_STRINGS.WAIT_FOR)}{' '}
                {timer.minute < 10 ? `0${timer.minute}` : timer.minute}:
                {timer.second < 10 ? `0${timer.second}` : timer.second}
              </Text>
            ) : (
              <Text
                style={[authStyles.registerTextStyle, authStyles.redirectTextStyle]}
                onPress={resend}>
                {i18n(AUTH_STRINGS.RESEND)}
              </Text>
            )}
          </Text>
        </View>
        <View style={{ gap: SIZES.small }}>
          <CustomButton title={i18n(AUTH_STRINGS.VERIFY)} onPress={handleSubmitButton} />
          <CustomButton
            title={i18n(AUTH_STRINGS.CANCEL)}
            onPress={() => {
              setStep(AUTH_STAGE.LOGIN);
            }}
            color={COLORS.gray}
          />
        </View>
      </View>
    </View>
  );
}