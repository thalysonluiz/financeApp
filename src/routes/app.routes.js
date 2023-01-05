
//import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Home } from '../pages/Home';
import { NewRecord } from '../pages/NewRecord';
import { Profile } from '../pages/Profile';

//const AppDrawer = createDrawerNavigator();

const AppTab = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <AppTab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#171717',
          borderColor: '#171717'
        },
        tabBarActiveTintColor: '#00b94a',
        tabBarInactiveTintColor: '#DDD',
        tabBarShowLabel: false
      }}
    >
      <AppTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" color={color} size={26} />
          ),
          headerShown: false
        }}
      />
      <AppTab.Screen
        name="Registrar"
        component={NewRecord}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="add" color={color} size={26} />
          ),
          headerShown: false
        }}
      />
      <AppTab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" color={color} size={26} />
          ),
          headerShown: false
        }}
      />
    </AppTab.Navigator>


  )
}

{/* <AppDrawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#171717'
        },
        drawerLabelStyle: {
          fontWeight: 'bold'
        },
        activeTintColor: '#FFF',
        activeBackgroundColor: '#00b94a',
        inactiveTintColor: '#000',
        inactiveBackgroundColor: '#DDD',
        drawerItemStyle: {
          marginVertical: 5
        }
      }}
      useLegacyImplementation={false}
    >
      <AppDrawer.Screen
        name="Home" component={Home}
        options={{ headerShown: false }}
      />
      <AppDrawer.Screen
        name="Registrar" component={NewRecord}
        options={{ headerShown: false }}
      />
      <AppDrawer.Screen
        name="Perfil" component={Profile}
        options={{ headerShown: false }}
      />
    </AppDrawer.Navigator> */}