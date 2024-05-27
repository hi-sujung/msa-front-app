import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:8083/notice/univactivity/';
const SEARCH_API_URL = 'http://10.0.2.2:8083/univactivity/keyword?keyword=';
const SEARCHD_API_URL = 'http://10.0.2.2:8083/univactivity/department?department=';
const SEARCHALL_API_URL = 'http://10.0.2.2:8083/univactivity/department/keyword';

export default function SchoolActListScreen({route}) {
    const [activity, setActivity] = useState([]);
    const navigation = useNavigation(); // Initialize navigation
    const [keyword, setKeyword] = useState('');
    const [department1, setDepartment1] = useState('');

    useEffect(() => {
        fetchActivityData();
      }, []);
    
      const fetchActivityData = async () => {


        if (route.params && route.params.search && route.params.department1) {
            const k = route.params.search
            const d = route.params.department1
            console.log(k)
            //검색한 결과
            try {
              const response = await axios.get(`${SEARCHALL_API_URL}?department=${d}&&keyword=${k}`);
              if (response.status === 200) {
                setActivity(response.data);
              }
            } catch (error) {
              console.error('Error fetching searching activity data:', error);
            }
          }
        else if (route.params && route.params.search) {
            const k = route.params.search
            console.log(k)
            //검색한 결과
            try {
              const response = await axios.get(`${SEARCH_API_URL}${k}`);
              if (response.status === 200) {
                setActivity(response.data);
              }
            } catch (error) {
              console.error('Error fetching searching activity data:', error);
            }
          }
          else if (route.params && route.params.department1) {
            const k = route.params.search
            console.log(k)
            //검색한 결과
            try {
              const response = await axios.get(`${SEARCHD_API_URL}${d}`);
              if (response.status === 200) {
                setActivity(response.data);
              }
            } catch (error) {
              console.error('Error fetching searching activity data:', error);
            }
          }
        else {
        try {
          const response = await axios.get(API_URL);
          if (response.status === 200) {
            setActivity(response.data); 
          }
        } catch (error) {
          console.error('Error fetching activity data:', error);
        }
    }
      };
    
      const handleActivityPress = () => {
        navigation.navigate('SchoolActivity');
      };

      const handleActListPress = () => {
        navigation.navigate('SchoolActList'); 
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
        </ScrollView>
      </View>

      <View style={styles.main}>
      <View style={styles.inputContainer}>
      <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>학과</Text>
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
          <TextInput
            style={styles.inputText}
            onChangeText={setKeyword}
            placeholder="제목으로 검색해보세요!"
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => navigation.push('SchoolActList', {search : keyword})}
          >
            <Text>검색</Text>
        </TouchableOpacity>
        </View>

        
  {/* <ScrollView contentContainerStyle={styles.activityList}> */}
    <FlatList
      data={activity}
      keyExtractor={(item) => item.id.toString()} // Assuming 'id' is a unique identifier
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.activityItem}
          onPress={() => navigation.navigate('SchoolActivity', { activityId: item.id })} // Pass the activityId to the 'Activity' screen
        >
          <View style={styles.activityDetails}>
            <Text style={styles.activityCategory}>공지사항</Text>
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
});