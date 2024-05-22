import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '../utils/AuthContext';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'http://10.0.2.2:8080/notice/externalact/checked-list';
const AUTO_API_URL = 'http://10.0.2.2:8080/notice/portfolio/create-by-ai';

export default function NoticeScreen() {
  const [attendList, setAttendList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [careerKeyword, setCareerKeyword] = useState('');
  const [portfolioTitle, setPortfolioTitle] = useState('');
  const { user, token } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    fetchAttendData();
  }, []);

  const fetchAttendData = async () => {
    try {
      const response = await axios.get(`${API_URL}?memberId=20211021@sungshin.ac.kr`);
      // const response = await axios.get(`${API_URL}?memberId=${user.email}`);
      if (response.status === 200) {
        setAttendList(response.data);
      }
    } catch (error) {
      console.error('Error fetching attended list data:', error);
    }
  };

  const createAutoPortfolio = async () => {
    try {
      const response = await axios.post(`${AUTO_API_URL}?memberId=20211021@sungshin.ac.kr&careerField=${careerKeyword}&title=${portfolioTitle}`);
      // const response = await axios.post(`${AUTO_API_URL}?memberId=${user.email}&careerField=${careerKeyword}&title=${portfolioTitle}`);
      if (response.status === 200) {
        console.log("포트폴리오 자동 생성 완료");
      }
    } catch (error) {
      console.error('Error Auto-Creating portfolio data:', error);
    }
  };

  const handleHomePress = () => {
    navigation.navigate('Main'); 
  };

  const handleCreatePortfolioPress = () => {
    setModalVisible(true);
  };

  const handleModalSubmit = () => {
    createAutoPortfolio();
    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <LinearGradient
          colors={['#E2D0F8', '#A0BFE0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.linearGradient}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={handleHomePress} style={styles.homeButton}>
              <AntDesign name="home" size={24} color="rgba(74, 85, 162, 1)" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>참여한 대외활동 목록</Text>
          </View>
        </LinearGradient>

        <View style={styles.main}>
          <TouchableOpacity style={styles.navButtonPlus} onPress={handleCreatePortfolioPress}>
            <Text style={styles.navButtonTextPlus}>포트폴리오 자동 생성</Text>
          </TouchableOpacity>
          <FlatList
            data={attendList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.activityItem}
                onPress={() => navigation.navigate('Activity', { activityId: item.id })}
              >
                <View style={styles.activityDetails}>
                  <Text style={styles.activityCategory}>참여한 대외활동</Text>
                </View>
                <Text style={styles.activityItemTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>1. 포트폴리오 제목을 입력하세요.</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="제목 입력"
              value={portfolioTitle}
              onChangeText={setPortfolioTitle}
            />
            <Text style={styles.modalText}>2. 커리어 키워드를 입력하세요.</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="키워드 입력"
              value={careerKeyword}
              onChangeText={setCareerKeyword}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleModalSubmit}>
                <Text style={styles.modalButtonText}>확인</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleModalCancel}>
                <Text style={styles.modalButtonText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  homeButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  navButtonPlus: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 13,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  navButtonTextPlus: {
    color: 'blue',
    fontWeight: 'bold',
  },
  activityItem: {
    backgroundColor: 'rgba(226, 208, 248, 0.3)',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  activityDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  activityCategory: {
    fontWeight: 'bold',
    color: 'rgba(74, 85, 162, 1)',
  },
  activityItemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalInput: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    margin: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
