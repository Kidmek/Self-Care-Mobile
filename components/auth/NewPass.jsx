import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, ScrollView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { authStyles } from './auth.style';

import { postSkeleton } from '~/api/apiConfig';
import { getUserData } from '~/api/storage';
import CustomButton from '~/common/button/CustomButton';
import CustomInput from '~/common/input/CustomInput';
import { AUTH_STRINGS } from '~/constants/strings/auth';
import { AUTH_STAGE } from '~/constants/strings/common';
import { COLORS, SIZES } from '~/constants/theme';

export default function NewPass({ setStep, otp }) {
  const { t } = useTranslation();
  const toast = useToast();
  const [confirmPass, setConfirmPass] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const setLoading = useStoreActions((actions) => actions.setLoading);
  const setForgotPass = useStoreActions((actions) => actions.setForgotPass);
  const isForgotPass = useStoreState((state) => state.isForgotPass);

  const handleResetPass = async () => {
    if (!Object.keys(errors).length) {
      setErrors({});
      const user = await getUserData();

      postSkeleton({
        url: 'auth/change-pass',
        dataToSend: { email: user.email, otp, password },
        errorMsg: t(AUTH_STRINGS.PASS_CHANGE_ERR),
        successMsg: t(AUTH_STRINGS.PASS_CHANGED_SUC),
        onSuccess: () => {
          setForgotPass(false);
          setStep(AUTH_STAGE.LOGIN);
        },
        toast,
        setLoading,
      });
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
  return (
    <View style={authStyles.container}>
      <Text style={authStyles.header}>
        {isForgotPass ? t(AUTH_STRINGS.FORGOT_PASSWORD) : t(AUTH_STRINGS.LOGIN)}
      </Text>
      <ScrollView contentContainerStyle={authStyles.body} showsVerticalScrollIndicator={false}>
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

        <View style={{ gap: SIZES.small }}>
          <CustomButton title={t(AUTH_STRINGS.NEXT)} onPress={handleResetPass} />
          <CustomButton
            title={t(AUTH_STRINGS.CANCEL)}
            onPress={() => {
              setErrors({});
              setForgotPass(false);
              setStep(AUTH_STAGE.LOGIN);
            }}
            color={COLORS.gray}
          />
        </View>
      </ScrollView>
    </View>
  );
}
