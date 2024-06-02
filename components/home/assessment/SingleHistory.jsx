import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { commonStyles } from '~/common/common.style';
import { TRACKING_EMOJIS, TRACKING_STRINGS } from '~/constants/strings/home/assessment/tracking';
import { HOME_STRINGS } from '~/constants/strings/home/home';
import { COLORS, FONT, SIZES } from '~/constants/theme';

const SingleHistory = ({ time, mood, description, onPressDelete, onPressEdit }) => {
  const { t: i18n } = useTranslation();

  const renderRightActions = (_, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, -50, 0],
      outputRange: [2, 1, 0],
      extrapolate: 'clamp',
    });
    const opacity = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onPressDelete(time)}
        style={styles.rightAction}>
        <Animated.View style={[{ transform: [{ scale }], opacity, alignItems: 'center' }]}>
          <Ionicons name="trash" color="red" size={30} />
          <Text style={{ color: 'red', ...styles.btnText }}>{i18n(HOME_STRINGS.DELETE)}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  //   const renderLeftActions = (_, dragX) => {
  //     const scale = dragX.interpolate({
  //       inputRange: [0, 50, 100],
  //       outputRange: [0, 1, 2],
  //       extrapolate: 'clamp',
  //     });
  //     const opacity = dragX.interpolate({
  //       inputRange: [0, 100],
  //       outputRange: [0, 1],
  //       extrapolate: 'clamp',
  //     });

  //     return (
  //       <TouchableOpacity
  //         activeOpacity={0.8}
  //         onPress={() => onPressEdit(time)}
  //         style={styles.leftAction}>
  //         <Animated.View style={[{ transform: [{ scale }], opacity }]}>
  //           <Ionicons name="trash" color="blue" size={30} />
  //         </Animated.View>
  //       </TouchableOpacity>
  //     );
  //   };

  return (
    <Swipeable
      overshootRight={false}
      overshootLeft={false}
      renderRightActions={(progress, dragX) => renderRightActions(progress, dragX)}
      //   renderLeftActions={(progress, dragX) => renderLeftActions(progress, dragX)}
      containerStyle={styles.swipableItemMainView}>
      <View style={styles.singleMoodHistory}>
        <Text style={styles.historyTitle}>{new Date(time).toUTCString()}</Text>
        <View style={commonStyles.divider(COLORS.black)} />
        <View style={styles.historyTextContainer}>
          <Text style={styles.historyTitle}>{i18n(TRACKING_STRINGS.MOOD)}</Text>
          <Text style={styles.value}>
            {mood} {TRACKING_EMOJIS[mood]}
          </Text>
        </View>
        <View style={styles.historyTextContainer}>
          <Text style={styles.historyTitle}>{i18n(TRACKING_STRINGS.DESCRIPTION)}</Text>
          <Text style={styles.value}>{description}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

export default SingleHistory;

const styles = StyleSheet.create({
  historyTextContainer: {
    flexDirection: 'row',
    gap: SIZES.small,
  },
  singleMoodHistory: {
    borderRadius: SIZES.small,
    borderWidth: StyleSheet.hairlineWidth,
    padding: SIZES.small,
    backgroundColor: COLORS.white + '2A',
  },
  historyTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
  },
  value: {
    color: COLORS.uiElementColors.text.primary,
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
  },
  rightAction: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  leftAction: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
  },

  //   swipableItemMainView: {
  //     marginVertical: 10,
  //     marginHorizontal: 10,
  //   },
  //   childrenContainerStyle: {
  //     borderRadius: 10,
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     backgroundColor: 'white',
  //   },
});
