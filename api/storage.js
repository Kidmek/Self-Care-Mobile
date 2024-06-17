import AsyncStorage from '@react-native-async-storage/async-storage';

import { ADMIN, LANGUAGE_KEY, ROLE_KEY, TOKEN_KEY, USER_KEY } from '~/constants/strings/api';
import { ASSESSMENT_STRINGS } from '~/constants/strings/home/assessment/assessment';
import { HOME_STRINGS } from '~/constants/strings/home/home';
import { TECHNIQUES_STRINGS } from '~/constants/strings/home/self care/techniques';

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
  await AsyncStorage.clear();
};

export const setWheelData = async (data) => {
  await AsyncStorage.setItem(ASSESSMENT_STRINGS.LIFE_WHEEL, JSON.stringify(data));
};

export const getWheelData = async () => {
  const wheelData = await AsyncStorage.getItem(ASSESSMENT_STRINGS.LIFE_WHEEL);
  return JSON.parse(wheelData);
};

// export const deleteTrackingInfo = async (id)=>{
//   await
// }

export const setTrackingInfo = async (data) => {
  await AsyncStorage.setItem(ASSESSMENT_STRINGS.MOOD_TRACKING, JSON.stringify(data));
};

export const getTrackingInfo = async () => {
  const data = await AsyncStorage.getItem(ASSESSMENT_STRINGS.MOOD_TRACKING);
  return JSON.parse(data);
};

export const setLocalJournals = async (data) => {
  await AsyncStorage.setItem(TECHNIQUES_STRINGS.JOURNALING, JSON.stringify(data));
};

export const getLocalJournals = async () => {
  const data = await AsyncStorage.getItem(TECHNIQUES_STRINGS.JOURNALING);
  return JSON.parse(data);
};
export const addLocalJournal = async (data) => {
  const prev = (await getLocalJournals()) ?? [];
  setLocalJournals([...prev, data]);
};

export const setLocalReminders = async (data) => {
  await AsyncStorage.setItem(HOME_STRINGS.REMINDER, JSON.stringify(data));
};

export const getLocalReminders = async () => {
  const data = await AsyncStorage.getItem(HOME_STRINGS.REMINDER);
  return JSON.parse(data);
};
export const addLocalReminder = async (data) => {
  const prev = (await getLocalReminders()) ?? [];
  setLocalJournals([...prev, data]);
};

export const setLocalSettings = async (data) => {
  await AsyncStorage.setItem(HOME_STRINGS.SETTING, JSON.stringify(data));
};

export const getLocalSettings = async () => {
  const data = await AsyncStorage.getItem(HOME_STRINGS.SETTING);
  return JSON.parse(data);
};
