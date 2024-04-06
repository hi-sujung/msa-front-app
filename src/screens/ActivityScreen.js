import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native'; // Import TouchableOpacity
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './../utils/AuthContext';

const API_URL = 'http://3.39.104.119/externalact/id';
const R_API_URL = 'http://3.39.104.119:8000/recommend/external?activity_name=';

const LIKE_URL = 'http://3.39.104.119/externalact/like'
const LIKECANCEL_URL = 'http://3.39.104.119/externalact/likecancel?id='

export default function ActivityScreen({ route }) {
    const [initialLikedState, setInitialLikedState] = useState(false);
    const [heartFilled, setHeartFilled] = useState('');
    const { activityId } = route.params;
    const [activityData, setActivityData] = useState({});
    const [recActivityData, setRecActivityData] = useState([]);
    const { token } = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
      fetchActivityDetail();
      fetchRecActivityDetail();
    }, []);


  
    const fetchActivityDetail = async () => {
        // const headers = {
        //     Authorization: `Bearer ${token}`
        //   };

        const headers = {
          Authorization: `Bearer ${token}`
        };
    

        
      try {
        const response = await axios.get(`${API_URL}?id=${activityId}`, { headers });
        if (response.status === 200) {
          setActivityData(response.data);
          console.log(response.data.isLiked);
          setInitialLikedState(response.data.isLiked === 1);
          setHeartFilled(response.data.isLiked === 1);
        }
        if (activityData.isLiked === 0) {
          setHeartFilled(false);
        }
        else if (activityData.isLiked === 1) {
          setHeartFilled(true);
        }
      } catch (error) {
        console.error('Error fetching activity detail:', error);
      }
      
    };

    
    const toggleHeart = async () => {

      const headers = {
        Authorization: `Bearer ${token}`
      };
  
      console.log(activityId)
      if (heartFilled === false) {
        try {
          console.log(heartFilled)
          const response1 = await axios.post(`${LIKE_URL}?actId=${activityId}`, null, {  headers });
        if (response1.status === 200) {
          console.log(response1.data);
          setHeartFilled(true);
        }
  
        } catch(error) {
          console.error('Error fetching like:', error);
        }
      }
      else {
        try{
        const response2 = await axios.delete(`${LIKECANCEL_URL}${activityId}`,{ headers });
        if (response2.status === 200) {
          console.log(response2.data);
          setHeartFilled(false);
        }
        }catch(error) {
          console.error('Error fetching delete like cancel:', error);
        }
      }
  
      navigation.navigate('Activity', { activityId: activityData.id })
    
    };

    // Frommated Content
    const handleReplace = () => {
      if (activityData && activityData.content) {
        return activityData.content.replaceAll('\\n', "\n");
      } else {
        console.log('activityData or content is undefined');
        return '';
      }
    };
    const formattedContent = handleReplace();

    // Get List of Recommend System
    const fetchRecActivityDetail = async () => {

    try {
      const response = await axios.get(`${R_API_URL}${activityId}`);
      if (response.status === 200) {
        setRecActivityData(response.data);
        console.log(response.data)
      }
    } catch (error) {
      console.error('Error fetching activity detail:', error);
    }
    
  };

    const handleActListPress = () => {
        navigation.navigate('ActList'); 
      };

      const handleActivityPress = (id) => {
        navigation.navigate('Activity', { activityId: id });
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
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>전체</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>기획</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>아이디어</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>브랜드/네이밍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>광고/마케팅</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>사진</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>개발/프로그래밍</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.main}>
        <ScrollView contentContainerStyle={styles.activityList}>
          <View style={styles.activityItem}>
            <View style={styles.activityDetails}>
              <Text style={styles.activityCategory}>대외활동</Text>
              {/* <Text style={styles.activityDday}>D-10</Text> */}
            </View>
            <ScrollView>
            <Text style={styles.activityItemTitle}>{activityData.title}</Text>
            <Text style={styles.activitySubTitle}>{activityData.link}</Text>
            <Text style={styles.activityDescription}>{formattedContent}</Text>
            </ScrollView>
            </View>
        </ScrollView>

        <TouchableOpacity style={styles.heartButton} onPress={toggleHeart}>
              <AntDesign
                name={heartFilled ? 'heart' : 'hearto'}
                size={20}
                color={heartFilled ? 'red' : 'black'}
              />
        </TouchableOpacity>

        {/* 추천 게시물 */}
        <View style={styles.recommended}>
          <Text style={styles.recommendedTitle}>추천 게시물</Text>
          
          {recActivityData.map(item => (
             <TouchableOpacity style={styles.recommendedItem} onPress={() => navigation.push('Activity', {activityId : item.external_act_id})}>
             <Text style={styles.recommendedItemTitle}>{item.title}</Text>
           </TouchableOpacity>
          ))}
        </View>
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
    height: '90%', // Adjusted height to make room for recommended items
  },
  activityItem: {
    width: '100%',
    height: 700, // Adjusted height for the activity item
    backgroundColor: 'rgba(226, 208, 248, 0.3)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
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
    paddingTop:10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  activitySubTitle: {
    fontSize: 14,
    color: 'rgba(74, 85, 162, 1)',
    marginBottom: 5,
  },
  activityDescription: {
    paddingTop:10,
    fontSize: 14,
  },
  recommended: {
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 20, // Added paddingHorizontal to center the recommended items
  },
  recommendedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recommendedItem: {
    backgroundColor: 'rgba(226, 208, 248, 0.3)',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 5,
  },
  recommendedItemTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  recommendedItemDate: {
    fontSize: 12,
    color: 'rgba(74, 85, 162, 1)',
  },
  heartButton: {
    // marginTop: 10,
    alignItems: 'flex-end',
  },
});