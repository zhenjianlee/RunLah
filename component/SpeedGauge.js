import { View, Text } from "react-native";
import { Pie, Circle, Bar,} from "react-native-progress";
import { StyleSheet, TextInput, TouchableOpacity ,Alert} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";

export default function SpeedGauge({ currAcc, maxAcc, motion, runTime,setRunTime,setMaxAcc }) {
  const [duration, setDuration] = useState(60);
  const [input, setInput] = useState("");

  const changeDuration = () => {
    setDuration(parseFloat(input) * 60);
  };

  useEffect(() => {
    if (duration>0 && runTime == duration) {
      showalertWin();
    }
  }, [runTime, duration]);

  const showalertWin = () => {
    Alert.alert(
      "You Won! Congratulations!!",
      `It was very difficult, but you kept running for ${runTime} seconds at the maxium speed of ${maxAcc.toFixed(2)} ms^-2.\n\nFantastic , keep it up!`,
      [
        {
          text: "Back",
          onPress: () => {setRunTime(0);setMaxAcc(0)},
          style: "cancel",
        },
      ],
      // {
      //   cancelable: true,
      //   onDismiss: () => Alert.alert("Good job!"),
      // }
    );
  };

  return (
    <View style={styles.speedcontainer}>
      <View style={styles.innercontainer}>
        <Ionicons
          style={styles.icon}
          name={
            currAcc <= 1
              ? "bed"
              : currAcc <= 5
              ? "walk"
              : currAcc <= 10
              ? "bicycle"
              : currAcc <= 15
              ? "car-sport"
              : "rocket"
          }
        />
        <Text>
          {currAcc <= 1
            ? "Why did you stop? Try again!"
            : currAcc <= 5
            ? "You have to go faster!"
            : currAcc <= 10
            ? "Ok! Keep it up!"
            : currAcc <= 15
            ? " That's fast!"
            : "Awesome work!"}{" "}
        </Text>
      </View>

      <View style={styles.wordcontainer}>
        <Text style={styles.heading}>Target:</Text>
        <Text style={styles.timer}>
          {duration && duration != null
            ? Math.floor(duration / 60).toString()
            : "0"}{" "}
          m
        </Text>
        <Text style={styles.timer}>
          {duration && duration != null ? (duration % 60).toString() : "0"} s
        </Text>
        <Text style={styles.heading}>RunTime:</Text>
        <Text style={styles.timer}>
          {runTime && runTime != null
            ? Math.floor(runTime / 60).toString()
            : "0"}{" "}
          m
        </Text>
        <Text style={styles.timer}>
          {runTime && runTime != null ? (runTime % 60).toString() : "0"} s
        </Text>
      </View>

      <Bar
        animated={true}
        progress={runTime / duration}
        borderWidth={3}
        borderRadius={3}
        height={5}
        width={300}
      />

      <View style={styles.innercontainer}>
        <Text style={styles.heading}>
          Acceleration: {Math.round(currAcc)} ms^-2
        </Text>
        <Circle
          size={125}
          progress={currAcc / 20}
          borderWidth={3}
          animated={true}
          showsText={true}
        />
      </View>

      <View style={styles.innercontainer}>
        <Text style={styles.heading}>
          Max Acceleration: {Math.round(maxAcc)} ms^-2
        </Text>
        <Text>
          {maxAcc <= 1
            ? "Even a tree can outrun you"
            : maxAcc <= 5
            ? "Snail on a stroll"
            : maxAcc <= 10
            ? "Running chicken"
            : maxAcc <= 15
            ? "Cheetah on the loose"
            : "Superman"}{" "}
        </Text>
        <Pie
          size={125}
          progress={maxAcc / 20}
          borderWidth={3}
          animated={true}
          showsText={true}
        />
      </View>

      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.input}
          value={input}
          placeholder={input}
          keyboardType="numeric"
          onChangeText={(text) => setInput(text)}
        />
        <TouchableOpacity
          onPress={changeDuration}
          style={[styles.button, styles.middleButton]}
        >
          <Text>Set runtime (minutes)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  speedcontainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  innercontainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
  },
  inputcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  wordcontainer: {
    fex: 1,
    flexDirection: "row",
    gap: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 16,
  },
  timer: {
    fontWeight: "bold",
    color: "blue",
    fontSize: 18,
  },
  icon: {
    fontSize: 80,
  },
  input: {
    height: 40,
    margin: 12,
    width: 100,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 3,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
});
