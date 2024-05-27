import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native"; // Import TouchableOpacity
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "./../utils/AuthContext";

const API_URL = "http://10.0.2.2:8083/notice/univactivity/id";
const R_API_URL = "http://10.0.2.2:8080/recommend/univ?activity_name=";

const LIKE_URL = "http://10.0.2.2:8083/notice/univactivity/like";
const LIKECANCEL_URL =
  "http://10.0.2.2:8083/notice/univactivity/likecancel";

const ATTEND_URL = "http://10.0.2.2:8083/notice/univactivity/check";
const ATTENDCANCEL_URL =
  "http://10.0.2.2:8083/notice/univactivity/check-cancel?id=";

export default function ActivityScreen({ route }) {
  const [initialLikedState, setInitialLikedState] = useState(false);
  const [heartFilled, setHeartFilled] = useState("");
  const [attendFilled, setAttendFilled] = useState("");
  const { activityId } = route.params;
  const [activityData, setActivityData] = useState({});
  const [recActivityData, setRecActivityData] = useState([]);
  const { token, user } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    fetchActivityDetail();
    fetchRecActivityDetail();
  }, []);

  const fetchActivityDetail = async () => {

    try {
      const response = await axios.get(`${API_URL}?actId=${activityId}&memberId=${user.email}`);
      if (response.status === 200) {
        const data = response.data;
        setActivityData(data);
        setHeartFilled(data.isLiked === 1);
        setAttendFilled(data.participated === 1);
      }
    } catch (error) {
      console.log(user.email)
      console.error("Error fetching activity detail:", error);
    }
  };

  // 좋아요 버튼
  const toggleHeart = async () => {

    console.log(activityId);
    if (heartFilled === false) {
      try {
        const response1 = await axios.post(
          `${LIKE_URL}?memberId=${user.email}&actId=${activityId}`
        );
        if (response1.status === 200) {
          console.log(response1.data);
          setHeartFilled(true);
        }
      } catch (error) {
        console.error("Error fetching like:", error);
      }
    } else {
      try {
        const response2 = await axios.delete(`${LIKECANCEL_URL}??memberId=${user.email}&id=${activityId}`);
        if (response2.status === 200) {
          console.log(response2.data);
          setHeartFilled(false);
        }
      } catch (error) {
        console.error("Error fetching delete like cancel:", error);
      }
    }

    navigation.navigate("SchoolActivity", { activityId: activityData.id });
  };

  // 참여 버튼
  const toggleAttend = async () => {

    console.log(activityId);
    if (attendFilled === false) {
      try {
        const response1 = await axios.post(
          `${ATTEND_URL}?actId=${activityId}&memberId=${user.email}`
        );
        if (response1.status === 200) {
          console.log(response1.data);
          setAttendFilled(true);
        }
      } catch (error) {
        console.error("Error fetching attendance info:", error);
      }
    } else {
      try {
        const response2 = await axios.delete(
          `${ATTENDCANCEL_URL}${activityId}&memberId=${user.email}`
        );
        if (response2.status === 200) {
          console.log(response2.data);
          setAttendFilled(false);
        }
      } catch (error) {
        console.error("Error fetching delete attendance info:", error);
      }
    }

    navigation.navigate("SchoolActivity", { activityId: activityData.id });
  };

  // Frommated Content
  const handleReplace = () => {
    if (activityData && activityData.content) {
      return activityData.content.replaceAll("\\n", "\n");
    } else {
      console.log("activityData or content is undefined");
      return "";
    }
  };
  const formattedContent = handleReplace();

  // Get List of Recommend System
  const fetchRecActivityDetail = async () => {
    try {
      const response = await axios.get(`${R_API_URL}${activityId}`);
      if (response.status === 200) {
        setRecActivityData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching Rec activity detail:", error);
    }

    navigation.navigate("SchoolActivity", { activityId: activityData.id });
  };

  const handleActListPress = () => {
    navigation.navigate("SchoolActList");
  };

  const handleActivityPress = () => {
    navigation.navigate("SchoolActivity");
  };

  const handleHomePress = () => {
    navigation.navigate("Main");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#E2D0F8", "#A0BFE0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.linearGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleHomePress} style={styles.homeButton}>
            <AntDesign name="home" size={24} color="rgba(74, 85, 162, 1)" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleActListPress}>
            <Text style={styles.headerTitle}>게시물 목록</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={styles.nav}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.navContent}
        >
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
              <Text style={styles.activityCategory}>공지사항</Text>
              {/* <Text style={styles.activityDday}>D-10</Text> */}
            </View>
            <ScrollView>
              <Text style={styles.activityItemTitle}>{activityData.title}</Text>
              <Text style={styles.activityDescription}>
                게시일: {activityData.startDate}
              </Text>
              <Text style={styles.activitySubTitle}>{activityData.link}</Text>
              <Text style={styles.activityDescription}>
                {activityData.postDepartment}
              </Text>
            </ScrollView>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.heartButton} onPress={toggleHeart}>
            <AntDesign
              name={heartFilled ? "heart" : "hearto"}
              size={20}
              color={heartFilled ? "red" : "black"}
            />
          </TouchableOpacity>
          
          {/* 참여 버튼 */}
          <TouchableOpacity
            style={[
              styles.attendButton,
              {
                backgroundColor: attendFilled
                  ? "grey"
                  : "rgba(153, 153, 255, 0.3)",
              },
            ]}
            onPress={toggleAttend}
          >
            <Text
              style={[
                styles.buttonText,
                { color: attendFilled ? "black" : "white" },
              ]}
            >
              {attendFilled ? "참여 취소" : "참여"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 추천 게시물 */}
        <View style={styles.recommended}>
          <Text style={styles.recommendedTitle}>추천 게시물</Text>
          <ScrollView>
            {recActivityData.map((item) => (
              <TouchableOpacity
                style={styles.recommendedItem}
                onPress={() =>
                  navigation.push("SchoolActivity", {
                    activityId: item.univ_activity_id,
                  })
                }
              >
                <Text style={styles.recommendedItemTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
    borderBottomColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  homeButton: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  nav: {
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    overflow: "hidden",
  },
  navContent: {
    alignItems: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  navButton: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  navButtonText: {
    color: "rgba(74, 85, 162, 1)",
    fontWeight: "bold",
  },
  main: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "white",
  },
  activityList: {
    flexDirection: "column",
    alignItems: "stretch",
    // height: 1200, // Adjusted height to make room for recommended items
  },
  activityItem: {
    width: "100%",
    backgroundColor: "rgba(226, 208, 248, 0.3)",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  activityDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  activityCategory: {
    fontWeight: "bold",
    color: "rgba(74, 85, 162, 1)",
  },
  activityDday: {
    fontWeight: "bold",
  },
  activityItemTitle: {
    paddingTop: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  activitySubTitle: {
    fontSize: 14,
    color: "rgba(74, 85, 162, 1)",
    marginTop: 5,
    marginBottom: 5,
  },
  activityDescription: {
    paddingTop: 10,
    fontSize: 14,
  },
  recommended: {
    height: 300,
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 20, // Added paddingHorizontal to center the recommended items
  },
  recommendedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recommendedItem: {
    backgroundColor: "rgba(226, 208, 248, 0.3)",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 5,
  },
  recommendedItemTitle: {
    fontWeight: "bold",
    fontSize: 14,
  },
  recommendedItemDate: {
    fontSize: 12,
    color: "rgba(74, 85, 162, 1)",
  },
  heartButton: {
    marginTop: 10,
    // alignItems: "flex-end",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10, // 버튼들 사이의 간격 조절
  },
  attendButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20, // 둥근 모서리
    elevation: 5, // 그림자
  },
});
