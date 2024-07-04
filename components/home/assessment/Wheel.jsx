import { useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import LifeWheel from './LifeWheel';

import { addWheelHistory, getWheelData, setWheelData, setWheelHistories } from '~/api/storage';
import HeaderIcon from '~/common/header/HeaderIcon';
import ImageContainer from '~/common/imageContainer/ImageContainer';
import InfoModal from '~/components/modal/InfoModal';
import WheelModal from '~/components/modal/WheelModal';
import { ASSESSMENT_STRINGS } from '~/constants/strings/home/assessment/assessment';
import { WHEEL_SECTIONS, WHEEL_STRINGS } from '~/constants/strings/home/assessment/wheel';
import { FONT, SIZES, WHEEL_COLORS } from '~/constants/theme';
import { checkIfAmh } from '~/utils/helper';

export default function Wheel() {
  const [wheels, setWheels] = useState([]);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [selected, setSelected] = useState();
  const changed = useRef(null);

  const fetchData = async () => {
    const data = await getWheelData();
    if (!data?.length) {
      const segments = WHEEL_SECTIONS.map((a, i) => {
        const angle = 360 / WHEEL_SECTIONS.length;
        return {
          startAngle: i * angle,
          endAngle: (i + 1) * angle,
          color: WHEEL_COLORS[i],
          label: a.shortName,
          am_label: a.am_shortName,
          value: 1,
        };
      });
      await setWheelData(segments);
      setWheels(segments);
    } else {
      setWheels(data);
    }
  };
  const handlePress = (segment) => {
    setSelected(segment);
    setVisible(true);
  };
  const handleChange = async (value) => {
    setVisible(false);

    const prev = wheels.map((p) => {
      if (p.label === selected?.label) {
        return { ...p, value };
      } else {
        return p;
      }
    });
    await setWheelData([...prev]);
    setWheels([...prev]);
    changed.current = [...prev];
  };
  useEffect(() => {
    fetchData();
    // addAnalyticApi({
    //   type: AnalyticField.WHEEL,
    // });
    return () => {
      if (changed.current) {
        addWheelHistory({
          data: changed.current,
          time: new Date(),
        });
      }
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderIcon
            name="help"
            onPress={() => {
              setInfoVisible(true);
            }}
          />
        );
      },
    });
  });

  return (
    <ImageContainer>
      <WheelModal
        visible={visible}
        setVisible={setVisible}
        segment={selected}
        save={handleChange}
        t={t}
      />
      <InfoModal
        visible={infoVisible}
        setVisible={setInfoVisible}
        t={t}
        type={ASSESSMENT_STRINGS.LIFE_WHEEL}
      />
      <ScrollView style={{ flex: 1 }}>
        <LifeWheel segments={wheels} handlePress={handlePress} />
        <View style={styles.descContainer}>
          <Text style={styles.descHeader}>{t(WHEEL_STRINGS.DESCRIPTION)}</Text>
          {WHEEL_SECTIONS.map((s, i) => {
            const longName = checkIfAmh() ? s.am_longName : s.longName;
            const description = checkIfAmh() ? s.am_description : s.description;
            return (
              <View key={i} style={styles.singleDesc}>
                <Text style={styles.descTitle}>
                  {longName}: <Text style={styles.descBody}>{description}</Text>
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </ImageContainer>
  );
}

const styles = StyleSheet.create({
  descContainer: {
    padding: SIZES.small,
    gap: SIZES.small,
  },
  descHeader: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    textDecorationLine: 'underline',
  },
  descTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
  },
  descBody: {
    fontFamily: FONT.regular,
  },
});
