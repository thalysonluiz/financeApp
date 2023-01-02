
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';

const AuthStack = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerStyle: {
            backgroundColor: '#FFF',
            borderBottomWidth: 1,
            borderBottomColor: '#34b67f'
          },
          headerTintColor: '#0E0D20',
          headerBackTitleVisible: false,
          headerTitle: 'Voltar'
        }}
      />
    </AuthStack.Navigator>
  )
}