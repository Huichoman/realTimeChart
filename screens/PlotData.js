import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Button,
} from "react-native";

import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryClipContainer,
} from "victory-native";

export const PlotData = ({ fbData }) => {
  const [chartData, setChartData] = useState([]);

  //   useEffect(() => {
  //     setTimeout(() => {}, 1000);
  //     addData();
  //   }, []);
  //
  useEffect(() => {
    const timer = setTimeout(() => addData(), 100);
    return () => clearTimeout(timer);
  }, [fbData]);

  const addData = () => {
    let d = [];
    d = [...chartData];
    if (d.length > 0) {
      d.push(fbData[fbData.length - 1]);
      if (d.length > 20) d.shift();
      setChartData([...d]);
    } else {
      if (fbData.length > 20) setChartData(fbData.slice(-20));
      else setChartData([...fbData]);
    }
  };

  return (
    <View>
      {/* <Text>{JSON.stringify(chartData)}</Text> */}
      {/* <Text>{JSON.stringify(fbData)}</Text> */}
      <VictoryChart theme={VictoryTheme.material} height={200}>
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" },
          }}
          data={chartData}
        />
      </VictoryChart>
      <Button onPress={addData} title="Add" />
    </View>
  );
};
