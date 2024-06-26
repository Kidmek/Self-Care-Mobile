import { useStoreActions } from 'easy-peasy';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from 'expo-router/src/useNavigation';
import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { postSkeleton } from '~/api/apiConfig';
import CustomButton from '~/common/button/CustomButton';
import ImageContainer from '~/common/imageContainer/ImageContainer';
import CustomInput from '~/common/input/CustomInput';
import { PROFILE_STRINGS } from '~/constants/strings/profile';
import { SIZES } from '~/constants/theme';

export default function Password() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const setLoading = useStoreActions((actions) => actions.setLoading);
  const checkPassword = () => {
    const newErrors = {};
    if (password && password.length < 5) {
      newErrors.password = 'Password must be atleast 5 characters';
    }
    setErrors(newErrors);
    if (!newErrors.password) {
      postSkeleton({
        url: 'auth/checkPassword',
        params: { password },
        onSuccess: () => {
          navigation.navigate('change', {
            type: params?.type,
          });
        },
        setLoading,
        toast,
      });
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: params?.type,
      headerTitleAlign: 'center',
    });
  }, [params]);
  return (
    <ImageContainer noImage>
      <View style={styles.body}>
        <CustomInput
          state={password}
          setState={(v) => setPassword(v)}
          label={t(PROFILE_STRINGS.PASSWORD)}
          placeholder={t(PROFILE_STRINGS.PASSWORD_PLACEHOLDER)}
          name="password"
          error={errors['password']}
          isPassword
        />
        <CustomButton onPress={checkPassword} title={t(PROFILE_STRINGS.CONFIRM)} />
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
