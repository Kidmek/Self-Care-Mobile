import { useStoreActions, useStoreState } from 'easy-peasy';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { authStyles } from './auth.style';

import { postSkeleton } from '~/api/apiConfig';
import { setUserData, setToken } from '~/api/storage';
import CustomButton from '~/common/button/CustomButton';
import CustomInput from '~/common/input/CustomInput';
import { AUTH_STRINGS } from '~/constants/strings/auth';
import { AUTH_STAGE, emailRegEx, phoneRegEx } from '~/constants/strings/common';
import { COLORS, SIZES } from '~/constants/theme';

export default function Login({ setStep }) {
  const { t: i18n } = useTranslation();
  const toast = useToast();
  const navigate = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const setLoading = useStoreActions((actions) => actions.setLoading);
  const setForgotPass = useStoreActions((actions) => actions.setForgotPass);
  const isForgotPass = useStoreState((state) => state.isForgotPass);

  const login = () => {
    const errors = {};

    if (!username?.match(emailRegEx) && !username?.match(phoneRegEx)) {
      errors.username = 'Invalid email or phone';
    }

    if (!password.length) {
      errors.password = i18n(AUTH_STRINGS.PASS_REQUIRED);
    } else if (password.length < 5) {
      errors.password = i18n(AUTH_STRINGS.PASS_LENGTH);
    }
    if (!username.length) {
      errors.username = i18n(AUTH_STRINGS.USERNAME_REQUIRED);
    }

    setErrors(errors);
    if (!Object.keys(errors).length) {
      postSkeleton({
        url: 'auth/login',
        dataToSend: { username, password },
        errorMsg: i18n(AUTH_STRINGS.UNABLE_TO_LOGIN),
        successMsg: i18n(AUTH_STRINGS.LOGIN_SUCCESS),
        onSuccess: (data) => {
          setLoading(false);
          setUserData(data.user);

          if (data.token) {
            setToken(data.token);
            navigate.navigate('(drawer)');
          } else if (data.user?.isActive === false) {
            postSkeleton({
              url: 'auth/resend-otp',
              params: {
                email: data.user?.email,
                register: !isForgotPass,
                isEmail: true,
              },
              errorMsg: 'Unable to send verification',
              toast,
              setLoading,
              noSuccessToast: true,
            });
            setStep(AUTH_STAGE.OTP);
          } else {
            toast.show(i18n(AUTH_STRINGS.TRY_AGAIN), {
              type: 'danger',
            });
          }
        },
        toast,
        setLoading,
        noSuccessToast: true,
      });
    }
  };

  const handleResetPass = async () => {
    if (!username?.match(emailRegEx) && !username?.match(phoneRegEx)) {
      errors.username = 'Invalid email or phone';
      setErrors({ username: i18n(AUTH_STRINGS.INVALID_EMAIL) });
    } else {
      setErrors({});
      postSkeleton({
        url: 'auth/reset-pass',
        params: { emailOrPhone: username },
        errorMsg: 'Unable to verify',
        successMsg: `OTP sent to ${username}`,
        onSuccess: async () => {
          await setUserData({ email: username });
          setStep(AUTH_STAGE.OTP);
        },
        toast,
        setLoading,
        noSuccessToast: true,
      });
    }
  };

  return (
    <View style={authStyles.container}>
      <ScrollView contentContainerStyle={authStyles.body} showsVerticalScrollIndicator={false}>
        <Text style={authStyles.header}>
          {isForgotPass ? i18n(AUTH_STRINGS.FORGOT_PASSWORD) : i18n(AUTH_STRINGS.LOGIN)}
        </Text>

        <View style={authStyles.inputContainer}>
          <CustomInput
            state={username}
            setState={(v) => {
              setUsername(v);
            }}
            label={i18n(AUTH_STRINGS.EMAIL_OR_PHONE)}
            placeholder={i18n(AUTH_STRINGS.EMAIL_OR_PHONE_PLACEHOLDER)}
            error={errors['username']}
          />
          {!isForgotPass && (
            <CustomInput
              state={password}
              setState={(v) => {
                setPassword(v);
              }}
              label={i18n(AUTH_STRINGS.PASSWORD)}
              placeholder={i18n(AUTH_STRINGS.PASSWORD_LABEL)}
              isPassword
              error={errors['password']}
            />
          )}
          {!isForgotPass && (
            <TouchableOpacity
              onPress={() => {
                setForgotPass(true);
              }}>
              <Text style={authStyles.forgetTxt}>{i18n(AUTH_STRINGS.FORGOT_PASSWORD)}</Text>
            </TouchableOpacity>
          )}
        </View>

        {!isForgotPass ? (
          <CustomButton title={i18n(AUTH_STRINGS.LOG_IN)} onPress={login} />
        ) : (
          <View style={{ gap: SIZES.small }}>
            <CustomButton title={i18n(AUTH_STRINGS.NEXT)} onPress={handleResetPass} />
            <CustomButton
              title={i18n(AUTH_STRINGS.CANCEL)}
              onPress={() => {
                setErrors({});
                setForgotPass(false);
              }}
              color={COLORS.gray}
            />
          </View>
        )}

        {!isForgotPass && (
          <View style={authStyles.bottomTextStyle}>
            <Text style={authStyles.registerTextStyle}>
              {i18n(AUTH_STRINGS.NO_ACCOUNT)}{' '}
              <Text
                style={[authStyles.registerTextStyle, authStyles.redirectTextStyle]}
                onPress={() => setStep(AUTH_STAGE.REGISTER)}>
                {i18n(AUTH_STRINGS.REGISTER)}
              </Text>
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
