import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import LifeWheel from './LifeWheel';

import { getWheelData, setWheelData } from '~/api/storage';
import ImageContainer from '~/common/imageContainer/ImageContainer';
import WheelModal from '~/components/modal/WheelModal';
import { WHEEL_STRINGS } from '~/constants/strings/home/assessment/wheel';
import { WHEEL_COLORS } from '~/constants/theme';

export default function Wheel() {
  const [wheels, setWheels] = useState([]);

  const radius = 160;

  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState();

  const fetchData = async () => {
    const data = await getWheelData();
    if (!data) {
      const segments = Object.keys(WHEEL_STRINGS).map((a, i) => {
        const angle = 360 / Object.keys(WHEEL_STRINGS).length;
        return {
          startAngle: i * angle,
          endAngle: (i + 1) * angle,
          color: WHEEL_COLORS[i],
          label: a,
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
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ImageContainer>
      <WheelModal
        visible={visible}
        setVisible={setVisible}
        segment={selected}
        save={handleChange}
      />
      <View style={{ flex: 1 }}>
        <LifeWheel segments={wheels} radius={radius} handlePress={handlePress} />
      </View>
    </ImageContainer>
  );
}
