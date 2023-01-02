import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import {
  Center,
  NativeBaseProvider,
  Text
} from 'native-base';
import 'react-native-gesture-handler';
import { Routes } from './src/routes';

export default function App() {
  return (
    <NavigationContainer>

      <NativeBaseProvider>
        <StatusBar style="auto" />
        <Routes />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

