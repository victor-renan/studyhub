import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from './styles';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationTabs, NavigationTabsRoute } from "./TabNavigator";
import { theme, Text, Heading } from "native-base";
import { AdminRoute, AdminScreen } from "../../screens/Admin";
import AsyncStorage from "@react-native-async-storage/async-storage";


// Cria um navegador em baixo
const Drawer = createDrawerNavigator();

// --> Navegador padrão Drawer
export function NavigationDrawer({ navigation }) {
  const [user, setUser] = React.useState(null);
  const getUser = async () => {
    setUser(await AsyncStorage.getItem('user'));
  }
  React.useEffect(() => {
    getUser()
    console.log(user);
  },[]);
  return (
    <Drawer.Navigator
      useLegacyImplementation
      screenOptions={
        ({ navigation }) => ({
          headerRight: () => (
            <Icon name="menu" size={32} color={theme.colors.white} onPress={navigation.toggleDrawer} />
          ),
          headerLeft: () => (null),
          ...styles.tabBar,
        })
      }
    >
      <Drawer.Screen
        name={NavigationTabsRoute}
        component={NavigationTabs}
        options={{
          drawerIcon: ({ color }) => { return <Icon name='home-outline' size={20} color={color} /> },
        }}
      />
      <Drawer.Screen
        name={AdminRoute}
        component={AdminScreen}
        options={{
          drawerIcon: ({ color }) => { return <Icon name='hammer-outline' size={20} color={color} /> },
        }}
      />
    </Drawer.Navigator>
  );
}