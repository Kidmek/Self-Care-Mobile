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

import { requestSkeleton } from '~/api/apiConfig';
import { getUserData } from '~/api/storage';
import CustomButton from '~/common/button/CustomButton';
import { AUTH_STRINGS } from '~/constants/strings/auth';
import { AUTH_STAGE, OTP_LENGTH, WAIT_TIME } from '~/constants/strings/common';
import { COLORS, SIZES } from '~/constants/theme';

export default function OTP({ setStep, setOtp, email, onSuccess }) {
  const { t } = useTranslation();
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
  const [isEmail, setIsEmail] = useState(true);

  const setLoading = useStoreActions((actions) => actions.setLoading);
  const isForgotPass = useStoreState((state) => state.isForgotPass);

  const handleSubmitButton = async () => {
    if (code && code.length === OTP_LENGTH) {
      setErrortext(null);
      const user = await getUserData();
      requestSkeleton({
        method: 'POST',
        url: 'auth/verify-otp',
        dataToSend: { email: user?.email, otp: code, save: !isForgotPass, newEmail: email },
        errorMsg: t(AUTH_STRINGS.UNABLE_TO_VERIFY),
        successMsg: !email ? t(AUTH_STRINGS.VER_SUCCESS) : t(AUTH_STRINGS.EMAIL_CHANGED_SUC),
        onSuccess: () => {
          // setTimer(WAIT_TIME);
          if (onSuccess) {
            onSuccess();
          }
          if (isForgotPass) {
            if (setOtp) {
              setOtp(code);
            }
            setStep(AUTH_STAGE.NEW_PASS);
          } else {
            setStep(AUTH_STAGE.LOGIN);
          }
        },
        toast,
        setLoading,
      });
    } else {
      setErrortext(t(AUTH_STRINGS.OTP_ERROR));
    }
  };
  const resend = async (changeVal) => {
    const user = await getUserData();
    requestSkeleton({
      method: 'POST',
      url: 'auth/resend-otp',
      params: {
        email: user?.email,
        register: !isForgotPass,
        newEmail: email,
        isEmail: changeVal !== undefined ? changeVal : isEmail,
      },
      errorMsg: t(AUTH_STRINGS.UNABLE_TO_SEND_VERIFICATION),
      successMsg: '',
      onSuccess: () => {
        setTimer(WAIT_TIME);
        setCode('');
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

  return (
    <View
      style={[
        authStyles.container,
        {
          paddingHorizontal: !email ? SIZES.large : 0,
        },
      ]}>
      <Text
        style={{
          ...authStyles.header,
        }}>
        {t(AUTH_STRINGS.VERIFICATION)}
      </Text>

      <View>
        <Text
          style={{
            ...authStyles.subHeader,
          }}>
          {t(AUTH_STRINGS.VERIFICATION_PLACEHOLDER, {
            sent_to: isEmail ? t(AUTH_STRINGS.EMAIL) : t(AUTH_STRINGS.PHONE),
          })}
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
            {t(AUTH_STRINGS.NO_CODE)}{' '}
            {timer.second > 0 || timer.minute > 0 ? (
              <Text
                style={[
                  authStyles.registerTextStyle,
                  authStyles.redirectTextStyle,
                  { textDecorationLine: 'none' },
                ]}>
                {t(AUTH_STRINGS.WAIT_FOR)} {timer.minute < 10 ? `0${timer.minute}` : timer.minute}:
                {timer.second < 10 ? `0${timer.second}` : timer.second}
              </Text>
            ) : (
              <Text
                style={[authStyles.registerTextStyle, authStyles.redirectTextStyle]}
                onPress={() => resend()}>
                {t(AUTH_STRINGS.RESEND)}
              </Text>
            )}
          </Text>
          {timer.second < 0 && timer.minute < 0 && (
            <Text
              style={[authStyles.registerTextStyle, authStyles.redirectTextStyle]}
              onPress={() => {
                setIsEmail(!isEmail);
                resend(!isEmail);
              }}>
              {isEmail ? t(AUTH_STRINGS.USE_PHONE) : t(AUTH_STRINGS.USE_EMAIL)}
            </Text>
          )}
        </View>
        <View style={{ gap: SIZES.small }}>
          <CustomButton title={t(AUTH_STRINGS.VERIFY)} onPress={handleSubmitButton} />
          <CustomButton
            title={t(AUTH_STRINGS.CANCEL)}
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
