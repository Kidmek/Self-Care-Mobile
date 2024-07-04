import { useFocusEffect } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import LineGraph from './LineGraph';
import LifeWheel from '../home/assessment/LifeWheel';
import TrackingModal from '../modal/TrackingModal';
import WheelModal from '../modal/WheelModal';

import { getTrackingInfo, getWheelData, getWheelHistories, setWheelHistories } from '~/api/storage';
import { commonStyles } from '~/common/common.style';
import ImageContainer from '~/common/imageContainer/ImageContainer';
import { TRACKING } from '~/constants/strings/home/assessment/tracking';
import { STAT_STRINGS } from '~/constants/strings/stats';
import { COLORS, FONT, SIZES } from '~/constants/theme';

export default function Stats() {
  const { t } = useTranslation();
  const [wheels, setWheels] = useState<any[]>([]);
  const [moodHistory, setMoodHistory] = useState<any[]>([]);
  const [converted, setConverted] = useState<any[]>([]);

  const [wheelVisible, setWheelVisible] = useState(false);
  const [selected, setSelected] = useState();
  const [trackingVisible, setTrackingVisible] = useState(false);

  const handleWheelPress = (segment: any) => {
    setSelected(segment);
    setWheelVisible(true);
  };

  const handleTrackingPress = (index: number) => {
    setSelected(moodHistory.at(index));
    setTrackingVisible(true);
  };

  const fetchTracking = async () => {
    const test = false;
    let history = (await getTrackingInfo()) ?? [];
    const converted: any[] = [];
    converted.push({
      x: 'Invisible',
      value: Object.keys(TRACKING).length - 1,
    });
    const dates: any[] = [];
    //
    let dummy: any[] = [];

    if (test) {
      for (let i = 0; i < 20; i++) {
        const num = Math.random() * 9;
        const today = new Date();
        today.setDate(today.getDate() - i);
        dummy.push({
          description: 'Randomememsp dlpa sdi oaisdknma sdo ',
          mood: Object.values(TRACKING).at(num)!,
          time: today,
        });
      }
      dummy = dummy.filter((d: any) => {
        const dateString = new Date(d.time).toDateString();
        if (!dates.includes(dateString) && converted.length < 14) {
          dates.push(dateString);
          converted.push({
            x: dateString,
            value: Object.keys(TRACKING).indexOf(d.mood),
          });
          return true;
        }
        return false;
      });
    }

    history = history.filter((d: any) => {
      const dateString = new Date(d.time).toDateString();
      if (!dates.includes(dateString) && converted.length < 14) {
        dates.push(dateString);
        converted.push({
          x: dateString,
          value: Object.keys(TRACKING).indexOf(d.mood),
        });
        return true;
      }
      return false;
    });

    setMoodHistory(test ? dummy : history);
    setConverted(converted);
  };

  const fetchWheel = async () => {
    const data = (await getWheelHistories()) ?? [];

    let calculated: any[] = [];
    let total = 0;
    if (data.length) {
      data.some((d: any) => {
        const diff = new Date().getTime() - new Date(d.time).getTime();
        const days = Math.floor(diff / (1000 * 60 * 30));
        if (days <= 31) {
          total++;
          if (!calculated.length) {
            calculated = d.data;
          } else {
            d.data?.map((section: any) => {
              calculated.some((c) => {
                if (c.label === section.label) {
                  c.value += section.value;
                  return true;
                }
              });
            });
          }
        }
        return days > 31;
      });
    }
    if (total > 0) {
      calculated.forEach((c) => {
        c.value = Math.ceil(c.value / total);
        console.log(c.value);
      });
    }
    setWheels(calculated);
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      if (isActive) {
        fetchTracking();
        fetchWheel();
      }
      return () => {
        isActive = false;
      };
    }, [])
  );
  return (
    <ImageContainer hasTab={false} noImage={false}>
      <WheelModal visible={wheelVisible} setVisible={setWheelVisible} segment={selected} t={t} />
      <TrackingModal
        visible={trackingVisible}
        setVisible={setTrackingVisible}
        selected={selected}
      />
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          gap: SIZES.xxLarge,
          paddingTop: SIZES.small,
        }}>
        <View>
          <Text style={styles.header}>{t(STAT_STRINGS.AVERAGE_WHEEL)}</Text>
          {wheels.length > 0 ? (
            <LifeWheel segments={wheels} handlePress={handleWheelPress} />
          ) : (
            <Text style={styles.noHistory}>{t(STAT_STRINGS.NO_HISTORY)}</Text>
          )}
        </View>

        {/* @ts-ignore */}
        <View style={[commonStyles.divider(COLORS.grey), styles.divider]} />
        <View>
          <Text style={styles.header}>{t(STAT_STRINGS.TRACKING_TWO_WEEK)}</Text>

          {converted.length > 1 ? (
            <LineGraph data={converted} onPress={handleTrackingPress} />
          ) : (
            <Text style={styles.noHistory}>{t(STAT_STRINGS.NO_HISTORY)}</Text>
          )}
        </View>
      </ScrollView>
    </ImageContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: FONT.bold,
    lineHeight: SIZES.large,
    fontSize: SIZES.large,
    textAlign: 'center',
    paddingHorizontal: SIZES.xxLarge,
    marginBottom: SIZES.large,
  },
  container: {
    flex: 1,
    padding: SIZES.large,
    alignItems: 'center',
  },

  singleContainer: {
    gap: SIZES.large,
  },
  divider: {
    alignSelf: 'center',
    width: '95%',
  },
  noHistory: {
    alignSelf: 'center',
    fontFamily: FONT.bold,
    color: COLORS.gray,
    fontSize: SIZES.xLarge,
  },
});
