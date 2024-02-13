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
import { Circle } from "react-native-progress";
import styles from "../Globalstyles";

import DeviceMotionData from "../component/DeviceMotionData";
import SpeedGauge from "../component/SpeedGauge";
import { interval, max } from "d3";

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
  const [data, setData] = useState(initialData);
  const [permission, setPermission] = useState(null);
  const [speed, setSpeed] = useState(1000);
  const [currSpeed, setCurrSpeed] = useState(1000);
  const [show, setShow] = useState(false);
  const [currAcc, setcurrAcc] = useState(0);
  const [maxAcc, setMaxAcc] = useState(0);
  const [motion, setMotion] = useState(false);

  //timerhooks
  const [runTime, setRunTime] = useState(0);
  const tiktok= useRef();


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

  // app logic
  useEffect(() => {
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
        clearInterval(tiktok.current);
        setRunTime(0);
      }, 3000);
    } else {
      setMotion(true);
      setInterval(() => {
        setRunTime((prevTime) => prevTime + 1);
      }, 1000);
      tiktok.current = setInterval(()=>{setRunTime((time)=>time+1)},1000)
    }
    return()=> clearInterval(tiktok.current);
  }, [data.acceleration.x, data.acceleration.y, data.acceleration.z]);


  return (
    <SafeAreaView style={styles.viewcontainer}>
      <ScrollView style={motion ? styles.scrollViewRun : styles.scrollViewStop}>
        <SpeedGauge
          currAcc={currAcc}
          maxAcc={maxAcc}
          motion={motion}
          runtime={runTime}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setShow(!show)}
            style={styles.button}
          >
            <Text>Toggle Settings</Text>
          </TouchableOpacity>
        </View>

        {show && (
          <DeviceMotionData
            data={data}
            speed={speed}
            setSpeed={setSpeed}
            changeSpeed={changeSpeed}
            currSpeed={currSpeed}
            handleCheck={handleCheck}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
