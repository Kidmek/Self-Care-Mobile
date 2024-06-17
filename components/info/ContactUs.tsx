import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

import ImageContainer from '~/common/imageContainer/ImageContainer';
import { INFO } from '~/constants/strings/common';
import { INFO_STRINGS } from '~/constants/strings/info';
import { COLORS, FONT, SIZES } from '~/constants/theme';

export default function ContactUs() {
  const { t } = useTranslation();
  return (
    <ImageContainer hasTab={false} noImage={false}>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.header}>{t(INFO_STRINGS.CONTACT_HEADER)}</Text>
        <View style={styles.card}>
          <Text style={styles.cardHeader}>{t(INFO_STRINGS.CUSTOMER_SUPPORT)}</Text>
          <View style={styles.singleInfo}>
            <Ionicons name="call" size={SIZES.tabIcons} />
            <View style={styles.singleInfoContainer}>
              <Text style={styles.singleInfoHeader}>{t(INFO_STRINGS.CONTACT_NUMBER)}</Text>
              <Text style={styles.singleInfoValue}>{INFO.PHONE_NUM}</Text>
            </View>
          </View>

          <View style={styles.singleInfo}>
            <Ionicons name="mail" size={SIZES.tabIcons} />
            <View style={styles.singleInfoContainer}>
              <Text style={styles.singleInfoHeader}>{t(INFO_STRINGS.EMAIL_ADDRESS)}</Text>
              <Text style={styles.singleInfoValue}>{INFO.EMAIL_ADDRESS}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardHeader}>{t(INFO_STRINGS.SOCIAL_MEDIA)}</Text>
          <View style={styles.singleInfo}>
            <Ionicons name="logo-instagram" size={SIZES.tabIcons} />
            <View style={styles.singleInfoContainer}>
              <Text style={styles.singleInfoHeader}>{t(INFO_STRINGS.INSTAGRAM)}</Text>
              <Text style={styles.singleInfoValue}>{INFO.INSTAGRAM}</Text>
            </View>
          </View>

          <View style={styles.singleInfo}>
            <Ionicons name="logo-twitter" size={SIZES.tabIcons} />
            <View style={styles.singleInfoContainer}>
              <Text style={styles.singleInfoHeader}>{t(INFO_STRINGS.TWITTER)}</Text>
              <Text style={styles.singleInfoValue}>{INFO.TWITTER}</Text>
            </View>
          </View>
          <View style={styles.singleInfo}>
            <Ionicons name="logo-facebook" size={SIZES.tabIcons} />
            <View style={styles.singleInfoContainer}>
              <Text style={styles.singleInfoHeader}>{t(INFO_STRINGS.INSTAGRAM)}</Text>
              <Text style={styles.singleInfoValue}>{INFO.FACEBOOK}</Text>
            </View>
          </View>
          <View style={styles.singleInfo}>
            <FontAwesome name="telegram" size={SIZES.tabIcons} />
            <View style={styles.singleInfoContainer}>
              <Text style={styles.singleInfoHeader}>{t(INFO_STRINGS.INSTAGRAM)}</Text>
              <Text style={styles.singleInfoValue}>{INFO.TELEGRAM}</Text>
            </View>
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
  header: {
    fontFamily: FONT.regular,
    lineHeight: SIZES.large,
    fontSize: SIZES.medium,
  },
  card: {
    paddingVertical: SIZES.large,
    paddingHorizontal: SIZES.xLarge,
    backgroundColor: COLORS.white + '9F',
    borderRadius: SIZES.large,
    gap: SIZES.xxLarge,
  },
  cardHeader: {
    fontFamily: FONT.bold,
    lineHeight: SIZES.large,
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  singleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.large,
  },
  singleInfoContainer: {},
  singleInfoHeader: {
    fontFamily: FONT.regular,
    lineHeight: SIZES.large,
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  singleInfoValue: {
    fontFamily: FONT.medium,
    lineHeight: SIZES.large,
    fontSize: SIZES.medium,
  },
});
