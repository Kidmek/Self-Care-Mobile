import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { homeStyle } from './home.style';

import { commonStyles } from '~/common/common.style';
import ImageContainer from '~/common/imageContainer/ImageContainer';
import { ASSESSMENT_STRINGS } from '~/constants/strings/home/assessment/assessment';
import { HOME_STRINGS } from '~/constants/strings/home/home';
import { TECHNIQUES_STRINGS, TipType } from '~/constants/strings/home/self care/techniques';
import { COLORS, height, SIZES } from '~/constants/theme';

export default function Home() {
  const { t } = useTranslation();
  const [closed, setClosed] = useState<string[]>([]);

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
    const isOpen = !closed.includes(title);
    return (
      <View>
        <Pressable
          style={homeStyle.cardsContainerHeader}
          onPress={() => {
            if (!isOpen) {
              setClosed(closed.filter((t) => t !== title));
            } else {
              setClosed([...closed, title]);
            }
          }}>
          <Text style={homeStyle.cardsContainerTitle}>{title}</Text>
          <Ionicons
            name={isOpen ? 'chevron-up-circle' : 'chevron-down-circle'}
            color={COLORS.circleAndInfo}
            size={SIZES.inputIcons}
          />
        </Pressable>
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
      <ScrollView
        // @ts-ignore
        style={commonStyles.container()}
        contentContainerStyle={{ gap: SIZES.xLarge }}>
        {renderCardContainer(t(HOME_STRINGS.SELF_ASSESSMENT), [
          {
            title: t(ASSESSMENT_STRINGS.LIFE_WHEEL),
            link: { name: 'assessment', screen: 'wheel' },
          },
          {
            title: t(ASSESSMENT_STRINGS.MOOD_TRACKING),
            link: { name: 'assessment', screen: 'tracking' },
          },
        ])}
        {renderCardContainer(t(HOME_STRINGS.SELF_CARE_TECHNIQUES), [
          {
            title: t(TECHNIQUES_STRINGS.JOURNALING),
            link: { name: 'techniques', screen: 'journaling' },
          },
          {
            title: t(TECHNIQUES_STRINGS.SLEEPING),
            link: { name: 'techniques', screen: 'tips', type: TipType.SLEEPING },
          },
          {
            title: t(TECHNIQUES_STRINGS.BREATHING),
            link: { name: 'techniques', screen: 'tips', type: TipType.BREATHING },
          },
          {
            title: t(TECHNIQUES_STRINGS.MUSCLE),
            link: { name: 'techniques', screen: 'tips', type: TipType.MUSCLE },
          },
          {
            title: t(TECHNIQUES_STRINGS.GROUNDING),
            link: { name: 'techniques', screen: 'tips', type: TipType.GROUNDING },
          },
        ])}
      </ScrollView>
    </ImageContainer>
  );
}
