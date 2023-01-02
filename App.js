import { StatusBar } from 'expo-status-bar';
import {
  Center,
  NativeBaseProvider,
  Text
} from 'native-base';

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar style="auto" />
      <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
      >
        <Text>Open up App.js to start working on your app!</Text>
      </Center>
    </NativeBaseProvider>
  );
}

