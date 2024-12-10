import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/home/HomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ProductScreen from '../screens/product/ProductScreen';
import {StackCardStyleInterpolator} from 'node_modules/@react-navigation/stack/lib/typescript/commonjs/src';
import LoadingScreen from '../screens/loading/LoadingScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  LoadingScreen: undefined;
  ProductScreen: {productId: number};
};

const Stack = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({current}) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};

type ScreenConfig = {
  name: keyof RootStackParams;
  component: React.ComponentType<any>;
  hasAnimation?: boolean;
};

const screens: ScreenConfig[] = [
  {name: 'LoadingScreen', component: LoadingScreen, hasAnimation: true},
  {name: 'LoginScreen', component: LoginScreen, hasAnimation: true},
  {name: 'RegisterScreen', component: RegisterScreen, hasAnimation: true},
  {name: 'HomeScreen', component: HomeScreen, hasAnimation: true},
  {name: 'ProductScreen', component: ProductScreen},
];

const renderScreens = screens.map(({name, component, hasAnimation}) => (
  <Stack.Screen
    key={name}
    name={name}
    component={component}
    options={{cardStyleInterpolator: hasAnimation ? fadeAnimation : undefined}}
  />
));

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,

        // Apply for global application
        // cardStyleInterpolator: fadeAnimation,
      }}>
      {renderScreens}
    </Stack.Navigator>
  );
}
