import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import TabContainer from "../../components/TabContainer";
import { Colors } from "../../constants/Colors";
import { Friends } from "../../data/friends/Friends";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

const FriendScreen = () => {

  const navigation=useNavigation();

  useEffect(()=>{
    navigation.setOptions({
      headerLargeTitle:true,
      headerTitle:"Friends",
      headerRight:()=>(
        <TouchableOpacity>
          <Text></Text>
        </TouchableOpacity>
      )
    })

  },[navigation])
  const Item = ({ name, nickname, gender }) => (
    <View style={styles.flexBetween}>
      <View style={styles.flexRow}>
        <View style={styles.circle}>
          <Text style={styles.text}>{name.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.smGraytext}>{name}</Text>
        <Text style={styles.smGraytext}>{`(${nickname})`}</Text>
      </View>
    </View>
  );
  return (
    <TabContainer>
      <View style={styles.container}>
        <View style={styles.child1}>
          <TouchableOpacity onPress={() => navigation.navigate('newGroup')} >
            <View style={styles.flexRow}>
              <View style={styles.circlePurple}>
                <Ionicons name="profile" color={Colors.white} size={20} />
              </View>
                <Text style={styles.smGraytext}>New group</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.smGraytext}>Contacts on Batwara</Text>
          <FlatList
            data={Friends}
            renderItem={({ item }) => <Item name={item.name} nickname={item.nickname} gender={item.gender} />}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </TabContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.bgColor,
  },
  child1: {
    flex: 1,
    // justifyContent: 'flex-start',
    gap: 15
  },

  flexBetween: {
    flex: 1,
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    margin: 5
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circlePurple:{
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smGraytext: {
    fontWeight: "bold",
    fontSize: 15,
    color: Colors.gray,
    textAlign: 'left'
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.white,
  },
});

export default FriendScreen;