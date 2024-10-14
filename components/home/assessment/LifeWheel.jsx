import React from 'react';
import { View } from 'react-native';
import { Svg, Path, Text, G } from 'react-native-svg';

import { assessmentStyle } from './assessment.style';

import { COLORS } from '~/constants/theme';
import { checkIfAmh } from '~/utils/helper';

const LifeWheel = ({ segments, handlePress }) => {
  const radius = 160;
  const extraPadding = 40;
  const width = (radius + extraPadding) * 2;
  const height = (radius + extraPadding) * 2;
  const centerX = width / 2;
  const centerY = height / 2;

  // Function to calculate path for each segment
  const makeWheelPath = (startAngle, endAngle, segmentRadius) => {
    const radians = (angle) => (Math.PI * angle) / 180;
    const x1 = centerX + segmentRadius * Math.cos(radians(startAngle));
    const y1 = centerY + segmentRadius * Math.sin(radians(startAngle));
    const x2 = centerX + segmentRadius * Math.cos(radians(endAngle));
    const y2 = centerY + segmentRadius * Math.sin(radians(endAngle));

    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${segmentRadius} ${segmentRadius} 0 0 1 ${x2} ${y2} z`;
  };

  // Function to position and rotate text on the outer edge of a segment
  const getTextPosition = (startAngle, endAngle) => {
    const midAngle = (startAngle + endAngle) / 2;
    const radians = (angle) => (Math.PI * angle) / 180;
    const x = centerX + (radius + 20) * Math.cos(radians(midAngle)); // Offset by 20 for outer edge placement
    const y = centerY + (radius + 20) * Math.sin(radians(midAngle));
    const rotation = midAngle <= 180 ? midAngle - 90 : midAngle + 90; // Adjust rotation based on angle
    return { x, y, rotation };
  };

  const getInnerTextPosition = (startAngle, endAngle, segmentRadius) => {
    const midAngle = (startAngle + endAngle) / 2;
    const radians = (angle) => (Math.PI * angle) / 180;
    const x = centerX + 0.5 * segmentRadius * Math.cos(radians(midAngle));
    const y = centerY + 0.5 * segmentRadius * Math.sin(radians(midAngle));
    return { x, y };
  };

  return (
    <View>
      <Svg height={height} width={width}>
        <G>
          {segments.map((segment, index) => (
            <View key={index}>
              <Path
                d={makeWheelPath(segment.startAngle, segment.endAngle, radius)}
                stroke={COLORS.gray2}
                fillOpacity="0.15"
                strokeWidth="1"
                fill={segment.color}
                onPress={() => handlePress(segment)}
              />

              <Path
                d={makeWheelPath(
                  segment.startAngle,
                  segment.endAngle,
                  (radius * segment.value) / 10
                )}
                fillOpacity="1"
                fill={segment.color}
                stroke="white"
                strokeWidth="2"
                onPress={() => handlePress(segment)}
              />
            </View>
          ))}

          {segments.map((segment, index) => {
            const { x, y, rotation } = getTextPosition(segment.startAngle, segment.endAngle);
            const textPosVal = segment.value > 2 ? segment.value : segment.value + 3;

            const innerText = getInnerTextPosition(
              segment.startAngle,
              segment.endAngle,
              (radius * textPosVal) / 10
            );
            return (
              <React.Fragment key={`text-${index}`}>
                {segment.value > 0 && (
                  <Text
                    x={innerText.x}
                    y={innerText.y}
                    fill="white"
                    fontSize="16"
                    fontWeight="bold"
                    textAnchor="middle"
                    style={assessmentStyle.outerWheel}
                    alignmentBaseline="bottom">
                    {segment.value}
                  </Text>
                )}
                <Text
                  x={x}
                  y={y}
                  style={assessmentStyle.outerWheel}
                  fill={COLORS.uiElementColors.text.primary}
                  transform={`rotate(${rotation}, ${x}, ${y})`}>
                  {`${checkIfAmh() ? segment.am_label : segment.label} `}
                </Text>
              </React.Fragment>
            );
          })}
        </G>
      </Svg>
    </View>
  );
};

export default LifeWheel;
