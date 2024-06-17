import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import React, { useEffect, useRef, useState } from 'react';
import {
  TextInput,
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

import { SETTING_STRINGS } from '~/constants/strings/setting';
import { COLORS, FONT, SIZES } from '~/constants/theme';
type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  t: any;
  savePin?: (pin: string) => void;
  settings?: any;
};

export default function PinModal({ visible, setVisible, t, savePin, settings }: Props) {
  const [pin, setPin] = useState(['', '', '', '']);
  const [focused, setFocused] = useState(0);
  const [error, setError] = useState(false);
  const refs = useRef<(TextInput | null)[]>([]);
  const handlePress = (i: number) => {
    if (i === 10) {
      setPin((prev) => {
        prev[focused] = '';
        return [...prev];
      });
      if (focused > 0) {
        setFocused(focused - 1);
      }
    } else if (i === 11) {
      setPin((prev) => {
        prev[focused] = '0';
        return [...prev];
      });
      if (focused < 0) {
        setFocused(focused - 1);
      }
    } else if (i === 12) {
      if (savePin) {
        if (pin.join('').trim().length === 4) {
          savePin(pin.join(''));
        }
      } else {
        LocalAuthentication.authenticateAsync({})
          .then((res) => {
            if (res.success) {
              setVisible(false);
            }
          })
          .catch((err) => {
            console.log('Pin Modal Error, ', err);
          });
        // biometric
      }
    } else {
      setPin((prev) => {
        prev[focused] = i.toString();
        return [...prev];
      });
      if (focused < 3) {
        setFocused(focused + 1);
      }
    }
  };
  const renderSingle = (i: number) => {
    return (
      <TextInput
        ref={(el) => (refs.current[i] = el)}
        showSoftInputOnFocus={false}
        key={i}
        value={pin.at(i)}
        style={styles.input}
        onFocus={() => {
          setFocused(i);
        }}
        secureTextEntry
        editable={false}
      />
    );
  };

  const renderSingleKey = (i: number) => {
    return (
      <TouchableOpacity key={i} style={styles.singleKey} onPress={() => handlePress(i)}>
        {i === 10 ? (
          <Ionicons name="backspace" color="white" size={SIZES.xxLarge} />
        ) : i === 12 ? (
          (savePin || settings?.[SETTING_STRINGS.ENABLE_BIOMETRICS] === true) && (
            <Ionicons
              name={savePin ? 'checkmark' : 'finger-print'}
              color="white"
              size={SIZES.xxLarge}
            />
          )
        ) : (
          <Text
            // @ts-ignore
            showSoftInputOnFocus={false}
            value={pin.at(i)}
            style={styles.headerText}>
            {i === 11 ? 0 : i}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    refs.current[focused]?.focus();
  }, [focused]);

  useEffect(() => {
    const entered = pin.join('').trim();
    console.log(settings?.[SETTING_STRINGS.CHANGE_PIN]);
    if (entered.length === 4 && !savePin) {
      if (settings?.[SETTING_STRINGS.CHANGE_PIN] === entered) {
        setVisible(false);
      } else {
        setError(true);
      }
    }
  }, [pin]);

  useEffect(() => {
    setPin(['', '', '', '']);
  }, [visible]);

  // console.log(settings[SETTING_STRINGS.ENABLE_BIOMETRICS]);
  // console.log(settings[SETTING_STRINGS.CHANGE_PIN]);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}>
      <View style={styles.container}>
        <Pressable
          style={styles.iconContainer}
          onPress={() => {
            if (savePin) {
              setVisible(false);
            } else {
              BackHandler.exitApp();
            }
          }}>
          <Ionicons name="close-circle" size={SIZES.tabHeight} color="white" />
        </Pressable>
        <View style={styles.body}>
          {!savePin ? (
            <View style={styles.lockContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={SIZES.tabHeight}
                color={error ? 'red' : 'white'}
              />
              <Text
                style={[
                  styles.headerText,
                  error && {
                    color: 'red',
                  },
                ]}>
                <Text style={styles.headerText}>
                  {error ? t(SETTING_STRINGS.WRONG_PIN) : t(SETTING_STRINGS.ENTER_PIN)}
                </Text>
              </Text>
            </View>
          ) : (
            <Text style={styles.headerText}>{t(SETTING_STRINGS.SET_PIN)}</Text>
          )}
          <View style={styles.inputContainer}>
            {Array.from(Array(4).keys()).map((i) => {
              return renderSingle(i);
            })}
          </View>
          <View style={styles.keyboardContainer}>
            {Array.from(Array(12).keys()).map((i) => {
              i = i + 1;
              return renderSingleKey(i);
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    flex: 1,
  },
  iconContainer: {
    alignSelf: 'flex-end',
    margin: SIZES.large,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: SIZES.xxLarge,
  },
  headerText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.white,
    textAlign: 'center',
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: SIZES.small,
    borderRadius: SIZES.medium,
    textAlign: 'center',
    borderColor: COLORS.white,
    color: COLORS.white,
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
  },
  singleKey: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: SIZES.small,
    borderRadius: SIZES.medium,
    textAlign: 'center',
    borderColor: COLORS.white,
    color: COLORS.white,
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    width: SIZES.xxLarge * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SIZES.large,
    marginBottom: SIZES.smallPicture,
    paddingHorizontal: SIZES.smallPicture * 0.75,
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
  },
  lockContainer: {
    flexDirection: 'column',
    gap: SIZES.small,
    alignItems: 'center',
  },
});
