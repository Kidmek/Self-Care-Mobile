import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, ScrollView, StyleSheet, View, Image } from 'react-native';

import { commonStyles } from '~/common/common.style';
import ImageContainer from '~/common/imageContainer/ImageContainer';
import { INFO_STRINGS } from '~/constants/strings/info';
import { COLORS, FONT, SIZES, width } from '~/constants/theme';

export default function About() {
  const { t } = useTranslation();
  return (
    <ImageContainer hasTab={false} noImage>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.cardHeader}>{t(INFO_STRINGS.APP_DESCRIPTION_LABEL)}</Text>
        <Text style={styles.singleInfoValue}>{t(INFO_STRINGS.APP_DESCRIPTION)}</Text>
        <View
          style={[
            // @ts-ignore
            commonStyles.divider(COLORS.secondary),
            {},
          ]}
        />

        <Text style={[styles.cardHeader, styles.partnerText]}>
          This self-care application is prepared by EPA in collaboration with GIZ.
        </Text>
        <View style={styles.imgContainer}>
          <View style={styles.singleImgContainer}>
            <Image
              source={require('~/assets/images/GIZ.png')}
              style={[
                styles.image,
                {
                  width: '100%',
                },
              ]}
            />
          </View>

          <View style={styles.singleImgContainer}>
            <Image
              source={require('~/assets/images/EPA.png')}
              style={[
                styles.image,
                {
                  width: '50%',
                },
              ]}
            />
          </View>
        </View>
      </ScrollView>
    </ImageContainer>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: SIZES.xLarge,
    paddingVertical: SIZES.xxLarge,
    gap: SIZES.xxLarge,
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
  partnerText: {
    marginTop: -SIZES.xxLarge,
    fontSize: SIZES.xSmall,
  },

  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0,
  },

  singleImgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.5,
    height: width * 0.1,
  },
  image: {
    resizeMode: 'contain',
  },
});
