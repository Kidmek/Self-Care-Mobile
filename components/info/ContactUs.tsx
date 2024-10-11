import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View, Text, Pressable, Linking } from 'react-native';

import ImageContainer from '~/common/imageContainer/ImageContainer';
import { INFO } from '~/constants/strings/common';
import { INFO_STRINGS } from '~/constants/strings/info';
import { COLORS, FONT, SIZES } from '~/constants/theme';

export default function ContactUs() {
  const { t } = useTranslation();
  const renderSingleCard = (
    link: string,
    header: string,
    value: string,
    iconName: keyof typeof Ionicons.glyphMap | null,
    icon?: any
  ) => {
    return (
      <Pressable
        style={styles.singleInfo}
        onPress={() => {
          Linking.openURL(link);
        }}>
        {!iconName ? icon : <Ionicons name={iconName} size={SIZES.tabIcons} />}
        <View style={styles.singleInfoContainer}>
          <Text style={styles.singleInfoHeader}>{header}</Text>
          <Text style={styles.singleInfoValue}>{value}</Text>
        </View>
      </Pressable>
    );
  };
  return (
    <ImageContainer hasTab={false} noImage={false}>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.header}>{t(INFO_STRINGS.CONTACT_HEADER)}</Text>
        <View style={styles.card}>
          <Text style={styles.cardHeader}>{t(INFO_STRINGS.CUSTOMER_SUPPORT)}</Text>
          {renderSingleCard(
            `tel:${INFO.PHONE_NUM}`,
            t(INFO_STRINGS.CONTACT_NUMBER),
            INFO.PHONE_NUM,
            'call'
          )}

          {renderSingleCard(
            `mailto:${INFO.EMAIL_ADDRESS}`,
            t(INFO_STRINGS.EMAIL_ADDRESS),
            INFO.EMAIL_ADDRESS,
            'mail'
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardHeader}>{t(INFO_STRINGS.SOCIAL_MEDIA)}</Text>
          {renderSingleCard(
            `https://www.instagram.com/${INFO.INSTAGRAM}`,
            t(INFO_STRINGS.INSTAGRAM),
            INFO.INSTAGRAM,
            'logo-instagram'
          )}

          {renderSingleCard(
            `https://www.x.com/${INFO.TWITTER}`,
            t(INFO_STRINGS.TWITTER),
            INFO.TWITTER,
            'logo-twitter'
          )}

          {renderSingleCard(
            `https://www.facebook.com/${INFO.FACEBOOK}`,
            t(INFO_STRINGS.FACEBOOK),
            INFO.FACEBOOK,
            'logo-facebook'
          )}

          {renderSingleCard(
            `https://t.me/${INFO.TELEGRAM}`,
            t(INFO_STRINGS.TELEGRAM),
            INFO.TELEGRAM,
            null,
            <FontAwesome name="telegram" size={SIZES.tabIcons} />
          )}
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
  singleInfoContainer: {
    flex: 1,
  },
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
