import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/home/HomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ProductScreen from '../screens/product/ProductScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  LoadingScreen: undefined;
  ProductScreen: {productId: number};
};

const Stack = createStackNavigator<RootStackParams>();

type ScreenConfig = {
  name: keyof RootStackParams;
  component: React.ComponentType<any>;
};

const screens: ScreenConfig[] = [
  {name: 'LoginScreen', component: LoginScreen},
  {name: 'HomeScreen', component: HomeScreen},
  {name: 'RegisterScreen', component: RegisterScreen},
  {name: 'ProductScreen', component: ProductScreen},
];

const renderScreens = screens.map(({name, component}) => (
  <Stack.Screen key={name} name={name} component={component} />
));

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
      }}>
      {renderScreens}
    </Stack.Navigator>
  );
}
