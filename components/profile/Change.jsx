import { useStoreActions } from 'easy-peasy';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import OTP from '../auth/Otp';
import { authStyles } from '../auth/auth.style';

import { requestSkeleton } from '~/api/apiConfig';
import { getUserData } from '~/api/storage';
import CustomButton from '~/common/button/CustomButton';
import ImageContainer from '~/common/imageContainer/ImageContainer';
import CustomInput from '~/common/input/CustomInput';
import { AUTH_STRINGS } from '~/constants/strings/auth';
import { AUTH_STAGE, INPUT_TYPE, emailRegEx } from '~/constants/strings/common';
import { PROFILE_STRINGS } from '~/constants/strings/profile';
import { SIZES } from '~/constants/theme';

export default function Change() {
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(AUTH_STAGE.LOGIN);
  const [confirmPass, setConfirmPass] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState();
  const setLoading = useStoreActions((actions) => actions.setLoading);
  const toast = useToast();

  const handleResetPass = async () => {
    if (params?.type === PROFILE_STRINGS.CHANGE_EMAIL) {
      const user = await getUserData();

      const newErrors = {};
      if (!email?.match(emailRegEx)) {
        newErrors.email = t(AUTH_STRINGS.INVALID_EMAIL);
      }

      if (user.email === email) {
        newErrors.email = t(PROFILE_STRINGS.SAME_EMAIL);
      }
      setErrors(newErrors);

      if (!Object.keys(newErrors).length) {
        setErrors({});

        requestSkeleton({
          method: 'POST',
          url: 'auth/new-email',
          params: { email },
          errorMsg: t(AUTH_STRINGS.UNABLE_TO_SEND_VERIFICATION),
          successMsg: t(AUTH_STRINGS.VERIFICATION_PLACEHOLDER, {
            sent_to: email,
          }),
          onSuccess: () => {
            setStep(AUTH_STAGE.OTP);
          },
          toast,
          setLoading,
        });
      }
    } else {
      if (!Object.keys(errors).length) {
        setErrors({});

        requestSkeleton({
          method: 'POST',
          url: 'auth/new-pass',
          params: { password },
          errorMsg: t(AUTH_STRINGS.PASS_CHANGE_ERR),
          successMsg: t(AUTH_STRINGS.PASS_CHANGED_SUC),
          onSuccess: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: '(drawer)' }],
            });
          },
          toast,
          setLoading,
        });
      }
    }
  };
  useEffect(() => {
    const prev = {};
    if (password && password.length < 5) {
      prev.password = t(AUTH_STRINGS.PASS_LEN_ERR);
    } else if (password && confirmPass !== password) {
      prev.confirmPass = t(AUTH_STRINGS.PASS_NO_MATCH);
      prev.password = false;
    }
    setErrors(prev);
  }, [confirmPass, password]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t(params?.type),
      headerTitleAlign: 'center',
    });
  }, [params]);

  return (
    <ImageContainer noImage>
      <View style={styles.body} contentContainerStyle={authStyles.body}>
        {params?.type === PROFILE_STRINGS.CHANGE_PASSWORD ? (
          <View style={authStyles.inputContainer}>
            <CustomInput
              state={password}
              setState={(v) => {
                setPassword(v);
              }}
              label={t(AUTH_STRINGS.PASSWORD)}
              placeholder={t(AUTH_STRINGS.PASSWORD_LABEL)}
              isPassword
              error={errors['password']}
              name="password"
            />
            <CustomInput
              state={confirmPass}
              setState={(v) => {
                setConfirmPass(v);
              }}
              label={t(AUTH_STRINGS.CONFIRM_PASSWORD)}
              placeholder={t(AUTH_STRINGS.CONFIRM_PASSWORD_LABEL)}
              isPassword
              name="confirmPass"
              error={errors['confirmPass']}
            />
          </View>
        ) : step === AUTH_STAGE.LOGIN ? (
          <View style={authStyles.inputContainer}>
            <CustomInput
              state={email}
              setState={(v) => {
                setEmail(v);
              }}
              label={t(PROFILE_STRINGS.NEW_EMAIL)}
              placeholder={t(PROFILE_STRINGS.NEW_EMAIL_PLACEHOLDER)}
              type={INPUT_TYPE.EMAIL}
              error={errors['email']}
              name="email"
            />
          </View>
        ) : (
          <OTP
            setStep={setStep}
            email={email}
            onSuccess={() => {
              navigation.navigate('(tabs)');
            }}
          />
        )}

        {step !== AUTH_STAGE.OTP && (
          <View style={{ gap: SIZES.small }}>
            <CustomButton title={t(PROFILE_STRINGS.CHANGE)} onPress={handleResetPass} />
          </View>
        )}
      </View>
    </ImageContainer>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.medium,
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: SIZES.smallPicture / 2,
  },
});
