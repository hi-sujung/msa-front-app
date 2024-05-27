import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:8083/notice/externalact/';
const SEARCH_API_URL = 'http://10.0.2.2:8083/notice/externalact/keyword';

export default function ActListScreen({route}) {
    //const searchData = route.params;
    const [activity, setActivity] = useState([]);
    const [keyword, setKeyword] = useState("");
    const navigation = useNavigation(); // Initialize navigation

    useEffect(() => {
        fetchActivityData();
      }, []);
    
      const fetchActivityData = async () => {
        if (route.params && route.params.search) {
          const k = route.params.search
          console.log(k)
          //검색한 결과
          try {
            const response = await axios.get(`${SEARCH_API_URL}?keyword=${k}`);
            if (response.status === 200) {
              setActivity(response.data); 
            }
          } catch (error) {
            console.error('Error fetching searching activity data:', error);
          }
        }
        else{
        try {
          const response = await axios.get(API_URL);
          if (response.status === 200) {
            setActivity(response.data); 
            console.log("대외활동 리스트 불러오기")
          }
        } catch (error) {
          console.error('Error fetching activity data:', error);
        }
      }
      };
    
      const handleActivityPress = () => {
        navigation.navigate('Activity');
      };

      const handleActListPress = () => {
        navigation.navigate('ActList'); 
      };

      const handleHomePress = () => {
        navigation.navigate('Main'); 
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
          <TouchableOpacity onPress={handleHomePress} style={styles.homeButton}>
            <AntDesign name="home" size={24} color="rgba(74, 85, 162, 1)" />
          </TouchableOpacity>
          <TouchableOpacity  onPress={handleActListPress}>
            <Text style={styles.headerTitle}>게시물 목록</Text>
            </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={styles.nav}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.navContent}>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.push('ActList')}>
            <Text style={styles.navButtonText}>전체</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.push('ActList', {search : '기획'})}>
            <Text style={styles.navButtonText}>기획</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.push('ActList', {search : '아이디어'})}>
            <Text style={styles.navButtonText}>아이디어</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.push('ActList', {search : '광고'})}>
            <Text style={styles.navButtonText}>광고/마케팅</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.push('ActList', {search : '사진'})}>
            <Text style={styles.navButtonText}>사진</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.push('ActList', {search : '인공지능'})}>
            <Text style={styles.navButtonText}>개발/프로그래밍</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

  

      <View style={styles.main}>
      <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            onChangeText={setKeyword}
            placeholder="제목으로 검색해보세요!"
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => navigation.push('ActList', {search : keyword})}
          >
            <Text>검색</Text>
        </TouchableOpacity>
        </View>
  {/* <ScrollView contentContainerStyle={styles.activityList}> */}
  <TouchableOpacity style={styles.navButtonPlus} onPress={() => navigation.navigate('AttendActList')}>
              <Text style={styles.navButtonTextPlus}>참여한 대외활동</Text>
            </TouchableOpacity>
    <FlatList
      data={activity}
      keyExtractor={(item) => item.id.toString()} // Assuming 'id' is a unique identifier
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.activityItem}
          onPress={() => navigation.navigate('Activity', { activityId: item.id })} // Pass the activityId to the 'Activity' screen
        >
          <View style={styles.activityDetails}>
            <Text style={styles.activityCategory}>대외활동</Text>
            {/* <Text style={styles.activityDday}>D-10</Text> */}
          </View>
          <Text style={styles.activityItemTitle}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
        {/* </ScrollView> */}
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
  navButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  navButtonText: {
    color: 'rgba(74, 85, 162, 1)',
    fontWeight: 'bold',
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
  inputText: {
    flex: 1,
    borderRadius: 1,
    backgroundColor: '#EDEDED',
    padding: 1,
    fontSize:10,
  },
  sendButton: {
    padding: 3,
    fontSize:10,
    backgroundColor: 'rgba(74, 85, 162, 1)',
    borderRadius: 5,
    marginLeft: 10,
  },
  // '참여한 대외활동' 버튼
  navButtonPlus: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom:13,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  navButtonTextPlus: {
    color: 'blue',
    fontWeight: 'bold',
  },
});