import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DashboardScreen from './container/DashboardScreen'
import Contact from './container/Contact'
import Cases from './container/Cases'
import HospitalBed from './container/Dashboard/Hospital&Beds';
import MedicalBed from './container/Dashboard/Medical&Bed';
import Notification from './container/Notification';


function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="DashBoard" component={DashboardScreen} />
        <Stack.Screen name="hospitalBed" component={HospitalBed} />
         <Stack.Screen name="MedicalBed" component={MedicalBed} />
            <Stack.Screen name="notification" component={Notification} />
      </Stack.Navigator>
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="DashBoard" component={Home} />

        {/* <Tab.Screen name="Notification" component={Notification} /> */}
        <Tab.Screen name="CASES" component={Cases} />
        <Tab.Screen name="ContactUs" component={Contact} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
