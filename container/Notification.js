import React, { Component, useEffect, useState, } from 'react'
import { ActivityIndicator, Text, View, StyleSheet, Modal, TouchableOpacity, Linking } from 'react-native'
import { ScrollView, } from 'react-native-gesture-handler';

const Notification = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [modalData, setModalData] = useState({ isOpen: false, selectedItem: null })


    console.log("notifif", data[0])
    useEffect(() => {
        async function fetchData() {
            try {
                let response = await fetch(
                    'https://api.rootnet.in/covid19-in/notifications'
                );
                let json = await response.json();
                console.log(json)
                setData(json.data.notifications);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);





    return (
        isLoading ?
            <ActivityIndicator size="large" color="#00ff00" /> :
            <View style={styles.container}>
                <View style={{ borderWidth:1, height: 50, marginBottom: 8, flexDirection: 'row', }}>
                    <View style={{ borderWidth: 1, width: "20%", justifyContent: 'center', alignItems: 'center' }}>
                        <Text>DATE</Text>
                    </View>
                    <View style={{ borderWidth: 1, width: "40%", justifyContent: 'center', alignItems: 'center' }}>
                        <Text>NOTIFICATION</Text>
                    </View>
                    <View style={{ borderWidth: 1, width: "40%", justifyContent: 'center', alignItems: 'center' }}>
                        <Text>LINK</Text>
                    </View>
                </View>
                <ScrollView style={styles.scroll}>

                    {data.map((noti, key) => (

                        <View style={{borderWidth:1, height: 150, marginBottom: 8, flexDirection: 'row', }} key={key}>
                            <View style={{ borderWidth: 1, width: "20%", justifyContent: 'center', alignItems: 'center' }}><Text>{noti.title.split(' ')[0]}</Text></View>
                            <View style={{ borderWidth: 1, width: "40%", justifyContent: 'center', alignItems: 'center' }}><Text>{noti.title.substring(11)}</Text></View>
                            <View style={{ borderWidth: 1, width: "40%", justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'blue' }} onPress={() => Linking.openURL(noti.link)}>{noti.link}</Text></View>
                        </View>

                    ))}

                </ScrollView>
            </View>
    )

}

export default Notification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    scroll: {
        // width: '100%',
        // marginTop: 10
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
        height: 50,
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
