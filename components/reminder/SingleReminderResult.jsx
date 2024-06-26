import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { commonStyles } from '~/common/common.style';
import { HOME_STRINGS } from '~/constants/strings/home/home';
import { REMINDER_TYPES } from '~/constants/strings/home/reminder';
import { COLORS, FONT, SIZES } from '~/constants/theme';

const SingleReminderResult = ({ data, onPressDelete, onPress, t }) => {
  //   const renderRightActions = (_, dragX) => {
  //     const scale = dragX.interpolate({
  //       inputRange: [-100, -50, 0],
  //       outputRange: [2, 1, 0],
  //       extrapolate: 'clamp',
  //     });
  //     const opacity = dragX.interpolate({
  //       inputRange: [-100, 0],
  //       outputRange: [1, 0],
  //       extrapolate: 'clamp',
  //     });
  //     return (
  //       <TouchableOpacity
  //         activeOpacity={0.8}
  //         onPress={() => onPressDelete(time)}
  //         style={styles.rightAction}>
  //         <Animated.View style={[{ transform: [{ scale }], opacity, alignItems: 'center' }]}>
  //           <Ionicons name="trash" color="red" size={SIZES.medium} />
  //           <Text style={{ color: 'red', ...styles.btnText }}>{i18n(HOME_STRINGS.DELETE)}</Text>
  //         </Animated.View>
  //       </TouchableOpacity>
  //     );
  //   };

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
  //           <Ionicons name="trash" color="blue" size={SIZES.tabIcon} />
  //         </Animated.View>
  //       </TouchableOpacity>
  //     );
  //   };

  const renderTime = () => {
    const timeConverted = new Date(data?.answeredAt)?.toUTCString()?.split(' ');
    return (
      <View style={styles.dateContainer}>
        <Text style={[styles.dateText, styles.dateNumber]}>{timeConverted[1]}</Text>
        <Text style={[styles.dateText, styles.dateMonth]}>
          {timeConverted[2]} {timeConverted[3]}
        </Text>
        <Text style={[styles.dateText, styles.dateDay]}>{timeConverted[0]?.replace(',', '')}</Text>
      </View>
    );
  };
  const checkIfDone = () => {
    return data?.answer === HOME_STRINGS.YES;
  };

  return (
    <View
      //   overshootRight={false}
      //   overshootLeft={false}
      //   renderRightActions={(progress, dragX) => renderRightActions(progress, dragX)}
      //   renderLeftActions={(progress, dragX) => renderLeftActions(progress, dragX)}
      style={styles.swipableItemMainView}>
      <Pressable
        style={styles.singleMoodHistory}
        onPress={() => {
          if (onPress) {
            onPress();
          }
        }}>
        {renderTime()}
        <View style={[commonStyles.verticalDivider(COLORS.black)]} />
        <View style={styles.historyTextContainer}>
          <Text numberOfLines={2} style={styles.historyTitle} ellipsizeMode="tail">
            {t(REMINDER_TYPES[data?.type])}
          </Text>
          <View style={styles.valueContainer}>
            <Ionicons
              name={checkIfDone() ? 'checkmark' : 'close'}
              color={checkIfDone() ? 'green' : 'red'}
              size={SIZES.tabIcons}
            />
            <Text
              numberOfLines={2}
              style={[styles.value, checkIfDone() ? { color: 'green' } : { color: 'red' }]}
              ellipsizeMode="tail">
              {t(data?.answer)}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default SingleReminderResult;

const styles = StyleSheet.create({
  swipableItemMainView: {
    width: '100%',
  },
  historyTextContainer: {
    gap: SIZES.small,
    justifyContent: 'center',
    flex: 1,
  },
  singleMoodHistory: {
    flexDirection: 'row',
    borderRadius: SIZES.small,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.xLarge,
    gap: SIZES.xLarge,
    backgroundColor: COLORS.white + '2A',
  },
  historyTitle: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
  },
  value: {
    color: COLORS.uiElementColors.text.primary,
    fontFamily: FONT.medium,
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
    fontSize: SIZES.xSmall,
  },
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
  },
  dateNumber: {
    fontFamily: FONT.bold,
  },
  dateDay: {
    textTransform: 'capitalize',
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

  valueContainer: {
    flexDirection: 'row',
    gap: SIZES.small,
  },
});
