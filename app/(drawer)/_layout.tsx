import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

const DrawerLayout = () => (
  <Drawer>
    <Drawer.Screen
      name="(tabs)"
      options={{
        headerShown: false,
        drawerLabel: 'Home',
        drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
      }}
    />
  </Drawer>
);

export default DrawerLayout;
