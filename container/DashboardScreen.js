import React, { Component, useEffect, useState, } from 'react'
import { ActivityIndicator, Text, View, StyleSheet, Modal, TouchableOpacity, } from 'react-native'
import { ScrollView, } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';


const DashboardScreen = ({ navigation }) => {
   // console.log("navigation", navigation);
   const [isLoading, setLoading] = useState(true);
   const [data, setData] = useState([]);
   const [modalData, setModalData] = useState({ isOpen: false, selectedItem: null });
   const [pickerSelectedValue, setPickerSelectedValue] = useState("STATES");
   const [pickerSelected, setPickerSelected] = useState("OWNERSHIP");
   const [singleState, setSingleState] = useState('');
   const [ownerShip, setOwnerShip] = useState('');

   let SingleStates = new Set(singleState);
   // console.log("set", Array.from(SingleStates));

   let OwnerShip = new Set(ownerShip);
   // console.log("set", OwnerShip + Array.from(OwnerShip));



   return (
      <View style={styles.container}>
         <View style={{ flexDirection: 'row', justifyContent:'space-evenly',marginTop: 8,  width: '100%' }}>
            <Text style={styles.text}>Hospital DashBoard</Text>
            <Text style={{fontStyle: 'italic', fontWeight: '200', textAlignVertical: 'center', borderWidth: 1, padding: 5, borderRadius: 10}}
            onPress={() => navigation.navigate('notification')}>notification</Text></View>

         <TouchableOpacity
            onPress={() => navigation.navigate('hospitalBed')} style={styles.block}>
            <Text style={styles.largetext}>Hospital and Beds</Text>
            <Text>click here...</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => navigation.navigate('MedicalBed')} style={styles.block}>
            <Text style={styles.largetext}>Medical and Beds</Text>
            <Text>click here...</Text>
         </TouchableOpacity>
      </View>
   )

}

export default DashboardScreen

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      // justifyContent: 'center',
   },
   scroll: {
      width: '100%',
      marginTop: 10
   },
   smallscroll: {
      width: '100%',

   },
   text: {
      fontSize: 24,
      fontWeight: 'bold'

   },
   largetext: {
      fontSize: 30,
      // fontWeight: 'bold'

   },
   block: {
      shadowOpacity: 0.5,
      shadowRadius: 2,
      shadowColor: 'blue',
      shadowOffset: { height: 1, width: 1 },
      elevation: 3,
      backgroundColor: 'orange',
      borderRadius: 6,
      marginBottom: 10,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 20,
      height: 350,
      width: '100%',
      marginHorizontal: 4,
      marginVertical: 6,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10
   },
   smallblock: {
      shadowOpacity: 0.5,
      shadowRadius: 2,
      shadowColor: 'blue',
      shadowOffset: { height: 1, width: 1 },
      elevation: 5,
      backgroundColor: 'darkorange',
      borderRadius: 12,
      marginBottom: 25,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 30,
      height: 80,
      justifyContent: 'center',
      padding: 20
   },
   centeredView: {
      flex: 1,
      backgroundColor: 'white',
      marginLeft: 10,
      marginRight: 10,
      marginTop: 15,
      marginBottom: 15,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
         width: 2,
         height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 7,

   },
   modalView: {
      // borderWidth: 1,
      borderColor: 'red',
      margin: 20,
      backgroundColor: "#fb5b5a",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 5
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
   },
   modalheader: {
      borderRadius: 10,
      height: 50,
      alignSelf: 'stretch',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'white',
   },
   modalclose: {
      alignItems: 'flex-end',
      justifyContent: 'center',
      borderRadius: 10,
      marginTop: 10,
      marginLeft: 5,
      height: 30,
      width: 55,
      marginRight: 20,
   },
   modalText: {
      // marginBottom: 15,
      textAlign: "center",
      fontSize: 40,
      // color: 'white',
      fontWeight: "500",
      fontFamily: 'san-serif',
      borderWidth: 3,
      borderRadius: 8,
      height: 50,
      // justifyContent: 'space-between'
   }
})