import { useStoreActions } from 'easy-peasy';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import { commonStyles } from '~/common/common.style';
import HeaderIcon from '~/common/header/HeaderIcon';
import TabIcon from '~/common/tabIcon/TabIcon';
import LogoutModal from '~/components/modal/LogoutModal';
import { HEADER_TYPES } from '~/constants/strings/common';
import { HOME_STRINGS } from '~/constants/strings/home/home';
import { COLORS, SIZES } from '~/constants/theme';

export default function TabLayout() {
  // @ts-ignore
  const showModal = useStoreActions((action) => action.showModal);
  const { t: i18n } = useTranslation();

  return (
    <>
      <LogoutModal />

      <Tabs
        screenOptions={{
          tabBarLabelStyle: commonStyles.header,
          tabBarStyle: styles.tabBar,
          tabBarInactiveTintColor: COLORS.uiElementColors.iconsAndButtons.lightBlue,
          tabBarActiveTintColor: COLORS.pureWhite,
          headerLeft: () => <HeaderIcon type={HEADER_TYPES.DRAWER} />,
          headerTitle: '',
          headerTransparent: true,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: i18n(HOME_STRINGS.HOME),
            tabBarIcon: ({ color }) => <TabIcon name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="reminders"
          options={{
            title: i18n(HOME_STRINGS.REMINDER),
            tabBarIcon: ({ color }) => <TabIcon name="timer" color={color} />,
          }}
        />
        <Tabs.Screen
          name="logout"
          options={{
            title: i18n(HOME_STRINGS.LOGOUT),
            tabBarIcon: ({ color }) => <TabIcon name="log-out" color={color} />,
          }}
          listeners={() => ({
            tabPress: (e) => {
              e.preventDefault();
              showModal();
            },
          })}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    // backgroundColor: COLORS.primary + '2F',
    backgroundColor: 'transparent',
    elevation: 0,
    borderTopWidth: 0,
    height: SIZES.tabHeight,
    paddingBottom: SIZES.xSmall,
    borderTopEndRadius: SIZES.small,
    borderTopStartRadius: SIZES.small,
  },
  // blurContainer: {
  //   position: 'absolute',
  //   bottom: 0, // Position at the bottom
  //   left: 0,
  //   right: 0,
  //   height: SIZES.tabHeight, // Match height of the tab bar

  //   // Add border to top left and top right
  //   borderColor: COLORS.uiElementColors.iconsAndButtons.lightBlue, // Adjust border color
  //   borderTopLeftRadius: 20, // Adjust corner radius
  //   borderTopRightRadius: 20,
  // },
  // innerBlurContainer: {
  //   flex: 1,
  //   backgroundColor: 'rgba(255, 255, 255, 0.1)', // Optional: Add a slight tint to the blur
  // },
});
