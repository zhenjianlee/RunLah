import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { DeviceMotion } from "expo-sensors";
import { LogBox } from "react-native";

//import components
import DeviceMotionData from "../component/DeviceMotionData";
import SpeedGauge from "../component/SpeedGauge";
import Linegraph from "../component/Linegraph";

LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function DeviceMotionScreen() {
  // const InitialDeviceMotionOrientation= Object.freeze({
  //   LeftLanodscape:-90,
  //   Portrait:0,
  //   RightLandscape:90,
  //   UpsideDown:180,
  // });

  //usestate initial condition for SDK
  const initialData = {
    acceleration: {
      x: 0,
      y: 0,
      z: 0,
    },
    accelerationIncludingGravity: {
      x: 0,
      y: 0,
      z: 0,
    },
    interval: 0,
    orientation: null,
    rotation: {
      alpha: 0,
      beta: 0,
      gamma: 0,
    },
    rotationRate: {
      alpha: 0,
      beta: 0,
      gamma: 0,
    },
  };

  //useState hooks

  //SDK operation
  const [data, setData] = useState(initialData);
  const [permission, setPermission] = useState(null);
  const [speed, setSpeed] = useState(1000);
  const [currSpeed, setCurrSpeed] = useState(1000);

  //show settings
  const [show, setShow] = useState(false);

  //data
  const [currAcc, setcurrAcc] = useState(0);
  const [maxAcc, setMaxAcc] = useState(0);
  const [motion, setMotion] = useState(false);

  //timerhooks
  const [runTime, setRunTime] = useState(0);
  const timerOneSec = useRef();
  const timerGraph = useRef();

  //linechart data
  const [arrayAcc, setArrayAcc] = useState([0]);

  // SDK logics
  const getPermission = async () => {
    if (permission === null) {
      const response = await DeviceMotion.requestPermissionsAsync();
      if (response.granted === true) {
        setPermission(response.granted);
        console.log("Approved! " + response.status + " " + response.status);
      } else {
        console.log("Denied! " + response.status + " " + response.status);
      }
    }
  };

  const checkAvail = async () => {
    const avail = await DeviceMotion.isAvailableAsync();
    if (avail === false) {
      getPermission();
    }
    console.log("Device is available? " + avail);
  };

  useEffect(() => {
    getPermission();
    console.log("Device is available=" + checkAvail());
    console.log("Permissions is " + permission);
    DeviceMotion.addListener(setData);
    DeviceMotion.setUpdateInterval(speed);
  }, []);

  const changeSpeed = () => {
    DeviceMotion.setUpdateInterval(parseInt(speed));
    setCurrSpeed(speed);
  };

  const handleCheck = () => {
    console.log("Permission=" + permission);
    checkAvail();
    console.log("Check listeners=" + DeviceMotion.getListenerCount());
    console.log("Check orientation=" + data.orientation);
  };

  // app logics
  useEffect(() => {
    if (data.acceleration.x !=null && data.acceleration.y != null && data.acceleration.x !=null){
    const measuredAcc = Math.max(
      Math.abs(data.acceleration.x),
      Math.abs(data.acceleration.y),
      Math.abs(data.acceleration.z)
    );

    setcurrAcc(measuredAcc);
    if (measuredAcc > maxAcc) {
      setMaxAcc(measuredAcc);
    }
    if (measuredAcc <= 0.15) {
      setTimeout(() => {
        setMotion(false);
      }, 4000);
    } else {
      setMotion(true);
    }
    }
  }, [data.acceleration.x, data.acceleration.y, data.acceleration.z]);

  useEffect(() => {
    if (motion) {
      timerOneSec.current = setInterval(() => {
        setRunTime((time) => time + 1);
      }, 1000);
      timerGraph.current = setInterval(() => {
        console.log("currAcc="+currAcc + " x=" + data.acceleration.x)
        setArrayAcc((array)=>[...array,currAcc]);
      }, 5000);
    } else {
      clearInterval(timerOneSec.current);
      clearInterval(timerGraph.current);
      setRunTime(0);
      setMaxAcc(0);
      setArrayAcc([0]);
    }
    return () => clearInterval(timerOneSec.current, timerGraph.current,currAcc);
  }, [motion]);

  return (
    <SafeAreaView style={styles.viewcontainer}>
      <ScrollView style={motion ? styles.scrollViewRun : styles.scrollViewStop}>
        {show == true ? (
          <DeviceMotionData
            data={data}
            speed={speed}
            setSpeed={setSpeed}
            changeSpeed={changeSpeed}
            currSpeed={currSpeed}
            handleCheck={handleCheck}
          />
        ) : (
          <SpeedGauge
            currAcc={currAcc}
            maxAcc={maxAcc}
            motion={motion}
            runTime={runTime}
            setRunTime={setRunTime}
            setMaxAcc={setMaxAcc}
          />
        )}
        {!show && <Linegraph arrayAcc={arrayAcc} />}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setShow(!show)}
            style={styles.button}
          >
            <Text>Toggle View</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

styles = StyleSheet.create({
    viewcontainer: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scrollViewRun: {
      backgroundColor: "white",
      marginHorizontal: 20,
    },
    scrollViewStop: {
      backgroundColor: "pink",
      marginHorizontal: 20,
    },
    buttonContainer: {
      flexDirection: "row",
      alignItems: "stretch",
      marginTop: 15,
    },
    button: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#eee",
      padding: 10,
    },
    middleButton: {
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: "#ccc",
    },
  });