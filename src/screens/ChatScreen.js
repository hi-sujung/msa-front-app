import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_URL = 'http://3.39.104.119:8000/chatbot/getanswer?question=';

const ChatScreen = () => {
  const navigation = useNavigation();

  const [messages, setMessages] = useState([]); // Initialize with an empty array
  const [inputText, setInputText] = useState('');

  const handleSendMessage = async () => {
    if (inputText.trim() === '') {
      return;
    }
  
    // Add user message
    const updatedMessages = [...messages, { text: inputText, user: 'user' }];
  
    try {
      const response = await axios.get(`${API_URL}${inputText}`);
      if (response.status === 200) {
        // Add bot message
        updatedMessages.push({ text: response.data.answer, user: 'bot' });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  
    setMessages(updatedMessages);
    setInputText('');
  };  
  
  
  
  
  


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ChatBot</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.backButton}>
          <Text>뒤로가기</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.mainView}>
          {messages.map((message, index) => (
            <View
              key={index}
              style={
                message.user === 'user' ? styles.userBubble : styles.otherBubble
              }
            >
              {message.user === 'bot' && (
                <View style={styles.profileImage}>
                  <Icon name="android" style={styles.robotIcon} />
                </View>
              )}
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="무엇을 도와드릴까요?"
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendMessage}
        >
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>


    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1, 
    backgroundColor: '#D1CCF0',
    padding: 20,
    paddingTop:40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  backButton: {
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: '#EDEDED',
    borderRadius: 10,
  },
  contentContainer: {
    paddingTop: 80, 
    paddingBottom: 60, 
  },
  mainView: {
    flex: 1,
    padding: 20,
  },
  userBubble: {
    alignSelf: 'flex-end',
    width: '60%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#EDEDED',
    marginBottom: 10,
  },
  otherBubble: {
    flexDirection: 'row',
    alignItems: 'top',
    width: '70%',
    padding: 10,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#EBDFFA',
    marginBottom: 10,
  },
  messageText: {
    marginLeft:10,
    width:'80%',
    alignItems: 'center',
    textAlign:'left',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#C9D0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  robotIcon: {
    fontSize: 20,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#EDEDED',
    backgroundColor: 'white',
  },
  inputText: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#EDEDED',
    padding: 10,
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    marginLeft: 10,
  },
});

export default ChatScreen;