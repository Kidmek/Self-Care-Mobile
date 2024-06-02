import { Ionicons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, StyleSheet, BackHandler, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useToast } from 'react-native-toast-notifications';

import { addLocalJournal } from '~/api/storage';
import { commonStyles } from '~/common/common.style';
import ImageContainer from '~/common/imageContainer/ImageContainer';
import { modalStyles } from '~/components/modal/modal.style';
import { HOME_STRINGS } from '~/constants/strings/home/home';
import { JOURNALING_STRINGS } from '~/constants/strings/home/self care/journal';
import { COLORS, FONT, SHADOWS, SIZES } from '~/constants/theme';

export default function SingleJournal() {
  const navigation = useNavigation();
  const { t: i18n } = useTranslation();
  const [journy, setJourny] = useState({
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
      ...journy,
    };

    addLocalJournal(newData);
    toast.show('Recorded', {
      type: 'success',
    });
    setJourny({
      value: '',
      title: '',
    });
    router.back();
  };

  return (
    <ImageContainer>
      <ScrollView
        contentContainerStyle={{
          gap: SIZES.xxLarge,
        }}
        style={{ ...commonStyles.innerContainer, flex: 1 }}>
        <View style={styles.wrapper}>
          <Text style={styles.label}>{i18n(JOURNALING_STRINGS.TITLE)}</Text>
          <TextInput
            style={styles.input}
            value={journy.title}
            onChangeText={(v) => setJourny({ ...journy, title: v })}
            onSubmitEditing={() => ref.current.focus()}
          />
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.label}>{i18n(JOURNALING_STRINGS.JOURNAL)}</Text>
          <TextInput
            ref={ref}
            style={[styles.input, styles.textArea]}
            value={journy.value}
            onChangeText={(v) => setJourny({ ...journy, value: v })}
            multiline
            numberOfLines={28}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            handleSave();
          }}
          style={[styles.btn]}>
          <Ionicons name="save-outline" size={SIZES.large} color={COLORS.white} />
          <Text style={modalStyles.textStyle}>{i18n(HOME_STRINGS.SAVE)}</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.gray3,
    borderRadius: SIZES.xxSmall,
    padding: SIZES.medium,
    fontFamily: FONT.medium,
    ...SHADOWS.medium,
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
});
