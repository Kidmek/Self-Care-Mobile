import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useToast } from 'react-native-toast-notifications';

import { addAnalyticApi } from '~/api/analytics';
import { addLocalJournal, editLocalJournal } from '~/api/storage';
import { commonStyles } from '~/common/common.style';
import ImageContainer from '~/common/imageContainer/ImageContainer';
import { modalStyles } from '~/components/modal/modal.style';
import { AnalyticField } from '~/constants/strings/common';
import { HOME_STRINGS } from '~/constants/strings/home/home';
import { JOURNALING_STRINGS } from '~/constants/strings/home/self care/journal';
import { COLORS, FONT, SIZES } from '~/constants/theme';

export default function SingleJournal() {
  const params = useLocalSearchParams();
  const { t: i18n } = useTranslation();
  const [journey, setJourney] = useState({
    title: '',
    value: '',
  });
  const toast = useToast();
  const ref = useRef();
  const handleSave = () => {
    if (false) {
      // save to backend
    }
    const newData = {
      time: new Date(),
      title: journey.title.trim(),
      value: journey.value.trim(),
    };

    if (params.isEdit) {
      newData.edit_time = new Date();
      newData.time = params.time;
      editLocalJournal(newData);
    } else {
      addLocalJournal(newData);
    }

    toast.show('Recorded', {
      type: 'success',
    });
    addAnalyticApi({
      type: AnalyticField.JOURNAL,
    });
    setJourney({
      value: '',
      title: '',
    });
    router.back();
  };

  useEffect(() => {
    if (params.time) {
      setJourney({
        value: params.value,
        title: params.title,
      });
    }
  }, []);

  const checkIfEditable = () => {
    if (!params.time || params.isEdit) {
      return true;
    }
    return false;
  };

  return (
    <ImageContainer>
      <ScrollView
        contentContainerStyle={{
          gap: SIZES.xxLarge,
          paddingBottom: SIZES.xLarge,
        }}
        style={{ ...commonStyles.innerContainer, flex: 1 }}>
        <View style={styles.wrapper}>
          <Text style={styles.label}>{i18n(JOURNALING_STRINGS.TITLE)}</Text>
          <TextInput
            style={styles.input(checkIfEditable())}
            value={journey.title}
            onChangeText={(v) => setJourney({ ...journey, title: v })}
            onSubmitEditing={() => ref.current.focus()}
            editable={checkIfEditable()}
          />
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.label}>{i18n(JOURNALING_STRINGS.JOURNAL)}</Text>
          <TextInput
            ref={ref}
            style={[styles.input(checkIfEditable()), styles.textArea]}
            value={journey.value}
            onChangeText={(v) => setJourney({ ...journey, value: v })}
            multiline
            numberOfLines={20}
            editable={checkIfEditable()}
          />
        </View>

        {checkIfEditable() ? (
          <TouchableOpacity
            onPress={() => {
              handleSave();
            }}
            disabled={!journey.title?.length || !journey.value?.length}
            style={[
              styles.btn,
              (!journey.title?.length || !journey.value?.length) && styles.disabled,
            ]}>
            <Ionicons name="save-outline" size={SIZES.large} color={COLORS.white} />
            <Text style={modalStyles.textStyle}>{i18n(HOME_STRINGS.SAVE)}</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <Text style={styles.label}>
              {i18n(HOME_STRINGS.CREATED_AT)}{' '}
              <Text style={styles.value}>{new Date(params.time).toUTCString()}</Text>
            </Text>
            {params.edit_time && (
              <Text style={styles.label}>
                {i18n(HOME_STRINGS.EDITTED_AT)}{' '}
                <Text style={styles.value}>{new Date(params.edit_time).toUTCString()}</Text>
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </ImageContainer>
  );
}

const styles = StyleSheet.create({
  input: (enabled) => {
    return {
      width: '100%',
      borderWidth: StyleSheet.hairlineWidth,
      backgroundColor: COLORS.gray3 + (enabled ? 'FF' : '5F'),
      borderRadius: SIZES.xxSmall,
      padding: SIZES.medium,
      fontFamily: FONT.medium,
      color: enabled ? '' : COLORS.uiElementColors.text.primary,
      fontSize: SIZES.large,
    };
  },
  textArea: {
    textAlignVertical: 'top',
  },
  label: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: COLORS.dark,
  },
  wrapper: {
    gap: SIZES.small,
  },
  btn: {
    flex: 1,
    paddingHorizontal: SIZES.xSmall,
    paddingVertical: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SIZES.xLarge,
    marginBottom: SIZES.large,
  },
  disabled: {
    backgroundColor: COLORS.gray,
  },
  value: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS.dark,
  },
});
