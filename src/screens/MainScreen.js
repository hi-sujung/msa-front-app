import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import PortfolioListScreen from './PortfolioListScreen'; // myportfolio.js 파일의 컴포넌트를 import
import LikedNoticeScreen from './LikedNoticeScreen'
import chatBotScreen from './ChatScreen'; 
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from './../utils/AuthContext';

const Stack = createStackNavigator();

export default function MainScreen({ navigation }) {
  const { user } = useAuth();
  return (
    <LinearGradient
      colors={['#E2D0F8', '#A0BFE0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.linearGradient}
    >
      <View style={styles.titleContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('LikedNotice')}>
      <AntDesign name="hearto" size={24} color="white" style={{ marginleft: 20 }} />
    </TouchableOpacity>
        <Text style={styles.title}>Hi, {user.name} 수정이🔮</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.outerBox}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate('PortfolioList')} style={[styles.button, styles.firstButton, { backgroundColor: '#CCA1FF', borderColor: 'transparent' }]}>
              <Text style={styles.buttonText}>포트폴리오 {'\n'} 관리</Text>
            </TouchableOpacity>
            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={() => navigation.navigate('SchoolActList')} style={[styles.button, styles.secondButton, { backgroundColor: '#DAD2DE', borderColor: 'transparent' }]}>
                <Text style={styles.buttonText}>공지사항 {'\n'} 조회</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('ActList')} style={[styles.button, styles.thirdButton, { backgroundColor: 'white', borderColor: '#6A6FB3' }]}>
                <Text style={[styles.buttonText, { color: '#6A6FB3' }]}>대외활동 {'\n'} 조회</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('chatBotScreen')} style={styles.chatBotButton}>
          <Text style={styles.chatBotButtonText}>chatBot</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end', // 그라데이션 밑에 고정
  },
  titleContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: '100%',
    zIndex: 1, // 텍스트를 다른 요소 위에 표시하기 위한 설정
  },
  title: {
    fontSize: 28,
    color: 'white',
    fontWeight: '700',
    textAlign: 'left',
    letterSpacing: 9,
    top: 40, //여기 높이 수정
  },
  container: {
    width: '100%',
    height: '70%',
    flexDirection: 'column',
    alignItems: 'center', // 중앙 정렬로 수정
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10, // 격차 줄임
  },
  outerBox: {
    width: '110%', // 너비를 유지한 채로 85%로 변경
    height: windowHeight * 0.85, // 화면 높이의 85%
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 10, // 격차 줄임
    position: 'absolute', // 화면 바닥에 고정
    bottom: 0,
    flexDirection: 'column', // 버튼을 세로로 나열
  },
  row: {
    flexDirection: 'row', // 버튼을 가로로 나열
    justifyContent: 'space-between', // 버튼 간격을 벌리고 양쪽 정렬
    marginBottom: 10, // 행 간격 조정
  },
  button: {
    flex: 1, // 동일한 너비를 갖도록 설정
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
  },
  buttonGroup: {
    flex: 1, // 동일한 높이를 갖도록 설정
    flexDirection: 'column',
    height: '400%', // 첫 번째 버튼은 2행을 차지
  },
  firstButton: {
    height: '400%', // 첫 번째 버튼은 2행을 차지
    marginBottom: 10, // 첫 번째 버튼 아래 여백 추가
  },
  secondButton: {
    flex: 1, // 동일한 높이를 갖도록 설정
    marginBottom: '4%',
    marginLeft: '4%', // 오른쪽으로 이동하여 오른쪽 칸을 차지
  },
  thirdButton: {
    flex: 1, // 동일한 높이를 갖도록 설정
    marginLeft: '4%', // 오른쪽으로 이동하여 오른쪽 칸을 차지
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content2: {
    top: 20,
    marginTop: 200,
    alignItems: 'center', // 중앙 정렬
  },
  content2title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  innerContent: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center', // 중앙 정렬
  },
  todayRecommand: {
    flex: 1,
    padding: 30,
    borderRadius: 10,
    backgroundColor: '#F9EEFA',
    alignItems: 'center', // 중앙 정렬
  },
  innerSmalltxt: {
    color: 'gray',
    fontSize: 12,
  },
  innerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatBotButton: {
    position: 'fixed',
    bottom: 20,
    left: 120,
    width: 100,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#CCA1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatBotButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
