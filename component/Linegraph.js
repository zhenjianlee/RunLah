import { LineChart, ProgressChart } from "react-native-chart-kit";

import { View, StyleSheet, StatusBar, Dimensions, Text } from "react-native";

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 1, 
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

const graphStyle={
    marginVertical: 8,
    borderRadius: 16,
}

export default function Linegraph({ arrayAcc }) {
  return (
    <View style={styles.viewcontainer}>
      <Text>Acceleration Logger</Text>
      <LineChart
        data={{
            labels: [],
            datasets: [
              {
                data: arrayAcc
              }
            ]
          }}
        width={Dimensions.get("window").width-50}
        height={300}
        chartConfig={chartConfig}
        style={graphStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewcontainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
