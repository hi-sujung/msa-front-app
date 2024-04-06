import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { useAuth } from './../utils/AuthContext';
import { useNavigation } from '@react-navigation/native';


export default function EmailScreen() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorText, setShowErrorText] = useState(false);
  const navigation = useNavigation();

  const handleEmailSubmit = async () => {
    if (!email) {
      setShowErrorText(true);
      return;
    }

    try {
      const fullEmail = email + "@sungshin.ac.kr";

      const response = await axios.post('http://3.39.104.119/member/join/mailConfirm', null, {
        params: {
          email: fullEmail,
        },
      });

      setShowSuccessMessage(true);
      setShowErrorText(false);

      console.log('이메일 전송 응답:', response.data);
    } catch (error) {
      console.error('이메일 전송 오류:', error);
      Alert.alert('오류', '이메일 전송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleVerificationSubmit = async () => {
    try {
      const response = await axios.get(`http://3.39.104.119:8080/member/join/verify/${verificationCode}`);
      console.log(response.data);
      if (response.data === "인증에 성공하였습니다.") {
        
        setShowSuccessMessage(true);
        setShowErrorText(false);
        navigation.navigate('Register');
      } else {
        setShowSuccessMessage(false);
        setShowErrorText(true);
      }
    } catch (error) {
      console.error('인증 제출 오류:', error);
      setShowSuccessMessage(false);
      setShowErrorText(true);
    }
  };

  const windowWidth = Dimensions.get('window').width;

  const handleBackPress = () => {
    navigation.navigate('Login'); 
  };

  return (
    <LinearGradient
      colors={['#E2D0F8', '#A0BFE0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.linearGradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headingContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <AntDesign name="arrowleft" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>이메일 인증</Text>
        </View>
        <Text style={styles.subtitle}>인증번호 입력</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="이메일"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.emilText}>@sungshin.ac.kr</Text>
          <TouchableOpacity style={styles.submitButton} onPress={handleEmailSubmit}>
            <Text style={styles.submitButtonText}>전송</Text>
          </TouchableOpacity>
        </View>

        {showSuccessMessage && (
          <Text style={styles.successText}>인증 메일이 전송되었습니다. 메시지함을 확인해주세요!</Text>
        )}

        {showErrorText && <Text style={styles.errorText}>올바르지 않은 형식입니다.</Text>}

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, styles.verificationInput]}
            placeholder="인증번호"
            value={verificationCode}
            onChangeText={setVerificationCode}
          />
        </View>

        <TouchableOpacity style={styles.commit} onPress={handleVerificationSubmit}>
          <Text style={styles.commitText}>제출</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: windowWidth,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 50,
    minHeight: windowHeight,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 10,
  },
  title: {
    left: -50,
    fontSize: 30,
    color: 'white',
    marginBottom: 20,
    fontWeight: '700',
  },
  backButton: {
    top: -10,
    left: 220,
    backgroundColor: 'skyblue',
    borderRadius: 20,
    padding: 5,
  },
  subtitle: {
    fontSize: 15,
    color: 'white',
    marginBottom: 20,
    alignSelf: 'flex-start',
    left: 70,
    top: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: 100,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'white',
  },
  submitButton: {
    width: 50,
    backgroundColor: 'rgba(197, 223, 248, 1)',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 4,
    left: 5,
  },
  submitButtonText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
  commit: {
    width: 150,
    backgroundColor: 'rgba(197, 223, 248, 1)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 4,
  },
  commitText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  commitTextCenter: {
    color: 'white',
    fontSize: 15,
    marginBottom: 10,
    bottom: 15,
    alignSelf: 'center',
  },
  verificationInput: {
    width: 250,
  },
  successText: {
    color: 'green',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: 70,
    bottom: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginLeft: 70,
    bottom: 15,
  },
});
