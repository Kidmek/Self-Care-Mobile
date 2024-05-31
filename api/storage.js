import AsyncStorage from '@react-native-async-storage/async-storage';

import { ADMIN, LANGUAGE_KEY, ROLE_KEY, TOKEN_KEY, USER_KEY } from '~/constants/strings/api';
import { ASSESSMENT_STRINGS } from '~/constants/strings/home/assessment/assessment';

export const setToken = async (token) => {
  if (token) {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } else {
    await AsyncStorage.removeItem(TOKEN_KEY);
  }
};

export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};
export const isAdmin = async () => {
  return getRole() === ADMIN;
};

export const getUserData = async () => {
  const user = await AsyncStorage.getItem(USER_KEY);
  return JSON.parse(user);
};

export const setUserData = async (user) => {
  if (user) {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    await AsyncStorage.removeItem(USER_KEY);
  }
};

export const setLanguage = async (language) => {
  await AsyncStorage.setItem(LANGUAGE_KEY, language);
};

export const getLanguage = async () => {
  return await AsyncStorage.getItem(LANGUAGE_KEY);
};

export const getRole = async () => {
  return await AsyncStorage.getItem(ROLE_KEY);
};

export const setRole = async (role) => {
  await AsyncStorage.setItem(ROLE_KEY, role);
};

export const logout = async () => {
  await AsyncStorage.removeItem(USER_KEY);
  await AsyncStorage.removeItem(TOKEN_KEY);
};

export const setWheelData = async (data) => {
  await AsyncStorage.setItem(ASSESSMENT_STRINGS.LIFE_WHEEL, JSON.stringify(data));
};

export const getWheelData = async () => {
  const wheelData = await AsyncStorage.getItem(ASSESSMENT_STRINGS.LIFE_WHEEL);
  return JSON.parse(wheelData);
};
