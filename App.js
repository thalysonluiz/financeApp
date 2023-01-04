import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import {
  NativeBaseProvider
} from 'native-base';
import 'react-native-gesture-handler';

import { Routes } from './src/routes';
import { AuthProvider } from './src/contexts/auth';

export default function App() {
  return (
    <NavigationContainer>

      <NativeBaseProvider>

        <AuthProvider>

          <StatusBar style="auto" />
          <Routes />
        </AuthProvider>

      </NativeBaseProvider>
    </NavigationContainer>
  );
}

