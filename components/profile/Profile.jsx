import { useStoreActions } from 'easy-peasy';
import { useFocusEffect } from 'expo-router';
import { useNavigation } from 'expo-router/src/useNavigation';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { authStyles } from '../auth/auth.style';

import { getSkeleton, putSkeleton } from '~/api/apiConfig';
import { setUserData } from '~/api/storage';
import CustomButton from '~/common/button/CustomButton';
import HeaderIcon from '~/common/header/HeaderIcon';
import ImageContainer from '~/common/imageContainer/ImageContainer';
import CustomInput from '~/common/input/CustomInput';
import Dropdown from '~/common/input/Dropdown';
import { AUTH_STRINGS } from '~/constants/strings/auth';
import { HEADER_TYPES, INPUT_TYPE } from '~/constants/strings/common';
import { PROFILE_STRINGS } from '~/constants/strings/profile';
import { SIZES } from '~/constants/theme';

export default function Profile() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [edit, setEdit] = useState();

  const [user, setUser] = useState({
    username: '',
    gender: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const setLoading = useStoreActions((action) => action.setLoading);
  const handleChange = (value, name) => {
    const prev = newUser;

    prev[name] = value;
    setNewUser({ ...prev });
  };

  const [newUser, setNewUser] = useState({});

  const onEdit = () => {
    const errors = {};
    Object.entries(newUser).forEach(([k, v]) => {
      if (!v.length) {
        errors[k] = true;
      }
    });
    setErrors({ ...errors });
    if (Object.keys(errors).length) {
      toast.show('Invalid fields', {
        type: 'danger',
      });
    } else {
      putSkeleton({
        url: 'users',
        dataToSend: {
          ...newUser,
          email: null,
        },
        toast,
        setLoading,
        onSuccess: (data) => {
          console.log('New User:', data);
          fetch();
          setEdit(false);
        },
      });
    }
  };

  const fetch = () => {
    getSkeleton({
      url: 'auth/self',
      setData: (data) => {
        const { isActive, id, role, ...rest } = data;
        setUser({ ...rest });
        setNewUser({ ...rest });
        setUserData(rest);
      },
      toast,
      setLoading,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderIcon
          name={edit ? 'checkmark' : 'pencil-sharp'}
          onPress={() => {
            if (edit) {
              onEdit();
            } else {
              setEdit(true);
            }
          }}
          margin
        />
      ),
      headerLeft: () => (
        <HeaderIcon
          name={edit ? 'close' : undefined}
          onPress={
            edit
              ? () => {
                  setEdit(!edit);
                }
              : undefined
          }
          margin
          type={HEADER_TYPES.BACK}
        />
      ),
    });
  }, [edit]);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      if (isActive) {
        fetch();
      }
      return () => {
        isActive = false;
      };
    }, [])
  );

  useEffect(() => {
    fetch();
  }, []);
  return (
    <ImageContainer hasTab={false} noImage>
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <View style={authStyles.inputContainer}>
          <CustomInput
            state={edit ? newUser.firstName : user.firstName}
            setState={handleChange}
            label={t(AUTH_STRINGS.FIRST_NAME)}
            placeholder={t(AUTH_STRINGS.FIRST_NAME_LABEL)}
            name="firstName"
            error={errors['firstName']}
            disabled={!edit}
          />
          <CustomInput
            state={edit ? newUser.lastName : user.lastName}
            setState={handleChange}
            label={t(AUTH_STRINGS.LAST_NAME)}
            placeholder={t(AUTH_STRINGS.LAST_NAME_LABEL)}
            name="lastName"
            error={errors['lastName']}
            disabled={!edit}
          />
          <CustomInput
            state={edit ? newUser.username : user.username}
            setState={handleChange}
            label={t(AUTH_STRINGS.USERNAME)}
            placeholder={t(AUTH_STRINGS.USERNAME_LABEL)}
            name="username"
            error={errors['username']}
            disabled={!edit}
          />

          <CustomInput
            state={user.email}
            setState={handleChange}
            label={t(AUTH_STRINGS.EMAIL)}
            placeholder={t(AUTH_STRINGS.EMAIL_LABEL)}
            name="email"
            type={INPUT_TYPE.EMAIL}
            error={errors['email']}
            disabled
          />

          {user?.gender !== 'Admin' && (
            <Dropdown
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
              ]}
              selected={edit ? newUser.gender : undefined}
              setSelected={(g) => handleChange(g.value, 'gender')}
              placeholder={edit ? t(AUTH_STRINGS.GENDER_LABEL) : user.gender}
              label={t(AUTH_STRINGS.GENDER)}
              error={errors['gender']}
              disabled={!edit}
            />
          )}
          <CustomInput
            state={edit ? newUser.birthDate : user.birthDate}
            setState={handleChange}
            label={t(AUTH_STRINGS.BIRTH_DATE)}
            placeholder={t(AUTH_STRINGS.BIRTH_DATE_LABEL)}
            name="birthDate"
            type={INPUT_TYPE.DATE}
            error={errors['birthDate']}
            disabled={!edit}
          />

          {edit && (
            <View style={styles.btnContainer}>
              <CustomButton
                onPress={() => {
                  navigation.navigate('password', {
                    type: PROFILE_STRINGS.CHANGE_EMAIL,
                  });
                }}
                title={t(PROFILE_STRINGS.CHANGE_EMAIL)}
              />
              <CustomButton
                onPress={() => {
                  navigation.navigate('password', {
                    type: PROFILE_STRINGS.CHANGE_PASSWORD,
                  });
                }}
                title={t(PROFILE_STRINGS.CHANGE_PASSWORD)}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </ImageContainer>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.medium,
  },
  btnContainer: {
    gap: SIZES.large,
    marginTop: SIZES.xxLarge,
  },
});
