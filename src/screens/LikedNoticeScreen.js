import { View, Text,TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '../utils/AuthContext';
import { useNavigation } from '@react-navigation/native';

const UNI_API_URL = 'http://10.0.2.2:8083/notice/univactivity/like-list';
const EXT_API_URL = 'http://10.0.2.2:8083/notice/externalact/like-list';

export default function NoticeScreen() {
  const [uniLikeList, setUniLikeList] = useState([]);
  const [extLikeList, setExtLikeList] = useState([]);

  const { user, token } = useAuth(); // 현재 로그인한 유저의 user, token
  const navigation = useNavigation();

  useEffect(() => {
    fetchUniLikeData();
    fetchExtLikeData();
  }, []);

  const fetchUniLikeData = async () => {
    try {
      const response = await axios.get(`${UNI_API_URL}?memberId=${user.email}`);
      if (response.status === 200) {
        setUniLikeList(response.data); 
      }
    } catch (error) {
      console.error('Error fetching uniLike list data:', error);
    }
  };

  const fetchExtLikeData = async () => {
    try {
      const response = await axios.get(`${EXT_API_URL}?memberId=${user.email}`);
      if (response.status === 200) {
        setExtLikeList(response.data); 
      }
    } catch (error) {
      console.error('Error fetching external like list data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E2D0F8', '#A0BFE0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.linearGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.homeButton}>
            <AntDesign name="home" size={24} color="rgba(74, 85, 162, 1)" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>찜한 활동</Text>
        </View>
      </LinearGradient>

      <View style={styles.main}>
        {/* 찜한 공지사항 목록 */}
        <FlatList
  data={[...uniLikeList, ...extLikeList]}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.activityItem}
      onPress={() =>
        item.postDepartment
          ? navigation.navigate('SchoolAct', { activityId: item.id })
          : navigation.navigate('Activity', { activityId: item.id })
      }
    >
      <View style={styles.activityDetails}>
        <Text style={styles.activityCategory}>
          {item.postDepartment ? '공지사항' : '대외활동'}
        </Text>
      </View>
      <Text style={styles.activityItemTitle}>{item.title}</Text>
    </TouchableOpacity>
  )}
/>



            {/* 찜한 대외활동 목록   */}
      
        
      </View>
    </View>
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop:20,
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
  activityList: {
    flexDirection: 'column',
    alignItems: 'stretch',
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
  activityDday: {
    fontWeight: 'bold',
  },
  activityItemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  extLikeItem: {
    width: '100%',
    backgroundColor: 'rgba(226, 208, 248, 0.3)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  inputContainer: {
    width:"70%",
    height:"5%",
    marginBottom:20,
    flexDirection: 'row',
    alignItems: 'right',
    padding: 1,
    borderColor: '#EDEDED',
    backgroundColor: 'white',
  },

  sendButton: {
    padding: 3,
    fontSize:10,
    backgroundColor: 'rgba(74, 85, 162, 1)',
    borderRadius: 5,
    marginLeft: 10,
  },
});