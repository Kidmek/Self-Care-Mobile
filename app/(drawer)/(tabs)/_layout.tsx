import { useStoreActions } from 'easy-peasy';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

import { commonStyles } from '~/common/common.style';
import HeaderIcon from '~/common/header/HeaderIcon';
import TabIcon from '~/common/tabIcon/TabIcon';
import { HEADER_TYPES, MODAL_TYPES } from '~/constants/strings/common';
import { COLORS } from '~/constants/theme';

export default function TabLayout() {
  // @ts-ignore
  const showModal = useStoreActions((action) => action.showModal);

  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: commonStyles.header,
        headerLeft: () => <HeaderIcon type={HEADER_TYPES.DRAWER} />,
        headerTitle: '',
        headerTransparent: true,
        tabBarStyle: styles.tabBar,
        tabBarInactiveTintColor: COLORS.uiElementColors.iconsAndButtons.lightBlue,
        tabBarActiveTintColor: COLORS.pureWhite,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{
          title: 'Reminder',
          tabBarIcon: ({ color }) => <TabIcon name="timer" color={color} />,
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          title: 'Log out',
          tabBarIcon: ({ color }) => <TabIcon name="log-out" color={color} />,
        }}
        listeners={() => ({
          tabPress: (e) => {
            showModal(MODAL_TYPES.LOGOUT);
            e.preventDefault();
          },
        })}
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
