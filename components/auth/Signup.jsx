import { useStoreActions } from 'easy-peasy';
import Checkbox from 'expo-checkbox';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { authStyles } from './auth.style';

import { requestSkeleton } from '~/api/apiConfig';
import { setUserData } from '~/api/storage';
import CustomButton from '~/common/button/CustomButton';
import CustomInput from '~/common/input/CustomInput';
import CustomDateTimeInput from '~/common/input/DateTimeInput';
import Dropdown from '~/common/input/Dropdown';
import { AUTH_STRINGS } from '~/constants/strings/auth';
import { AUTH_STAGE, INPUT_TYPE, emailRegEx, phoneRegEx } from '~/constants/strings/common';
import { SIZES } from '~/constants/theme';

export default function SignUp({ setStep }) {
  const { t } = useTranslation();
  const toast = useToast();
  const setLoading = useStoreActions((actions) => actions.setLoading);

  const [agree, setAgree] = useState(false);
  const [user, setUser] = useState({
    // username: '',
    password: '',
    confirmPass: '',
    gender: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const handleChange = (value, name) => {
    const prev = user;

    prev[name] = value;
    setUser({ ...prev });
  };

  const register = () => {
    const errors = {};

    const bd = new Date(user.birthDate);
    if (bd.getTime() >= new Date().getTime()) {
      errors.birthDate = t(AUTH_STRINGS.INVALID_BIRTHDATE);
    }
    Object.entries(user).forEach(([k, v]) => {
      if (!v.length) {
        errors[k] = true;
      }
    });
    if (!user.email?.match(emailRegEx)) {
      errors.email = t(AUTH_STRINGS.INVALID_EMAIL);
    }
    if (!user.phone?.match(phoneRegEx)) {
      errors.phone = t(AUTH_STRINGS.INVALID_PHONE);
    }
    if (user.password?.length < 5) {
      errors.password = t(AUTH_STRINGS.PASS_LEN_ERR);
    }
    setErrors({ ...errors });

    if (Object.keys(errors).length) {
      toast.show(t(AUTH_STRINGS.INVALID_FIELDS), {
        type: 'danger',
      });
    } else {
      //
      if (!agree) {
        toast.show(t(AUTH_STRINGS.AGREE_TO_TERMS_ERR), {
          type: 'danger',
        });
        return;
      }
      requestSkeleton({
        method: 'POST',
        url: 'auth/register',
        dataToSend: { ...user, age: 10 },
        errorMsg: t(AUTH_STRINGS.REG_ERR),
        successMsg: t(AUTH_STRINGS.REG_SUCCESS),
        onSuccess: (data) => {
          if (data.user) {
            setUserData(data.user);
          }
          setStep(AUTH_STAGE.OTP);
        },
        toast,
        setLoading,
      });
    }
  };

  useEffect(() => {
    const prev = errors;
    if (user.password && user.password.length < 5) {
      prev.password = t(AUTH_STRINGS.PASS_LEN_ERR);
    } else if (user.password && user.confirmPass !== user.password) {
      prev.confirmPass = t(AUTH_STRINGS.PASS_NO_MATCH);
      prev.password = false;
    } else {
      prev.confirmPass = false;
      prev.password = false;
    }
    setErrors({ ...prev });
  }, [user.confirmPass, user.password]);
  return (
    <View style={authStyles.container}>
      <Text style={{ ...authStyles.header, marginVertical: SIZES.small }}>
        {t(AUTH_STRINGS.REGISTERATION)}
      </Text>
      <ScrollView contentContainerStyle={authStyles.body} showsVerticalScrollIndicator={false}>
        <View style={authStyles.inputContainer}>
          <CustomInput
            state={user.firstName}
            setState={handleChange}
            label={t(AUTH_STRINGS.FIRST_NAME)}
            placeholder={t(AUTH_STRINGS.FIRST_NAME_LABEL)}
            name="firstName"
            error={errors['firstName']}
          />
          <CustomInput
            state={user.lastName}
            setState={handleChange}
            label={t(AUTH_STRINGS.LAST_NAME)}
            placeholder={t(AUTH_STRINGS.LAST_NAME_LABEL)}
            name="lastName"
            error={errors['lastName']}
          />

          <CustomInput
            state={user.phone}
            setState={handleChange}
            label={t(AUTH_STRINGS.PHONE)}
            placeholder={t(AUTH_STRINGS.PHONE_LABEL)}
            name="phone"
            type={INPUT_TYPE.PHONE}
            error={errors['phone']}
            maxLength={user.phone?.startsWith('+') ? 13 : 10}
          />

          <CustomInput
            state={user.email}
            setState={handleChange}
            label={t(AUTH_STRINGS.EMAIL)}
            placeholder={t(AUTH_STRINGS.EMAIL_LABEL)}
            name="email"
            type={INPUT_TYPE.EMAIL}
            error={errors['email']}
          />

          <Dropdown
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
            ]}
            selected={user.gender}
            setSelected={(g) => handleChange(g.value, 'gender')}
            placeholder={t(AUTH_STRINGS.GENDER_LABEL)}
            label={t(AUTH_STRINGS.GENDER)}
            error={errors['gender']}
          />
          <CustomDateTimeInput
            state={user.birthDate}
            setState={handleChange}
            label={t(AUTH_STRINGS.BIRTH_DATE)}
            placeholder={t(AUTH_STRINGS.BIRTH_DATE_LABEL)}
            name="birthDate"
            type={INPUT_TYPE.DATE}
            error={errors['birthDate']}
          />

          <CustomInput
            state={user.password}
            setState={handleChange}
            label={t(AUTH_STRINGS.PASSWORD)}
            placeholder={t(AUTH_STRINGS.PASSWORD_LABEL)}
            isPassword
            name="password"
            error={errors['password']}
          />
          <CustomInput
            state={user.confirmPass}
            setState={handleChange}
            label={t(AUTH_STRINGS.CONFIRM_PASSWORD)}
            placeholder={t(AUTH_STRINGS.CONFIRM_PASSWORD_LABEL)}
            isPassword
            name="confirmPass"
            error={errors['confirmPass']}
          />
          <View style={authStyles.termsAndCondition}>
            <Checkbox
              value={agree}
              onValueChange={(v) => {
                setAgree(v);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                router.push('/terms');
              }}>
              <Text style={authStyles.forgetTxt}>{t(AUTH_STRINGS.AGREE_TO_TERMS)}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <CustomButton title={t(AUTH_STRINGS.REGISTER)} onPress={register} />

        <View style={authStyles.bottomTextStyle}>
          <Text style={authStyles.registerTextStyle}>
            {t(AUTH_STRINGS.YES_ACCOUNT)}{' '}
            <Text
              style={[authStyles.registerTextStyle, authStyles.redirectTextStyle]}
              onPress={() => setStep(AUTH_STAGE.LOGIN)}>
              {t(AUTH_STRINGS.LOGIN)}
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
