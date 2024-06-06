import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { homeStyle } from './home.style';

import { commonStyles } from '~/common/common.style';
import ImageContainer from '~/common/imageContainer/ImageContainer';
import { ASSESSMENT_STRINGS } from '~/constants/strings/home/assessment/assessment';
import { HOME_STRINGS } from '~/constants/strings/home/home';
import { TECHNIQUES_STRINGS, TipType } from '~/constants/strings/home/self care/techniques';
import { COLORS, SIZES } from '~/constants/theme';

export default function Home() {
  const { t: i18n } = useTranslation();
  const [opened, setOpened] = useState<string[]>([
    i18n(HOME_STRINGS.SELF_ASSESSMENT),
    i18n(HOME_STRINGS.SELF_CARE_TECHNIQUES),
  ]);

  const navigation = useNavigation();

  const renderCard = (
    title: string,
    link: {
      name: string;
      screen: string;
      type?: string;
    }
  ) => {
    return (
      <TouchableOpacity
        key={link.name + title + link.screen}
        style={homeStyle.singleCardContainer}
        onPress={() => {
          // @ts-ignore
          navigation.navigate(link.name, {
            screen: link.screen,
            params: {
              type: link.type,
            },
          });
        }}>
        <Text style={homeStyle.singleCardTitle}>{title}</Text>
      </TouchableOpacity>
    );
  };
  const renderCardContainer = (
    title: string,
    children: {
      title: string;
      link: {
        name: string;
        screen: string;
        type?: string;
      };
    }[]
  ) => {
    const isOpen = opened.includes(title);
    return (
      <View>
        <View style={homeStyle.cardsContainerHeader}>
          <Text style={homeStyle.cardsContainerTitle}>{title}</Text>
          <Ionicons
            name={isOpen ? 'chevron-up-circle' : 'chevron-down-circle'}
            color={COLORS.circleAndInfo}
            size={SIZES.inputIcons}
            onPress={() => {
              if (isOpen) {
                setOpened(opened.filter((t) => t !== title));
              } else {
                setOpened([...opened, title]);
              }
            }}
          />
        </View>
        {/* @ts-ignore */}
        <View style={commonStyles.divider()} />
        {isOpen && (
          <View style={homeStyle.cardsContainer}>
            {children.map((c) => {
              return renderCard(c.title, c.link);
            })}
          </View>
        )}
      </View>
    );
  };
  return (
    <ImageContainer hasTab>
      {/* @ts-ignore */}
      <ScrollView contentContainerStyle={commonStyles.container()}>
        {renderCardContainer(i18n(HOME_STRINGS.SELF_ASSESSMENT), [
          {
            title: i18n(ASSESSMENT_STRINGS.LIFE_WHEEL),
            link: { name: 'assessment', screen: 'wheel' },
          },
          {
            title: i18n(ASSESSMENT_STRINGS.MOOD_TRACKING),
            link: { name: 'assessment', screen: 'tracking' },
          },
        ])}
        {renderCardContainer(i18n(HOME_STRINGS.SELF_CARE_TECHNIQUES), [
          {
            title: i18n(TECHNIQUES_STRINGS.JOURNALING),
            link: { name: 'techniques', screen: 'journaling' },
          },
          {
            title: i18n(TECHNIQUES_STRINGS.SLEEPING),
            link: { name: 'techniques', screen: 'tips', type: TipType.SLEEPING },
          },
          {
            title: i18n(TECHNIQUES_STRINGS.BREATHING),
            link: { name: 'techniques', screen: 'tips', type: TipType.BREATHING },
          },
          {
            title: i18n(TECHNIQUES_STRINGS.MUSCLE),
            link: { name: 'techniques', screen: 'tips', type: TipType.MUSCLE },
          },
          {
            title: i18n(TECHNIQUES_STRINGS.GROUNDING),
            link: { name: 'techniques', screen: 'tips', type: TipType.GROUNDING },
          },
        ])}
      </ScrollView>
    </ImageContainer>
  );
}
