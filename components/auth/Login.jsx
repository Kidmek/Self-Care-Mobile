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
import { API, changeAPI } from '~/constants/strings/api';
import { AUTH_STRINGS } from '~/constants/strings/auth';
import { AUTH_STAGE, emailRegEx, phoneRegEx } from '~/constants/strings/common';
import { COLORS, SIZES } from '~/constants/theme';

export default function Login({ setStep }) {
  const { t } = useTranslation();
  const toast = useToast();
  const navigate = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [api, setApi] = useState(API);

  const setLoading = useStoreActions((actions) => actions.setLoading);
  const setForgotPass = useStoreActions((actions) => actions.setForgotPass);
  const isForgotPass = useStoreState((state) => state.isForgotPass);

  const login = () => {
    if (api === API) {
      setToken('testing');
      navigate.navigate('(drawer)');
      return;
    }
    changeAPI(api);
    const errors = {};

    if (!username?.match(emailRegEx) && !username?.match(phoneRegEx)) {
      errors.username = t(AUTH_STRINGS.INVALID_EMAIL_PHONE);
    }

    if (!password.length) {
      errors.password = t(AUTH_STRINGS.PASS_REQUIRED);
    } else if (password.length < 5) {
      errors.password = t(AUTH_STRINGS.PASS_LENGTH);
    }
    if (!username.length) {
      errors.username = t(AUTH_STRINGS.USERNAME_REQUIRED);
    }

    setErrors(errors);
    if (!Object.keys(errors).length) {
      postSkeleton({
        url: 'auth/login',
        dataToSend: { username, password },
        errorMsg: t(AUTH_STRINGS.UNABLE_TO_LOGIN),
        successMsg: t(AUTH_STRINGS.LOGIN_SUCCESS),
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
              errorMsg: t(AUTH_STRINGS.UNABLE_TO_SEND_VERIFICATION),
              toast,
              setLoading,
              noSuccessToast: true,
            });
            setStep(AUTH_STAGE.OTP);
          } else {
            toast.show(t(AUTH_STRINGS.TRY_AGAIN), {
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
      errors.username = t(AUTH_STRINGS.INVALID_EMAIL_PHONE);
      setErrors({ username: t(AUTH_STRINGS.INVALID_EMAIL) });
    } else {
      setErrors({});
      postSkeleton({
        url: 'auth/reset-pass',
        params: { emailOrPhone: username },
        errorMsg: t(AUTH_STRINGS.UNABLE_TO_VERIFY),
        successMsg: `${t(AUTH_STRINGS.CODE_SENT_TO, { sent_to: username })} `,
        onSuccess: async () => {
          await setUserData({ email: username });
          setStep(AUTH_STAGE.OTP);
        },
        toast,
        setLoading,
      });
    }
  };

  return (
    <View style={authStyles.container}>
      <ScrollView contentContainerStyle={authStyles.body} showsVerticalScrollIndicator={false}>
        <Text style={authStyles.header}>
          {isForgotPass ? t(AUTH_STRINGS.FORGOT_PASSWORD) : t(AUTH_STRINGS.LOGIN)}
        </Text>

        <View style={authStyles.inputContainer}>
          <CustomInput
            state={api}
            setState={(v) => {
              setApi(v);
            }}
            label="Server IP"
            placeholder="Server IP"
          />
          <CustomInput
            state={username}
            setState={(v) => {
              setUsername(v);
            }}
            label={t(AUTH_STRINGS.EMAIL_OR_PHONE)}
            placeholder={t(AUTH_STRINGS.EMAIL_OR_PHONE_PLACEHOLDER)}
            error={errors['username']}
          />
          {!isForgotPass && (
            <CustomInput
              state={password}
              setState={(v) => {
                setPassword(v);
              }}
              label={t(AUTH_STRINGS.PASSWORD)}
              placeholder={t(AUTH_STRINGS.PASSWORD_LABEL)}
              isPassword
              error={errors['password']}
            />
          )}
          {!isForgotPass && (
            <TouchableOpacity
              onPress={() => {
                setForgotPass(true);
              }}>
              <Text style={authStyles.forgetTxt}>{t(AUTH_STRINGS.FORGOT_PASSWORD)}</Text>
            </TouchableOpacity>
          )}
        </View>

        {!isForgotPass ? (
          <CustomButton title={t(AUTH_STRINGS.LOG_IN)} onPress={login} />
        ) : (
          <View style={{ gap: SIZES.small }}>
            <CustomButton title={t(AUTH_STRINGS.NEXT)} onPress={handleResetPass} />
            <CustomButton
              title={t(AUTH_STRINGS.CANCEL)}
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
              {t(AUTH_STRINGS.NO_ACCOUNT)}{' '}
              <Text
                style={[authStyles.registerTextStyle, authStyles.redirectTextStyle]}
                onPress={() => setStep(AUTH_STAGE.REGISTER)}>
                {t(AUTH_STRINGS.REGISTER)}
              </Text>
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
