import { useStoreActions } from 'easy-peasy';
import { Tabs, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import { commonStyles } from '~/common/common.style';
import HeaderIcon from '~/common/header/HeaderIcon';
import TabIcon from '~/common/tabIcon/TabIcon';
import { HEADER_TYPES, MODAL_TYPES } from '~/constants/strings/common';
import { HOME_STRINGS } from '~/constants/strings/home/home';
import { COLORS } from '~/constants/theme';

export default function TabLayout() {
  // @ts-ignore
  const showModal = useStoreActions((action) => action.showModal);
  const [hasNotification, setHasNotification] = useState(false);
  const { t: i18n } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      setHasNotification(true);
    }, 3000);
  }, []);

  return (
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
          headerRight: () => (
            <HeaderIcon
              name={hasNotification ? 'notifications' : 'notifications-outline'}
              margin
              onPress={() => {
                router.push('/notification');
              }}
            />
          ),
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
            showModal(MODAL_TYPES.LOGOUT);
            e.preventDefault();
          },
        })}
      />
      <Tabs.Screen
        name="notification"
        options={{
          tabBarItemStyle: { display: 'none' },
          headerLeft: () => <HeaderIcon type={HEADER_TYPES.BACK} margin />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    backgroundColor: 'transparent',
    elevation: 0,
    borderTopColor: COLORS.uiElementColors.iconsAndButtons.lightBlue,
    borderTopWidth: 0,
  },
});
