import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, ScrollView, StyleSheet, View } from 'react-native';

import { commonStyles } from '~/common/common.style';
import ImageContainer from '~/common/imageContainer/ImageContainer';
import { INFO_STRINGS } from '~/constants/strings/info';
import { COLORS, FONT, SIZES } from '~/constants/theme';

export default function About() {
  const { t } = useTranslation();
  return (
    <ImageContainer hasTab={false} noImage>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.cardHeader}>{t(INFO_STRINGS.APP_DESCRIPTION_LABEL)}</Text>
        <View
          style={
            // @ts-ignore
            commonStyles.divider(COLORS.secondary)
          }
        />

        <Text style={styles.singleInfoValue}>{t(INFO_STRINGS.APP_DESCRIPTION)}</Text>
      </ScrollView>
    </ImageContainer>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: SIZES.xLarge,
    paddingVertical: SIZES.xxLarge,
    gap: SIZES.xxLarge,
    flex: 1,
    justifyContent: 'center',
  },
  cardHeader: {
    fontFamily: FONT.bold,

    lineHeight: SIZES.large,

    fontSize: SIZES.large,
    color: COLORS.dark,

    textAlign: 'center',
  },

  singleInfoValue: {
    fontFamily: FONT.medium,
    lineHeight: SIZES.xxLarge,
    fontSize: SIZES.medium,
    textAlign: 'center',
  },
});
