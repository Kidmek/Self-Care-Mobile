import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, ScrollView, StyleSheet, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { commonStyles } from '~/common/common.style';
import ImageContainer from '~/common/imageContainer/ImageContainer';
import { INFO_STRINGS } from '~/constants/strings/info';
import { COLORS, FONT, SIZES, width } from '~/constants/theme';

export default function Partners() {
  const { t } = useTranslation();
  return (
    <ImageContainer hasTab={false} noImage>
      <ScrollView contentContainerStyle={styles.body}>
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
                  width: '40%',
                },
              ]}
            />
          </View>
        </View>
        <View
          style={
            // @ts-ignore
            commonStyles.divider(COLORS.secondary)
          }
        />

        <Text style={styles.cardHeader}>{t(INFO_STRINGS.PARNTERSHIP)}</Text>

        <TouchableOpacity
          style={styles.moreBtn}
          onPress={() => {
            router.push('/about');
          }}>
          <Text style={styles.moreBtnTxt}>{t(INFO_STRINGS.MORE_INFO)}...</Text>
        </TouchableOpacity>
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

    lineHeight: SIZES.xxLarge,

    fontSize: SIZES.medium,
    color: COLORS.dark,

    textAlign: 'center',
  },

  moreBtnTxt: {
    fontFamily: FONT.medium,
    lineHeight: SIZES.xxLarge,
    fontSize: SIZES.medium,
    textAlign: 'center',
    color: COLORS.white,
  },

  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0,
    marginTop: SIZES.xxLarge,
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

  moreBtn: {
    marginTop: SIZES.xxLarge,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.primary,
    width: '90%',
    alignSelf: 'center',
    padding: SIZES.large,
  },
});
