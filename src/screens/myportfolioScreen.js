import React, { useState, useEffect  } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { useAuth } from '../utils/AuthContext';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'http://10.0.2.2:8082/portfolio/';


export default function MyportfolioScreen({ route }) {
  const { portfolioId } = route.params;
  const [portfolioData, setPortfolio] = useState({});
  const [navigationButtons, setNavigationButtons] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedSubTitle, setEditedSubTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(true);

 // const [portfolio, setPortfolio] = useState([]);
  const { user, token } = useAuth(); // 현재 로그인한 유저의 user, token
  const navigation = useNavigation(); // Initialize navigation


  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {

    try {
      const response = await axios.get(`${API_URL}id?id=${portfolioId}`);
      if (response.status === 200) {
        setPortfolio(response.data.data);
        console.log('상세페이지 불러옴');
      }
    } catch (error) {
      console.error('Error fetching activity data:', error);
    }
  };

  // 포트폴리오 편집
const EditPortfolioData = async (updatedData) => {

  try {
    const response = await axios.post(
      `${API_URL}update/id?id=${portfolioId}`,
      updatedData
    );

    if (response.status === 200) {
      console.log('포트폴리오 수정 완료');
    } else {
      console.error('포트폴리오 수정 실패:', response.status);
    }
  } catch (error) {
    console.error('포트폴리오 수정 에러:', error);
  }
};

  // 포트폴리오 삭제
  const deletePortfolioData = async () => {
    try {
      const response = await axios.delete(`${API_URL}portfolio/id?id=${portfolioId}`);
  
      if (response.status === 200) {
        // 포트폴리오 삭제 성공 시 처리
        console.log('포트폴리오가 삭제되었습니다.');
        Alert.alert('포트폴리오가 삭제되었습니다.');
      } else {
        console.error('Error deleting portfolio:', response.status);
      }
    } catch (error) {
      console.error('Error deleting portfolio:', error);
    }
  };

  
  const addNavigationButton = () => {
    const newButton = {
      title: `포트폴리오${navigationButtons.length + 1}`,
      subTitle: `새로운 포트폴리오 ${navigationButtons.length + 1}`,
      content: `새로운 내용 ${navigationButtons.length + 1}`,
    };

    setNavigationButtons([...navigationButtons, newButton]);
  };

  const handleButtonPress = (button) => {
    setSelectedButton(button);
    setIsEditMode(false);
    setEditedTitle(button.title);
    setEditedSubTitle(button.subTitle);
    setEditedContent(button.content);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleTitleChange = (text) => {
    setEditedTitle(text);
    console.log('제목 업데이트');
  };

  const handleSubTitleChange = (text) => {
    setEditedSubTitle(text);
    console.log('링크 업데이트');
  };

  const handleContentChange = (text) => {
    setEditedContent(text);
    console.log('내용 업데이트');
  };

  const handleEditButtonClick = () => {
    setIsEditMode(true); // "수정" 버튼 클릭 시 편집 모드 활성화
    setDeleteButtonVisible(false); // "삭제" 버튼 숨김
    // setEditedTitle(portfolioData.title); // 편집 중인 타이틀 초기화
  };

  const handleSaveButtonClick = () => {
    // 저장 버튼 클릭 시 편집 모드 비활성화 등의 처리
    setIsEditMode(false);
    setDeleteButtonVisible(true);
  };

  const handleSaveButton = async () => {
    const updatedButton = {
      title: editedTitle,       // 사용자가 편집한 제목
      urlLink: editedSubTitle, // 사용자가 편집한 부제목
      description: editedContent,   // 사용자가 편집한 내용
    };
  
    try {
      await EditPortfolioData(updatedButton); // 서버에 수정된 데이터를 저장
      setNavigationButtons([...navigationButtons.map((button) => (button === selectedButton ? updatedButton : button))]); // 수정된 버튼 정보를 업데이트
      setIsEditMode(false); // 편집 모드 비활성화
      setDeleteButtonVisible(true);
      fetchPortfolioData(); // 수정된 내용을 다시 불러옴
    } catch (error) {
      console.error('포트폴리오 수정 에러:', error);
    }
  };

  const handleHomePress = () => {
    navigation.navigate('Main'); 
  };

  // 삭제를 위한 핸들러
  const handleDelete = () => {
    setShowPopup(true); // 팝업 표시
  };
  
  const confirmDelete = () => {
    deletePortfolioData();
    setShowPopup(false); // 팝업 닫기
    navigation.navigate('Main');
  };

  const cancelDelete = () => {
    setShowPopup(false); // 팝업 닫기
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleHomePress} style={styles.homeButton}>
          <AntDesign name="home" size={24} color="rgba(74, 85, 162, 1)" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>포트폴리오 관리</Text>
      </View>
      {/* <View style={styles.nav}>
        <LinearGradient
          colors={['#E2D0F8', '#A0BFE0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.linearGradient}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.navContent}>
            {navigationButtons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.navButton,
                  selectedButton === button && styles.selectedNavButton,
                ]}
                onPress={() => handleButtonPress(button)}
              >
                <Text style={styles.navButtonText}>{button.title}</Text>
                <Text style={styles.portfolioNavTitle}>{button.subTitle}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.navButtonPlus} onPress={addNavigationButton}>
              <Text style={styles.navButtonTextPlus}>추가</Text>
            </TouchableOpacity>
          </ScrollView>
        </LinearGradient>
      </View> */}

      <View style={styles.main}>
        <View style={styles.portfolioInfo}>
          {isEditMode ? ( // 편집 모드일 때
            <TextInput
              style={styles.portfolioName}
              value={editedTitle}
              onChangeText={handleTitleChange}
             />
            ) : ( // 편집 모드가 아닐 때
           <Text style={styles.portfolioName}>{portfolioData.title}</Text>
           )}
          <TouchableOpacity style={styles.editButton} onPress={toggleEditMode}>
            <Text
            style={styles.editButtonText}
            onPress={isEditMode ? handleSaveButtonClick : handleEditButtonClick}
            >{isEditMode ? '취소' : '수정'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{user.name} 수정 </Text>
        <Text style={styles.infoLabel}>포트폴리오 제목</Text>
        {isEditMode ? ( // 편집 모드일 때
        <TextInput
          style={styles.infoInput}
          value={editedTitle}
          // onChangeText={handleTitleChange}
          onChangeText={setEditedTitle}
        />
      ) : ( // 편집 모드가 아닐 때
        <Text style={styles.infoInput}>{portfolioData.title}</Text>
      )}
        <Text style={styles.infoLabel}>포트폴리오 링크</Text>
        {isEditMode ? ( // 편집 모드일 때
        <TextInput
          style={styles.infoInput}
          value={editedSubTitle}
          // onChangeText={handleSubTitleChange}
          onChangeText={setEditedSubTitle}
        />
      ) : ( // 편집 모드가 아닐 때
        <Text style={styles.infoInput}>{portfolioData.urlLink}</Text>
      )}
        <Text style={styles.infoLabel}>내용</Text>
        {isEditMode ? ( // 편집 모드일 때
        <TextInput
          style={styles.bigInfoInput}
          multiline
          numberOfLines={4}
          value={editedContent}
          // onChangeText={handleContentChange}
          onChangeText={setEditedContent}
          editable={isEditMode}
        />
      ) : ( // 편집 모드가 아닐 때
        <Text style={styles.bigInfoInput}>{portfolioData.description}</Text>
      )}

          {deleteButtonVisible && (
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>삭제</Text>
         </TouchableOpacity>
          )}

          <Modal
        visible={showPopup}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text>이 포트폴리오를 삭제하시겠습니까?</Text>
            <Button title="예" onPress={confirmDelete} />
            <Button title="아니오" onPress={cancelDelete} />
          </View>
        </View>
      </Modal>

      
            {isEditMode && (
              <LinearGradient
              colors={['#E2D0F8', '#A0BFE0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.saveButton]} // Combine styles
              >
                
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveButton}>
            <Text style={styles.saveButtonText}>저장하기</Text>
          </TouchableOpacity>
          </LinearGradient>
        )}
          

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
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
    marginBottom: 30,
    textAlignVertical: 'top',
  },
  saveButton: {
    // backgroundColor: 'rgba(160, 191, 224, 1)',
    height:70,
    borderRadius: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    // marginTop: 30,
    width: '60%',
    position: 'relative',
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