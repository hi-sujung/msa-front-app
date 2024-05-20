// App.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './utils/AuthContext'; // app에서 navigation을 AuthProvider로 감싸야 함
import MyportfolioScreen from './screens/MyportfolioScreen';
import LoginScreen from './screens/LoginScreen';
import ActivityScreen from './screens/ActivityScreen';
import ActListScreen from './screens/ActListScreen';
import RegisterScreen from './screens/RegisterScreen';
import EmailScreen from './screens/EmailScreen';
import SchoolActListScreen from './screens/SchoolActListScreen';
import SchoolActivityScreen from './screens/SchoolActivityScreen';
import MainScreen from './screens/MainScreen';
import PortfolioListScreen from './screens/PortfolioListScreen';
import viewNoticeLike from './screens/viewNoticeLike';
import ChatScreen from './screens/ChatScreen';
import CreatePortfolioScreen from './screens/CreatePortfolioScreen';
import AutoPortfolioScreen from './screens/AutoPortfolioScreen';
import AutoPortfolioListScreen from './screens/AutoPortfolioListScreen';
import AttendSchoolActListScreen from './screens/AttendSchoolActListScreen';
import AttendActListScreen from './screens/AttendActListScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    // for app test
    <AuthProvider> 
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* 자동 생성 포트폴리오 */}
        {/* <Stack.Screen
          name="AutoPortfolioScreen"
          component={AutoPortfolioScreen}
          options={{ headerShown: false }}
        />  */}
        {/* 참여한 대외활동 리스트(교내활동) */}
        <Stack.Screen
          name="AttendActList"
          component={AttendActListScreen}
          options={{ headerShown: false }}
        /> 
        {/* 대외활동 리스트 */}
        <Stack.Screen
          name="ActList"
          component={ActListScreen}
          options={{ headerShown: false }}
        /> 
        {/* 대외활동 */}
        <Stack.Screen
          name="Activity"
          component={ActivityScreen}
          options={{ headerShown: false }}
        /> 
        {/* 참여한 공지사항 리스트(교내활동) */}
        <Stack.Screen
          name="AttendSchoolActList"
          component={AttendSchoolActListScreen}
          options={{ headerShown: false }}
        /> 
        {/* 로그인 */}
        {/* <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />  */}
        {/* 공지사항 리스트(교내활동) */}
        <Stack.Screen
          name="SchoolActList"
          component={SchoolActListScreen}
          options={{ headerShown: false }}
        /> 
        {/* 공지사항(교내활동) */}
        <Stack.Screen
          name="SchoolActivity"
          component={SchoolActivityScreen}
          options={{ headerShown: false }}
        /> 

        
        
        {/* 포트폴리오 리스트 */}
        <Stack.Screen
          name="PortfolioList"
          component={PortfolioListScreen}
          options={{ headerShown: false }}
        /> 
        {/* 포트폴리오 생성 */}
        <Stack.Screen
          name="CreatePortfolio"
          component={CreatePortfolioScreen}
          options={{ headerShown: false }}
        /> 
        </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
  );
}