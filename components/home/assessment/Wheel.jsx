import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import LifeWheel from './LifeWheel';

import { addAnalyticApi } from '~/api/analytics';
import { addWheelHistory, getWheelData, setWheelData } from '~/api/storage';
import HeaderIcon from '~/common/header/HeaderIcon';
import ImageContainer from '~/common/imageContainer/ImageContainer';
import InfoModal from '~/components/modal/InfoModal';
import WheelDescriptionModal from '~/components/modal/WheelDescriptionModal';
import WheelModal from '~/components/modal/WheelModal';
import { AnalyticField } from '~/constants/strings/common';
import { ASSESSMENT_STRINGS } from '~/constants/strings/home/assessment/assessment';
import { WHEEL_SECTIONS, WHEEL_STRINGS } from '~/constants/strings/home/assessment/wheel';
import { COLORS, FONT, SIZES, WHEEL_COLORS } from '~/constants/theme';
import { checkIfAmh } from '~/utils/helper';

export default function Wheel() {
  const [wheels, setWheels] = useState([]);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const [selectedDiscription, setSelectedDiscription] = useState();
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
    return () => {
      if (changed.current) {
        addAnalyticApi({
          type: AnalyticField.WHEEL,
        });
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
      <WheelDescriptionModal
        description={selectedDiscription?.description}
        title={selectedDiscription?.title}
        visible={!!selectedDiscription}
        hide={() => {
          setSelectedDiscription(null);
        }}
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
          {/* <Text style={styles.descHeader}>{t(WHEEL_STRINGS.DESCRIPTION)}</Text> */}
          {WHEEL_SECTIONS.map((s, i) => {
            const longName = checkIfAmh() ? s.am_longName : s.longName;
            const description = checkIfAmh() ? s.am_description : s.description;
            return (
              <TouchableOpacity
                key={i}
                style={styles.singleDesc}
                onPress={() => {
                  setSelectedDiscription({
                    title: longName,
                    description,
                  });
                }}>
                <Text style={styles.descTitle}>{longName}</Text>
                <Ionicons name="help-circle" size={SIZES.inputIcons} />
              </TouchableOpacity>
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
  singleDesc: {
    padding: SIZES.small,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.primaryColors.lightBlue + '8A',
    borderRadius: SIZES.xxSmall,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
