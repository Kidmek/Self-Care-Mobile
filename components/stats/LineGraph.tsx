import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { TRACKING, TRACKING_EMOJIS } from '~/constants/strings/home/assessment/tracking';
import { COLORS, SIZES } from '~/constants/theme';

interface DataPoint {
  x: string;
  value: number;
}

interface LineGraphProps {
  data: DataPoint[];
  onPress: (index: number) => void;
}

const LineGraph: React.FC<LineGraphProps> = ({ data, onPress }) => {
  const xAxisLabels = data.map((item) => item.x);
  const values = data.map((item) => item.value);
  return (
    <View style={{ height: 500, padding: SIZES.large }}>
      <LineChart
        data={{
          labels: xAxisLabels,
          datasets: [{ data: values }],
        }}
        segments={Object.keys(TRACKING).length - 1}
        width={Dimensions.get('window').width - SIZES.large * 2} // from react-native
        height={450}
        chartConfig={{
          backgroundColor: '#7BA9AA',
          backgroundGradientFrom: '#7BA9AA',
          backgroundGradientTo: COLORS.secondary,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

          propsForVerticalLabels: {
            // Custom properties for the x-axis labels to prevent duplication
            fontSize: SIZES.xSmall,
            rotation: 90,
            translateX: -5,
            translateY: 20,
            fontStyle: 'italic',
          },
        }}
        fromZero
        formatYLabel={(value) => {
          const found = Object.values(TRACKING).at(parseInt(value));
          return found ?? value;
        }}
        renderDotContent={(data) => {
          const emoji = TRACKING_EMOJIS[Object.values(TRACKING).at(data.indexData)!];
          return (
            <Text
              key={data.index}
              style={{
                position: 'absolute',
                top: data.y - SIZES.xSmall,
                left: data.x - SIZES.xSmall,
                zIndex: 100,
              }}>
              {Array.from(emoji)[0]}
            </Text>
          );
        }}
        onDataPointClick={(data) => {
          onPress(data.index);
        }}
        bezier
        style={{
          borderRadius: SIZES.xxSmall,
        }}
        yAxisInterval={1}
        hidePointsAtIndex={[0]}
      />
    </View>
  );
};

export default LineGraph;
