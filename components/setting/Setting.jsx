import * as LocalAuthentication from 'expo-local-authentication';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, Switch } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import PinModal from '../modal/PinModal';

import { getLanguage, getLocalSettings, setLanguage, setLocalSettings } from '~/api/storage';
import CustomButton from '~/common/button/CustomButton';
import ImageContainer from '~/common/imageContainer/ImageContainer';
import { languages } from '~/constants/strings/common';
import { SETTING_STRINGS } from '~/constants/strings/setting';
import { COLORS, FONT, SIZES } from '~/constants/theme';
import { cancelNotification, changeAllType } from '~/utils/notification';

export default function Setting() {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [languageOpen, setLanguageOpen] = useState(false);
  const [settings, setSettings] = useState({});
  const [visible, setVisible] = useState(false);

  const fetch = async () => {
    const saved = await getLocalSettings();
    if (saved) {
      setSettings(saved);
    }
  };

  const checkNotification = () => {
    return settings[SETTING_STRINGS.ALLOW_NOTIFIACTION] === true;
  };
  const checkPin = () => {
    return settings[SETTING_STRINGS.PIN_LOCK] === true;
  };

  const checkValue = (name) => {
    return settings[name] === true;
  };
  const savePin = (pin) => {
    console.log('Save pin');
    const prev = settings;
    prev[SETTING_STRINGS.CHANGE_PIN] = pin;
    prev[SETTING_STRINGS.PIN_LOCK] = true;
    setLocalSettings(prev);
    setSettings({ ...prev });
    setVisible(false);
  };

  const changeValue = async (name) => {
    const prev = { ...settings };
    prev[name] = !prev[name];

    if (name === SETTING_STRINGS.SOUND || name === SETTING_STRINGS.VIBRATION) {
      changeAllType(
        prev[SETTING_STRINGS.VIBRATION] === true,
        prev[SETTING_STRINGS.SOUND] === true,
        t
      );
    }

    if (name === SETTING_STRINGS.ALLOW_NOTIFIACTION) {
      if (prev[name]) {
        changeAllType(
          prev[SETTING_STRINGS.VIBRATION] === true,
          prev[SETTING_STRINGS.SOUND] === true,
          t
        );
        console.log('notification allowed');
      } else {
        await cancelNotification();
        console.log('notifications disabled');
      }
    }
    if (name === SETTING_STRINGS.PIN_LOCK) {
      if (prev[name]) {
        if (settings[SETTING_STRINGS.CHANGE_PIN]?.length !== 4) {
          setVisible(true);
          return;
        }
        console.log('pin activated');
      } else {
        console.log('pin disabled');
      }
    }
    setSettings({ ...prev });
  };

  const renderSingle = (name, disabled) => {
    return (
      <View style={styles.singleSetting}>
        <Text
          style={[
            styles.singleSettingHeader,
            disabled && {
              color: COLORS.gray,
            },
          ]}>
          {t(name)}
        </Text>
        <Switch
          value={checkValue(name)}
          onValueChange={() => changeValue(name)}
          disabled={disabled}
        />
      </View>
    );
  };

  useEffect(() => {
    fetch();
    getLocalSettings().then((s) => {
      setSettings(s);
    });
    getLanguage().then((l) => {
      setSelectedLanguage(l);
    });
  }, []);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  useEffect(() => {
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
      i18next.changeLanguage(selectedLanguage);
    }
  }, [selectedLanguage]);
  return (
    <ImageContainer hasTab={false}>
      <PinModal visible={visible} setVisible={setVisible} t={t} savePin={savePin} />
      <View style={styles.body}>
        <View style={styles.category}>
          <Text style={styles.categoryHeader}>{t(SETTING_STRINGS.GENERAL)}</Text>
          <View style={styles.singleSetting}>
            <Text style={[styles.singleSettingHeader]}>{t(SETTING_STRINGS.LANGUAGE)}</Text>

            <DropDownPicker
              style={{
                backgroundColor: 'transparent',
              }}
              containerStyle={{
                width: '35%',
                alignSelf: 'flex-end',
                marginRight: SIZES.small,
                backgroundColor: 'transparent',
                zIndex: 100,
              }}
              value={selectedLanguage}
              items={languages}
              setOpen={setLanguageOpen}
              open={languageOpen}
              setValue={setSelectedLanguage}
              onChangeValue={(value) => {
                if (value) {
                }
              }}
              placeholder="Language"
            />
          </View>
        </View>
        <View style={styles.category}>
          <Text style={styles.categoryHeader}>{t(SETTING_STRINGS.NOTIFICATION)}</Text>
          {renderSingle(SETTING_STRINGS.ALLOW_NOTIFIACTION, false)}
          {renderSingle(SETTING_STRINGS.SOUND, !checkNotification())}
          {renderSingle(SETTING_STRINGS.VIBRATION, !checkNotification())}
        </View>
        <View style={styles.category}>
          <Text style={styles.categoryHeader}>{t(SETTING_STRINGS.SECURITY)}</Text>
          {renderSingle(SETTING_STRINGS.PIN_LOCK)}
          {renderSingle(
            SETTING_STRINGS.ENABLE_BIOMETRICS,
            !checkPin() || !LocalAuthentication.hasHardwareAsync()
          )}
          <View
            style={{
              paddingHorizontal: SIZES.large,
              marginVertical: SIZES.medium,
            }}>
            <CustomButton
              title={t(SETTING_STRINGS.CHANGE_PIN)}
              disabled={!checkPin()}
              pressable
              onPress={() => {
                setVisible(true);
              }}
            />
          </View>
        </View>
      </View>
    </ImageContainer>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.medium,
    gap: SIZES.large,
  },
  category: {},
  categoryHeader: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xLarge,
  },
  singleSetting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.large,
  },
  singleSettingHeader: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
  },
});
