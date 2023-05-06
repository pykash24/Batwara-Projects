import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { ContactContext } from '../../context/ContactContext';
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from '../../store/slice/ExpenseDetailSlice';

const Contact = ({ }) => {
  const { selectedData, setSelectedData, contact } = useContext(ContactContext);
  const onSelect = (data) => {
    if (selectedData) {
      setSelectedData([...selectedData, {...data}])
    }
    else {
      setSelectedData([data])
    }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => onSelect(contact)}>
      <View style={styles.imgCon}>
        <View style={styles.placeholder}>
          <Text style={styles.txt}>{contact?.displayName?.[0] ? contact?.displayName?.[0] : "Default"}</Text>
        </View>
      </View>
      <View style={styles.contactDat}>
        <Text style={styles.name}>
          {contact?.displayName} 
          {contact?.familyName}
        </Text>
        <Text style={styles.phoneNumber}>
          {contact?.phoneNumbers[0]?.number ? contact?.phoneNumbers[0]?.number : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#d9d9d9',
  },
  imgCon: {},
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactDat: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  txt: {
    fontSize: 18,
    color: Colors.black
  },
  name: {
    fontSize: 16,
    color: Colors.black
  },
  phoneNumber: {
    color: '#888',
  },
});

export default Contact