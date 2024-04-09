import React, { useState } from 'react';
import { Linking, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'http://10.0.2.2:8080/member/join';

const openLink = () => {
  Linking.openURL('#');
};

export default function RegisterScreen({ navigation }) {
  const [state, setState] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [department1, setDepartment1] = useState('');
  const [department2, setDepartment2] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorText, setShowErrorText] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    handleChkPwd();
    try {
      const response = await axios.post(API_URL, {
        email: email,
        userName: username,
        password: password,
        checkedPassword: confirmPassword,
        department1: department1,
        department2: department2,
        role: "USER",
      });

      if (response.status === 200) {
        setShowSuccessMessage(true);
        setShowErrorText(false);
        setErrorMessage('');
        
        console.log('Register Successful');

        navigation.navigate('Login');

      } else {
        setShowSuccessMessage(false);
        setShowErrorText(true);

        if (response.data.error) {
          setErrorMessage(response.data.error);
        } else {
          setErrorMessage('아이디 또는 비밀번호 형식이 올바르지 않습니다.');
        }
      }
    } catch (error) {
      console.error('Error Join in:', error);
      setErrorMessage('회원가입에 실패하였습니다.');
      setShowSuccessMessage(false);
      setShowErrorText(true);
    }
  };

  const handleChkPwd = () => {
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
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
        <Text style={styles.title}>Hi, 수정이</Text>
        <Text style={styles.subtitle}>반가워요 새로운 수정!</Text>

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>주전공</Text>
          <Picker
            selectedValue={department1}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setDepartment1(itemValue)}>
            <Picker.Item style={styles.Itemtext} label="-- 선택 --" />
            <Picker.Item style={styles.Itemtext} label="국어국문학과" value="국어국문학과" />
            <Picker.Item style={styles.Itemtext} label="영어영문학과" value="영어영문학과" />
            <Picker.Item style={styles.Itemtext} label="독일어문·문화학과" value="독일어문·문화학과" />
            <Picker.Item style={styles.Itemtext} label="프랑스어문·문화학과 " value="프랑스어문·문화학과" />
            <Picker.Item style={styles.Itemtext} label="일본어문·문화학과" value="일본어문·문화학과" />
            <Picker.Item style={styles.Itemtext} label="중국어문·문화학과" value="중국어문·문화학과" />
            <Picker.Item style={styles.Itemtext} label="사학과" value="사학과" />
            <Picker.Item style={styles.Itemtext} label="문화예술경영학과" value="문화예술경영학과" />
            <Picker.Item style={styles.Itemtext} label="미디어영상연기학과" value="미디어영상연기학과" />
            <Picker.Item style={styles.Itemtext} label="현대실용음악학과" value="현대실용음악학과" />
            <Picker.Item style={styles.Itemtext} label="무용예술학과" value="무용예술학과" />
            <Picker.Item style={styles.Itemtext} label="정치외교학과" value="정치외교학과" />
            <Picker.Item style={styles.Itemtext} label="심리학과" value="심리학과" />
            <Picker.Item style={styles.Itemtext} label="지리학과" value="지리학과" />
            <Picker.Item style={styles.Itemtext} label="미디어커뮤니케이션학과" value="미디어커뮤니케이션학과" />
            <Picker.Item style={styles.Itemtext} label="경영학부" value="경영학부" />
            <Picker.Item style={styles.Itemtext} label="사회복지학과" value="사회복지학과" />
            <Picker.Item style={styles.Itemtext} label="법학부" value="법학부" />
            <Picker.Item style={styles.Itemtext} label="의류산업학과" value="의류산업학과" />
            <Picker.Item style={styles.Itemtext} label="소비자생활문화산업학과" value="소비자생활문화산업학과" />
            <Picker.Item style={styles.Itemtext} label="뷰티산업학과" value="뷰티산업학과" />
            <Picker.Item style={styles.Itemtext} label="수리통계데이터사이언스학부" value="수리통계데이터사이언스학부" />
            <Picker.Item style={styles.Itemtext} label="화학·에너지융합학부" value="화학·에너지융합학부" />
            <Picker.Item style={styles.Itemtext} label="바이오신약의과학부" value="바이오신약의과학부" />
            <Picker.Item style={styles.Itemtext} label="바이오헬스융합학부" value="바이오헬스융합학부" />
            <Picker.Item style={styles.Itemtext} label="스포츠과학부" value="스포츠과학부" />
            <Picker.Item style={styles.Itemtext} label="서비스·디자인공학과" value="서비스·디자인공학과" />
            <Picker.Item style={styles.Itemtext} label="융합보안공학과" value="융합보안공학과" />
            <Picker.Item style={styles.Itemtext} label="컴퓨터공학과" value="컴퓨터공학과" />
            <Picker.Item style={styles.Itemtext} label="청정융합에너지공학과" value="청정융합에너지공학과" />
            <Picker.Item style={styles.Itemtext} label="바이오식품공학과" value="바이오식품공학과" />
            <Picker.Item style={styles.Itemtext} label="바이오생명공학과" value="바이오생명공학과" />
            <Picker.Item style={styles.Itemtext} label="간호학과" value="간호학과" />
            <Picker.Item style={styles.Itemtext} label="교육학과" value="교육학과" />
            <Picker.Item style={styles.Itemtext} label="사회교육과" value="사회교육과" />
            <Picker.Item style={styles.Itemtext} label="윤리교육과" value="윤리교육과" />
            <Picker.Item style={styles.Itemtext} label="한문교육과" value="한문교육과" />
            <Picker.Item style={styles.Itemtext} label="유아교육과" value="유아교육과" />
            <Picker.Item style={styles.Itemtext} label="동양화과" value="동양화과" />
            <Picker.Item style={styles.Itemtext} label="서양화과" value="서양화과" />
            <Picker.Item style={styles.Itemtext} label="조소과" value="조소과" />
            <Picker.Item style={styles.Itemtext} label="공예과" value="공예과" />
            <Picker.Item style={styles.Itemtext} label="디자인과" value="디자인과" />
            <Picker.Item style={styles.Itemtext} label="성악과" value="성악과" />
            <Picker.Item style={styles.Itemtext} label="기악과" value="기악과" />
            <Picker.Item style={styles.Itemtext} label="작곡과" value="작곡과" />
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>부·복수전공</Text>
          <Picker
            selectedValue={department2}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setDepartment2(itemValue)}>
            <Picker.Item style={styles.Itemtext} label="-- 선택 --" /> 
            <Picker.Item style={styles.Itemtext} label="없음" value="null"/> 
            <Picker.Item style={styles.Itemtext} label="국어국문학과" value="국어국문학과" />
            <Picker.Item style={styles.Itemtext} label="영어영문학과" value="영어영문학과" />
            <Picker.Item style={styles.Itemtext} label="독일어문·문화학과" value="독일어문·문화학과" />
            <Picker.Item style={styles.Itemtext} label="프랑스어문·문화학과 " value="프랑스어문·문화학과" />
            <Picker.Item style={styles.Itemtext} label="일본어문·문화학과" value="일본어문·문화학과" />
            <Picker.Item style={styles.Itemtext} label="중국어문·문화학과" value="중국어문·문화학과" />
            <Picker.Item style={styles.Itemtext} label="사학과" value="사학과" />
            <Picker.Item style={styles.Itemtext} label="문화예술경영학과" value="문화예술경영학과" />
            <Picker.Item style={styles.Itemtext} label="미디어영상연기학과" value="미디어영상연기학과" />
            <Picker.Item style={styles.Itemtext} label="현대실용음악학과" value="현대실용음악학과" />
            <Picker.Item style={styles.Itemtext} label="무용예술학과" value="무용예술학과" />
            <Picker.Item style={styles.Itemtext} label="정치외교학과" value="정치외교학과" />
            <Picker.Item style={styles.Itemtext} label="심리학과" value="심리학과" />
            <Picker.Item style={styles.Itemtext} label="지리학과" value="지리학과" />
            <Picker.Item style={styles.Itemtext} label="미디어커뮤니케이션학과" value="미디어커뮤니케이션학과" />
            <Picker.Item style={styles.Itemtext} label="경영학부" value="경영학부" />
            <Picker.Item style={styles.Itemtext} label="사회복지학과" value="사회복지학과" />
            <Picker.Item style={styles.Itemtext} label="법학부" value="법학부" />
            <Picker.Item style={styles.Itemtext} label="의류산업학과" value="의류산업학과" />
            <Picker.Item style={styles.Itemtext} label="소비자생활문화산업학과" value="소비자생활문화산업학과" />
            <Picker.Item style={styles.Itemtext} label="뷰티산업학과" value="뷰티산업학과" />
            <Picker.Item style={styles.Itemtext} label="수리통계데이터사이언스학부" value="수리통계데이터사이언스학부" />
            <Picker.Item style={styles.Itemtext} label="화학·에너지융합학부" value="화학·에너지융합학부" />
            <Picker.Item style={styles.Itemtext} label="바이오신약의과학부" value="바이오신약의과학부" />
            <Picker.Item style={styles.Itemtext} label="바이오헬스융합학부" value="바이오헬스융합학부" />
            <Picker.Item style={styles.Itemtext} label="스포츠과학부" value="스포츠과학부" />
            <Picker.Item style={styles.Itemtext} label="서비스·디자인공학과" value="서비스·디자인공학과" />
            <Picker.Item style={styles.Itemtext} label="융합보안공학과" value="융합보안공학과" />
            <Picker.Item style={styles.Itemtext} label="컴퓨터공학과" value="컴퓨터공학과" />
            <Picker.Item style={styles.Itemtext} label="청정융합에너지공학과" value="청정융합에너지공학과" />
            <Picker.Item style={styles.Itemtext} label="바이오식품공학과" value="바이오식품공학과" />
            <Picker.Item style={styles.Itemtext} label="바이오생명공학과" value="바이오생명공학과" />
            <Picker.Item style={styles.Itemtext} label="간호학과" value="간호학과" />
            <Picker.Item style={styles.Itemtext} label="교육학과" value="교육학과" />
            <Picker.Item style={styles.Itemtext} label="사회교육과" value="사회교육과" />
            <Picker.Item style={styles.Itemtext} label="윤리교육과" value="윤리교육과" />
            <Picker.Item style={styles.Itemtext} label="한문교육과" value="한문교육과" />
            <Picker.Item style={styles.Itemtext} label="유아교육과" value="유아교육과" />
            <Picker.Item style={styles.Itemtext} label="동양화과" value="동양화과" />
            <Picker.Item style={styles.Itemtext} label="서양화과" value="서양화과" />
            <Picker.Item style={styles.Itemtext} label="조소과" value="조소과" />
            <Picker.Item style={styles.Itemtext} label="공예과" value="공예과" />
            <Picker.Item style={styles.Itemtext} label="디자인과" value="디자인과" />
            <Picker.Item style={styles.Itemtext} label="성악과" value="성악과" />
            <Picker.Item style={styles.Itemtext} label="기악과" value="기악과" />
            <Picker.Item style={styles.Itemtext} label="작곡과" value="작곡과" />
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="유저 이름"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setPasswordMatchError(false);
          }}
          secureTextEntry
        />

        {passwordMatchError && (
          <Text style={styles.errorText}>비밀번호가 일치하지 않습니다.</Text>
        )}
        {showErrorText && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}

        <TouchableOpacity style={styles.commit} onPress={handleRegister}>
          <Text style={styles.commitText}>회원가입</Text>
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
    fontSize: 30,
    color: 'white',
    marginBottom: 20,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 15,
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'rgba(131, 131, 131, 1)',
    borderWidth: 2,
    borderColor: 'white',
  },
  pickerContainer: {
    borderColor:'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pickerLabel: {
    color: 'white',
    marginRight: 10,
    fontSize: 16,
  },
  picker: {
    flex: 1,
    height: 50,
    borderWidth: 2,
    borderColor: 'black',
  },
  Itemtext: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'white',
  },
  commit: {
    marginTop: 10,
    width: 200,
    height: 40,
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
  errorText: {
    color: 'red',
    marginTop: 5,
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
});
