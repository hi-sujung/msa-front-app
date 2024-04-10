import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import EmailScreen from './../screens/EmailScreen';
import { useAuth } from './../utils/AuthContext';

import { useNavigation } from '@react-navigation/native';

const API_URL = 'http://10.0.2.2:8080/member/login';


// function LoginScreen({ navigation }) {
  function LoginScreen() {

  const { login } = useAuth(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorText, setShowErrorText] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();
  

  const handleLogin = async () => {
    try {
      const response = await axios.post(API_URL, {
        email: email,
        password: password,
      });
      console.log(response.data.userId);

      if (response.status === 200) {
        console.log(response.data.token);
        setShowSuccessMessage(true);
        setShowErrorText(false);
        setErrorMessage('');
        const token = response.data.token;
        const userInfo = { id: response.data.userId, name: response.data.username, email: response.data.email};
        
        login(token, userInfo);

        console.log('login successfull');

        navigation.navigate('Main'); // main.js 화면으로 이동
      } else {
        setShowSuccessMessage(false);
        setShowErrorText(true);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('로그인 중에 오류가 발생했습니다.');
      setShowSuccessMessage(false);
      setShowErrorText(true);
    }
  };

  return (
    <LinearGradient
      colors={['#E2D0F8', '#A0BFE0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>안녕, 수정이</Text>
        <TextInput
          style={styles.input}
          placeholder="아이디"
          value={email} // 아이디로 로그인하는 거니까 username이 아니라 email
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
        {showSuccessMessage && (
          <Text style={styles.successMessage}>로그인 성공</Text>
        )}
        {showErrorText && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('Email')}>
          <Text style={styles.signupText}>계정이 없으신가요? <Text style={styles.signupLink}>회원가입</Text></Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    linearGradient: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      padding: 50,
      alignItems: 'center',
      marginTop: 80,
    },
    title: {
      fontSize: 28,
      color: 'white',
      marginBottom: 20,
    },
    input: {
      width: 250,
      height: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 5,
      color: 'rgba(131, 131, 131, 1)',
    },
    button: {
      width: 150,
      height: 40,
      backgroundColor: 'rgba(166, 208, 253, 1)',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      elevation: 4,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      textAlign: 'center',
    },
    successMessage: {
      color: 'green',
      fontSize: 16,
      marginTop: 10,
    },
    errorMessage: {
      color: 'red',
      fontSize: 16,
      marginTop: 10,
    },
    signupText: {
      marginTop: 20,
      color: 'white',
      fontSize: 16,
    },
    signupLink: {
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
  });

export default LoginScreen;
  