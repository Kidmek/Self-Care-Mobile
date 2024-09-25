import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { useTranslation } from 'react-i18next';

import HeaderIcon from '~/common/header/HeaderIcon';
import { HEADER_TYPES } from '~/constants/strings/common';
import { HOME_STRINGS } from '~/constants/strings/home/home';

const DrawerLayout = () => {
  const { t } = useTranslation();
  return (
    <Drawer
      screenOptions={{
        headerLeft: () => <HeaderIcon type={HEADER_TYPES.BACK} margin />,
        headerTitle: '',
        headerTransparent: true,
      }}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          drawerLabel: t(HOME_STRINGS.HOME),
          drawerIcon: ({ size, color }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: t(HOME_STRINGS.PROFILE),
          drawerIcon: ({ size, color }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="setting"
        options={{
          drawerLabel: t(HOME_STRINGS.SETTING),
          drawerIcon: ({ size, color }) => <Ionicons name="cog" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          drawerLabel: t(HOME_STRINGS.ABOUT_APP),
          drawerIcon: ({ size, color }) => (
            <Ionicons name="information" size={size} color={color} />
          ),
          headerTitle: '',
        }}
      />
      <Drawer.Screen
        name="contactus"
        options={{
          drawerLabel: t(HOME_STRINGS.CONTACT_US),
          drawerIcon: ({ size, color }) => <Ionicons name="call" size={size} color={color} />,
          headerTitle: t(HOME_STRINGS.CONTACT_US),
        }}
      />
      <Drawer.Screen
        name="feedback"
        options={{
          drawerLabel: t(HOME_STRINGS.FEEDBACK),
          drawerIcon: ({ size, color }) => (
            <Ionicons name="chatbox-ellipses" size={size} color={color} />
          ),
          headerTitle: t(HOME_STRINGS.FEEDBACK),
        }}
      />
      <Drawer.Screen
        name="stats"
        options={{
          drawerLabel: t(HOME_STRINGS.STATISTICS),
          drawerIcon: ({ size, color }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
          headerTitle: t(HOME_STRINGS.STATISTICS),
        }}
      />
      <Drawer.Screen
        name="terms"
        options={{
          headerShown: true,
          headerTransparent: false,
          title: t(HOME_STRINGS.TERMS_AND_CONDITIONS),
          drawerLabel: t(HOME_STRINGS.TERMS_AND_CONDITIONS),
          drawerIcon: ({ size, color }) => (
            <Ionicons name="shield-checkmark" size={size} color={color} />
          ),
          headerTitle: t(HOME_STRINGS.TERMS_AND_CONDITIONS),
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
