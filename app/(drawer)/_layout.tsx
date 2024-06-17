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
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
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
        name="aboutus"
        options={{
          drawerLabel: t(HOME_STRINGS.ABOUT_US),
          drawerIcon: ({ size, color }) => (
            <Ionicons name="information" size={size} color={color} />
          ),
          headerTitle: 'About Us',
        }}
      />
      <Drawer.Screen
        name="contactus"
        options={{
          drawerLabel: t(HOME_STRINGS.CONTACT_US),
          drawerIcon: ({ size, color }) => <Ionicons name="call" size={size} color={color} />,
          headerTitle: 'Contact Us',
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
