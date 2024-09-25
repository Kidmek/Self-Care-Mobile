import { useStoreActions } from 'easy-peasy';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { requestSkeleton } from '~/api/apiConfig';
import CustomButton from '~/common/button/CustomButton';
import ImageContainer from '~/common/imageContainer/ImageContainer';
import { INFO_STRINGS } from '~/constants/strings/info';
import { COLORS, FONT, SIZES } from '~/constants/theme';

export default function Feedback() {
  const { t } = useTranslation();
  const [improvement, setImprovement] = useState('');
  const [feedback, setFeedback] = useState('');
  const toast = useToast();
  //   @ts-ignore
  const setLoading = useStoreActions((actions) => actions.setLoading);

  const handleSubmit = () => {
    requestSkeleton({
      method: 'POST',
      url: 'feedbacks',
      //@ts-ignore
      dataToSend: {
        improvement,
        feedback,
      },
      //@ts-ignore
      onSuccess: () => {
        setImprovement('');
        setFeedback('');
        router.back();
      },
      //@ts-ignore
      toast,
      setLoading,
    });
  };
  return (
    <ImageContainer hasTab={false} noImage={false}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.singleContainer}>
          <Text style={styles.question}>{t(INFO_STRINGS.EXPERIENCE_QNS)}</Text>
          <TextInput
            style={styles.input}
            value={improvement}
            onChangeText={setImprovement}
            placeholder={t(INFO_STRINGS.EXPERIENCE_PLACEHOLDER)}
            multiline
            numberOfLines={7}
          />
        </View>
        <View style={styles.singleContainer}>
          <Text style={styles.question}>{t(INFO_STRINGS.FEEDBACK_QNS)}</Text>
          <TextInput
            style={styles.input}
            value={feedback}
            onChangeText={setFeedback}
            placeholder={t(INFO_STRINGS.FEEDBACK_PLACEHOLDER)}
            multiline
            numberOfLines={7}
          />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            paddingBottom: SIZES.large,
          }}>
          <CustomButton
            title={t(INFO_STRINGS.SUBMIT_FEEDBACK)}
            onPress={handleSubmit}
            disabled={!feedback || !improvement}
          />
        </View>
      </ScrollView>
    </ImageContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: FONT.regular,
    lineHeight: SIZES.large,
    fontSize: SIZES.medium,
  },
  container: {
    flex: 1,
    padding: SIZES.large,
    gap: SIZES.large,
  },
  question: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: COLORS.secondary,
  },
  input: {
    borderColor: COLORS.black,
    borderWidth: StyleSheet.hairlineWidth,
    padding: SIZES.medium,
    fontSize: SIZES.medium,
    textAlignVertical: 'top',
    borderRadius: SIZES.xxSmall,
    fontFamily: FONT.regular,
    backgroundColor: COLORS.white + '9F',
  },
  singleContainer: {
    gap: SIZES.large,
  },
});
