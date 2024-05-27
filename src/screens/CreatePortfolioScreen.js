import React, { useState, useEffect  } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'http://10.0.2.2:8082/portfolio/new';


export default function CreatePortfolioScreen() {
  const [portfolioData, setPortfolio] = useState({});
  const [navigationButtons, setNavigationButtons] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedSubTitle, setEditedSubTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const { user, token } = useAuth(); // 현재 로그인한 유저의 user, token
  const navigation = useNavigation(); // Initialize navigation

  const CreatePortfolioData = async (updatedData) => {
    try {
      const response = await axios.post(
        `${API_URL}?memberId=${user.email}`,
        updatedData
      );
  
      if (response.status === 200) {
        console.log('포트폴리오 생성 완료');
        Alert.alert('포트폴리오가 생성되었습니다.');
        handleHomePress();
      } else {
        console.error('포트폴리오 생성 실패:', response.status);
      }
    } catch (error) {
      console.error('포트폴리오 생성 에러:', error);
    }
  };

  const handleCreateButton = async () => {
    if (!editedTitle) {
      Alert.alert('포트폴리오 제목을 입력하세요');
      return;
    }
    const updatedButton = {
      title: editedTitle,       // 사용자가 편집한 제목
      urlLink: editedSubTitle, // 사용자가 편집한 부제목
      description: editedContent,   // 사용자가 편집한 내용
    };
  
    try {
      await CreatePortfolioData(updatedButton); // 서버에 수정된 데이터를 저장
      setNavigationButtons([...navigationButtons.map((button) => (button === selectedButton ? updatedButton : button))]); // 수정된 버튼 정보를 업데이트
    } catch (error) {
      console.error('포트폴리오 생성 에러:', error);
    }
  };

  const handleHomePress = () => {
    navigation.navigate('Main'); 
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleHomePress} style={styles.homeButton}>
          <AntDesign name="home" size={24} color="rgba(74, 85, 162, 1)" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>포트폴리오 생성</Text>
      </View>

      <View style={styles.main}>
        {/* <View style={styles.portfolioInfo}>
        <TextInput
              style={styles.portfolioName}
              value={editedTitle}
              onChangeText={handleTitleChange}
             />
        </View> */}
        <Text style={styles.infoLabel}>포트폴리오 제목</Text>
        <TextInput
          style={styles.infoInput}
          value={editedTitle}
          // onChangeText={handleTitleChange}
          onChangeText={setEditedTitle}
        />
        <Text style={styles.infoLabel}>포트폴리오 링크</Text>
        <TextInput
          style={styles.infoInput}
          value={editedSubTitle}
          // onChangeText={handleSubTitleChange}
          onChangeText={setEditedSubTitle}
        />
        <Text style={styles.infoLabel}>내용</Text>
        <TextInput
          style={styles.bigInfoInput}
          multiline
          numberOfLines={4}
          value={editedContent}
          // onChangeText={handleContentChange}
          onChangeText={setEditedContent}
        />
          <LinearGradient
            colors={['#E2D0F8', '#A0BFE0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.saveButton]} 
            >
            <TouchableOpacity onPress={handleCreateButton}>
              <Text style={styles.saveButtonText}>생성</Text>
            </TouchableOpacity>
          </LinearGradient>
        
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // linearGradient: {
  //   flex: 1,
  // },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  homeButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop:20,
  },
  headerTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop:10,
  },
  nav: {
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    overflow: 'hidden',
  },
  navContent: {
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activityDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  navButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom:10,
  },
  navButtonText: {
    color: 'rgba(74, 85, 162, 1)',
    fontWeight: 'bold',
  },
  navButtonPlus: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'dotted',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom:10,
  },
  navButtonTextPlus: {
    color: 'white',
    fontWeight: 'bold',
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  portfolioInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  portfolioName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  editButtonText: {
    color: 'rgba(74, 85, 162, 1)',
    fontWeight: 'bold',
  },
  deleteButton: {
    position: 'absolute',
    bottom: 300, // 아래 여백
    right: 20, // 오른쪽 여백
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  infoInput: {
    backgroundColor: 'rgba(226, 208, 248, 0.3)',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  bigInfoInput: {
    backgroundColor: 'rgba(226, 208, 248, 0.3)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  saveButton: {
    // backgroundColor: 'rgba(160, 191, 224, 1)',
    height:70,
    borderRadius: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
    width: '60%',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  portfolioNavTitle: {
    color: 'rgba(74, 85, 162, 1)',
    fontWeight: 'bold',
    fontSize: 12,
  },
});