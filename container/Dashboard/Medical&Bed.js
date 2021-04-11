import React, { Component, useEffect, useState, } from 'react'
import { ActivityIndicator, Text, View, StyleSheet, Modal, TouchableOpacity, } from 'react-native'
import { ScrollView, } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';


const MedicalBed = () => {
   const [isLoading, setLoading] = useState(true);
   const [data, setData] = useState([]);
   const [modalData, setModalData] = useState({ isOpen: false, selectedItem: null });
   const [pickerSelectedValue, setPickerSelectedValue] = useState("STATES");
   const [pickerSelected, setPickerSelected] = useState("OWNERSHIP");
   const [singleState, setSingleState] = useState('');
   const [ownerShip, setOwnerShip] = useState('');

   let SingleStates = new Set(singleState);
   console.log("set", Array.from(SingleStates));

   let OwnerShip = new Set(ownerShip);
   console.log("set", OwnerShip + Array.from(OwnerShip));

   useEffect(() => {
      async function fetchData() {
         try {
            let response = await fetch(
               'https://api.rootnet.in/covid19-in/hospitals/medical-colleges'
            );
            let json = await response.json();
            console.log(json)
            setData(json);
            setSingleState(json["data"].medicalColleges.map((value) => (value.state)));
            setOwnerShip(json["data"].medicalColleges.map((value) => (value.ownership)))
            setLoading(false);
         } catch (error) {
            console.error(error);
         }
      }
      fetchData();
   }, []);


   // const ModalScreen = (props) => {
   //     console.log(props)
   //     return (
   //         <View style={styles.container}>
   //             <Modal
   //                 animationType="slide"
   //                 transparent={true}
   //                 visible={props.modalvisible}
   //                 onRequestClose={() => {
   //                     props.onClose()
   //                     console.log("Modal has been closed.");
   //                 }}
   //             >
   //                 <View style={styles.centeredView}>
   //                     <View style={styles.modalheader}>
   //                         <TouchableOpacity
   //                             style={styles.modalclose}
   //                             onPress={() => {
   //                                 props.onClose();
   //                             }}
   //                         >
   //                             <Text style={styles.textStyle}>Hide Modal</Text>
   //                         </TouchableOpacity>
   //                     </View>
   //                         <View style={{flex: 1,  margin: 10, justifyContent: 'space-around',}}>
   //                             <Text style={styles.modalText}>ruralHospitals: {props.item.ruralHospitals}</Text>
   //                             <Text style={styles.modalText}>ruralBeds: {props.item.ruralBeds}</Text>
   //                             <Text style={styles.modalText}>totalBeds: {props.item.totalBeds}</Text>
   //                             <Text style={styles.modalText}>totalHospitals: {props.item.totalHospitals}</Text>
   //                             <Text style={styles.modalText}>urbanBeds: {props.item.urbanBeds}</Text>
   //                             <Text style={styles.modalText}>urbanHospitals: {props.item.urbanHospitals}</Text>

   //                         </View>
   //                 </View>
   //             </Modal>
   //         </View>
   //     )
   // }


   return (
      isLoading ?
         <ActivityIndicator size="large" color="#00ff00" /> :
         <View style={styles.container}>

            <ScrollView horizontal={true}
               style={styles.smallscroll}>
               {/* {Object.entries(data.summary).map((summary, key) => (
                        <TouchableOpacity
                            style={styles.smallblock}
                            key={key}
                        // onPress={() => { console.log('cdscsd'), setModalData({ isOpen: true, selectedItem: states }) }}
                        >
                            <Text style={styles.smalltext}>{summary[0]}</Text>
                            <Text style={styles.smalltext}>{summary[1]}</Text>
                        </TouchableOpacity>
                    ))} */}
            </ScrollView>

            <Text>CHOOSE STATES</Text>
            <Picker
               selectedValue={pickerSelectedValue}
               // mode= {'dropdown'}
               prompt={'STATE'}
               style={{ height: 50, width: 150 }}
               onValueChange={(itemValue, itemPosition) => setPickerSelectedValue(itemValue)}
            >
               {Array.from(SingleStates).map((states, key) => (
                  <Picker.Item key={key} label={states} value={states} />
               ))}

            </Picker>

            <Text>CHOOSE OWNERSHIP</Text>

            <Picker
               selectedValue={pickerSelected}
               // mode= {'dropdown'}
               prompt={'OWNERSHIP'}
               style={{ height: 50, width: 150 }}
               onValueChange={(itemValue, itemPosition) => setPickerSelected(itemValue)}
            >
               {Array.from(OwnerShip).map((own, key) => (
                  <Picker.Item key={key} label={own} value={own} />
               ))}

            </Picker>


            <ScrollView style={styles.scroll}>
               {data["data"].medicalColleges.map((states, key) => (
                  pickerSelectedValue == states.state && pickerSelected == states.ownership && <TouchableOpacity
                     style={styles.block}
                     key={key}
                     onPress={() => { console.log('cdscsd'), setModalData({ isOpen: true, selectedItem: states }) }}
                  >
                     <Text style={styles.text}>name: {states.name}</Text>
                     <Text style={styles.text}>city: {states.city}</Text>
                     <Text style={styles.text}>hospitalBeds: {states.hospitalBeds}</Text>
                     <Text style={styles.text}>admissionCapacity: {states.admissionCapacity}</Text>
                     <Text style={styles.text}>state: {states.state}</Text>
                  </TouchableOpacity>
               ))}
            </ScrollView>

            {modalData.isOpen && <ModalScreen
               modalVisible={modalData.isOpen}
               item={modalData.selectedItem}
               onClose={() => setModalData({ isOpen: false, selectedItem: null })}
            />}
         </View>
   )

}

export default MedicalBed

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
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
   smalltext: {
      fontSize: 24,
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
      marginTop: 30,
      // height: 50,
      // width: '100%',
      marginHorizontal: 4,
      marginVertical: 6,
      justifyContent: 'center',
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