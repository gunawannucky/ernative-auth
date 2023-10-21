// In App.js in a new project

import AuthContext from '@modules/auth/auth-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@screens/home-screeen';
import LoginScreen from '@screens/login-screen';
import OtpScreen from '@screens/otp-screen';
import RegisterScreen from '@screens/register-screen';
import SplashScreen from '@screens/splash-screen';
import React, {useContext} from 'react';

export type SplashStackParamList = {
  SPLASH_SCREEN: undefined;
};
const SplashStack = createNativeStackNavigator<SplashStackParamList>();

export type AuthStackParamList = {
  REGISTER_SCREEN: undefined;
  OTP_SCREEN: {
    username: string;
    password: string;
  };
  LOGIN_SCREEN: undefined;
};
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export type PrivateStackParamList = {
  HOME_SCREEN: undefined;
};
const PrivateStack = createNativeStackNavigator<PrivateStackParamList>();

const RootNavigator = () => {
  const {user, chekingAuthentication, isAuthenticated} =
    useContext(AuthContext);
  if (chekingAuthentication) {
    return (
      <NavigationContainer>
        <SplashStack.Navigator
          screenOptions={{headerShown: false, animation: 'none'}}>
          <SplashStack.Screen name="SPLASH_SCREEN" component={SplashScreen} />
        </SplashStack.Navigator>
      </NavigationContainer>
    );
  }

  if (isAuthenticated) {
    return (
      <NavigationContainer>
        <PrivateStack.Navigator
          screenOptions={{headerShown: false, animation: 'none'}}>
          <PrivateStack.Screen name="HOME_SCREEN" component={HomeScreen} />
        </PrivateStack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <AuthStack.Navigator
        screenOptions={{headerShown: false, animation: 'none'}}>
        {!user ? (
          <>
            <AuthStack.Screen
              name="REGISTER_SCREEN"
              component={RegisterScreen}
            />
            <AuthStack.Screen name="OTP_SCREEN" component={OtpScreen} />
          </>
        ) : (
          <>
            <AuthStack.Screen name="LOGIN_SCREEN" component={LoginScreen} />
          </>
        )}
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
