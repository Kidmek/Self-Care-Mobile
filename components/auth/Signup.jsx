import { useStoreActions } from 'easy-peasy';
import Checkbox from 'expo-checkbox';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { authStyles } from './auth.style';

import { postSkeleton } from '~/api/apiConfig';
import { setUserData } from '~/api/storage';
import CustomButton from '~/common/button/CustomButton';
import CustomInput from '~/common/input/CustomInput';
import Dropdown from '~/common/input/Dropdown';
import { AUTH_STRINGS } from '~/constants/strings/auth';
import { AUTH_STAGE, INPUT_TYPE, emailRegEx } from '~/constants/strings/common';
import { SIZES } from '~/constants/theme';

export default function SignUp({ setStep }) {
  const { t: i18n } = useTranslation();
  const toast = useToast();
  const setLoading = useStoreActions((actions) => actions.setLoading);

  const [agree, setAgree] = useState(false);
  const [user, setUser] = useState({
    username: '',
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
    Object.entries(user).forEach(([k, v]) => {
      if (!v.length) {
        errors[k] = true;
      }
    });
    if (!user.email.match(emailRegEx)) {
      errors.email = 'Invalid email';
    }
    if (user.password.length < 5) {
      errors.password = 'Password must be atleast 5 characters';
    }
    setErrors({ ...errors });

    if (Object.keys(errors).length) {
      toast.show('Invalid fields', {
        type: 'danger',
      });
    } else {
      //
      if (!agree) {
        toast.show('Agree to terms and conditions', {
          type: 'danger',
        });
        return;
      }
      postSkeleton({
        url: 'auth/register',
        dataToSend: { ...user, age: 10 },
        errorMsg: 'Unable to register',
        successMsg: 'Successfully created',
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
      prev.password = 'Password must be atleast 5 characters';
    } else if (user.password && user.confirmPass !== user.password) {
      prev.confirmPass = "Passwords Don't Match";
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
        {i18n(AUTH_STRINGS.REGISTERATION)}
      </Text>
      <ScrollView contentContainerStyle={authStyles.body} showsVerticalScrollIndicator={false}>
        <View style={authStyles.inputContainer}>
          <CustomInput
            state={user.firstName}
            setState={handleChange}
            label={i18n(AUTH_STRINGS.FIRST_NAME)}
            placeholder={i18n(AUTH_STRINGS.FIRST_NAME_LABEL)}
            name="firstName"
            error={errors['firstName']}
          />
          <CustomInput
            state={user.lastName}
            setState={handleChange}
            label={i18n(AUTH_STRINGS.LAST_NAME)}
            placeholder={i18n(AUTH_STRINGS.LAST_NAME_LABEL)}
            name="lastName"
            error={errors['lastName']}
          />
          <CustomInput
            state={user.username}
            setState={handleChange}
            label={i18n(AUTH_STRINGS.USERNAME)}
            placeholder={i18n(AUTH_STRINGS.USERNAME_LABEL)}
            name="username"
            error={errors['username']}
          />

          <CustomInput
            state={user.email}
            setState={handleChange}
            label={i18n(AUTH_STRINGS.EMAIL)}
            placeholder={i18n(AUTH_STRINGS.EMAIL_LABEL)}
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
            placeholder={i18n(AUTH_STRINGS.GENDER_LABEL)}
            label={i18n(AUTH_STRINGS.GENDER)}
            error={errors['gender']}
          />
          <CustomInput
            state={user.birthDate}
            setState={handleChange}
            label={i18n(AUTH_STRINGS.BIRTH_DATE)}
            placeholder={i18n(AUTH_STRINGS.BIRTH_DATE_LABEL)}
            name="birthDate"
            type={INPUT_TYPE.DATE}
            error={errors['birthDate']}
          />

          <CustomInput
            state={user.password}
            setState={handleChange}
            label={i18n(AUTH_STRINGS.PASSWORD)}
            placeholder={i18n(AUTH_STRINGS.PASSWORD_LABEL)}
            isPassword
            name="password"
            error={errors['password']}
          />
          <CustomInput
            state={user.confirmPass}
            setState={handleChange}
            label={i18n(AUTH_STRINGS.CONFIRM_PASSWORD)}
            placeholder={i18n(AUTH_STRINGS.CONFIRM_PASSWORD_LABEL)}
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
            <TouchableOpacity>
              <Text style={authStyles.forgetTxt}>{i18n(AUTH_STRINGS.AGREE_TO_TERMS)}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <CustomButton title={i18n(AUTH_STRINGS.REGISTER)} onPress={register} />

        <View style={authStyles.bottomTextStyle}>
          <Text style={authStyles.registerTextStyle}>
            {i18n(AUTH_STRINGS.YES_ACCOUNT)}{' '}
            <Text
              style={[authStyles.registerTextStyle, authStyles.redirectTextStyle]}
              onPress={() => setStep(AUTH_STAGE.LOGIN)}>
              {i18n(AUTH_STRINGS.LOGIN)}
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
