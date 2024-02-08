import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { DeviceMotion } from "expo-sensors";

function DeviceMotionSettings() {
  // const InitialDeviceMotionOrientation= Object.freeze({
  //   LeftLanodscape:-90,
  //   Portrait:0,
  //   RightLandscape:90,
  //   UpsideDown:180,
  // });

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
  const [data, setData] = useState(initialData);
  const [subscription, setSubscription] = useState(null);
  const [permission, setPermission] = useState(null);
  const [number, setSpeed] = useState(500);

  // const _slow = () => DeviceMotion.setUpdateInterval(1000);
  // const _fast = () => DeviceMotion.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(DeviceMotion.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

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
    _subscribe();
    DeviceMotion.setUpdateInterval(number);
    return () => _unsubscribe();
  }, []);

  const changeSpeed = () => {
    DeviceMotion.setUpdateInterval(number);
  };

  const handleCheck = () => {
    console.log("Permission=" + permission);
    checkAvail();
    console.log(
      "Check values x=" +
        data.acceleration.x +
        " y=" +
        data.acceleration.y +
        " z= " +
        data.acceleration.z
    );
    console.log("Check listeners=" + DeviceMotion.getListenerCount());
    console.log("Check orientation=" + data.orientation);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Acceleration (m/s^2)</Text>
      <Text style={styles.text}>x: {data.acceleration.x}</Text>
      <Text style={styles.text}>y: {data.acceleration.y}</Text>
      <Text style={styles.text}>z: {data.acceleration.z}</Text>

      <Text style={styles.heading}>Acceleration Including Gravity (m/s^2)</Text>
      <Text style={styles.text}>x: {data.accelerationIncludingGravity.x}</Text>
      <Text style={styles.text}>y: {data.accelerationIncludingGravity.y}</Text>
      <Text style={styles.text}>z: {data.accelerationIncludingGravity.z}</Text>

      <Text style={styles.heading}>Interval (s) : {data.interval / 1000}</Text>

      <Text style={styles.heading}> Orientation: {data.orientation}</Text>

      <Text style={styles.heading}>Rotation</Text>
      <Text style={styles.text}>alpha: {data.rotation.alpha}</Text>
      <Text style={styles.text}>beta: {data.rotation.beta}</Text>
      <Text style={styles.text}>gamma: {data.rotation.gamma}</Text>

      <Text style={styles.heading}>Rotation Rate (deg/s)</Text>
      <Text style={styles.text}>alpha: {data.rotationRate.alpha}</Text>
      <Text style={styles.text}>beta: {data.rotationRate.beta}</Text>
      <Text style={styles.text}>gamma: {data.rotationRate.gamma}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={subscription ? _unsubscribe : _subscribe}
          style={styles.button}
        >
          <Text>{subscription ? "On" : "Off"}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
          </TouchableOpacity> */}

        <TouchableOpacity onPress={handleCheck} style={styles.button}>
          <Text>Check</Text>
        </TouchableOpacity>
      </View>

      <View>
      <Text style={styles.text}>Speed: {number}</Text>
        <TextInput
          value={number}
          keyboardType="numeric"
          onChangeText={(text)=>(setSpeed(parseInt(text)))}
        />
      </View>
      <TouchableOpacity
        onPress={changeSpeed}
        style={[styles.button, styles.middleButton]}
      >
        <Text>Change Update Speed</Text>
      </TouchableOpacity>
    </View>
  );
}

export default DeviceMotionSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  heading: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    textAlign: "center",
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
