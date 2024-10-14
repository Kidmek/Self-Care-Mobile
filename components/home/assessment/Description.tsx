import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

import { COLORS, FONT, SIZES } from '~/constants/theme';

export default function Description({
  description,
  padding,
}: {
  description: string;
  padding: number;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding }}>
      <Ionicons
        name="information-circle-outline"
        size={SIZES.xxLarge}
        color={COLORS.circleAndInfo}
      />
      <Text
        style={{
          color: COLORS.circleAndInfo,
          fontFamily: FONT.regular,
          fontSize: SIZES.medium,
          flex: 1,
        }}>
        {description}
      </Text>
    </View>
  );
}
