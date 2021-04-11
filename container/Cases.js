import React, { Component, useEffect, useState } from 'react'
import { Text, View, Dimensions } from 'react-native'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

const Cases = () => {
    const [statsState, setStateState] = useState([]);
    const [testing, setTesting] = useState('');

    const STATS = statsState.map((stats, key) => {return stats['day'] })
    const mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    const months = STATS.map((month, key)=> {return mlist[new Date(month).getMonth()]});
    const MONTH = new Set(months);

    const TOTALCONFIRMEDCASES = statsState.map((stats, key) => {return stats['summary'].total });
    
    console.log("StAscsdvsdTS", statsState);
    console.log("StATS", STATS);

    useEffect(() => {
        async function fetchData() {
            try {
                let response = await fetch(
                    'https://api.rootnet.in/covid19-in/stats/history'
                );
                let json = await response.json();
                console.log(json)
                setStateState(json.data);
                // setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             let response = await fetch(
    //                 'https://api.rootnet.in/covid19-in/stats/testing/history'
    //             );
    //             let json = await response.json();
    //             console.log(json)
    //             setData(json.data.notifications);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    //     fetchData();
    // }, []);


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <Text> Confirmed Cases </Text>
            <LineChart
                data={{
                    labels: Array.from(MONTH),
                    datasets: [
                        {
                            data: [1000, 2000, 3000, 4000, 5000, 6000,]
                        }
                    ]
                }}
                width={Dimensions.get("window").width - 10} // from react-native
                height={220}
                // yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={500} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />

        </View>
    )

}

export default Cases
