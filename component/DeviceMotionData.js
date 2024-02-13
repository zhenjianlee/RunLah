import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StatusBar,
} from "react-native";

import styles from "../Globalstyles";

export default function DeviceMotionData({
  data,
  speed,
  setSpeed,
  changeSpeed,
  currSpeed,
  handleCheck
}) {
  return (
    <View id="settings">
      <Text style={styles.heading}>Acceleration (m/s^2)</Text>
      {data.acceleration.x && data.acceleration.x !=null ? (
        <Text style={styles.text}>x: {data.acceleration.x}</Text>
      ) : null}
      {data.acceleration.y && data.acceleration.y !=null ? (
        <Text style={styles.text}>y: {data.acceleration.y}</Text>
      ) : null}
      {data.acceleration.z && data.acceleration.z !=null != null ? (
        <Text style={styles.text}>z: {data.acceleration.z}</Text>
      ) : null}

      <Text style={styles.heading}>Acceleration Including Gravity (m/s^2)</Text>
      {data.accelerationIncludingGravity.x && data.accelerationIncludingGravity.x !=null ? (
        <Text style={styles.text}>
          x: {data.accelerationIncludingGravity.x}
        </Text>
      ) : null}
      {data.accelerationIncludingGravity.y && data.accelerationIncludingGravity.y !=null? (
        <Text style={styles.text}>
          y: {data.accelerationIncludingGravity.y}
        </Text>
      ) : null}
      {data.accelerationIncludingGravity.z && data.accelerationIncludingGravity.z !=null ? (
        <Text style={styles.text}>
          z: {data.accelerationIncludingGravity.z}
        </Text>
      ) : null}

      {data.interval && data.interval !=null ? (
        <Text style={styles.heading}>
          Interval (s) : {data.interval / 1000}
        </Text>
      ) : null}

      {data.orientation ? (
        <Text style={styles.heading}> Orientation: {data.orientation}</Text>
      ) : null}

      <Text style={styles.heading}>Rotation</Text>
      {data.rotation.alpha && data.rotation.alpha !=null ? (
        <Text style={styles.text}>alpha: {data.rotation.alpha}</Text>
      ) : null}
      {data.rotation.beta && data.rotation.beta !=null ? (
        <Text style={styles.text}>beta: {data.rotation.beta}</Text>
      ) : null}
      {data.rotation.gamma && data.rotation.gamma !=null ? (
        <Text style={styles.text}>gamma: {data.rotation.gamma}</Text>
      ) : null}

      <Text style={styles.heading}>Rotation Rate (deg/s)</Text>
      {data.rotationRate.alpha && data.rotationRate.alpha!=null ? (
        <Text style={styles.text}>alpha: {data.rotationRate.alpha}</Text>
      ) : null}
      {data.rotationRate.beta && data.rotationRate.beta!=null? (
        <Text style={styles.text}>beta: {data.rotationRate.beta}</Text>
      ) : null}
      {data.rotationRate.gamma && data.rotationRate.gamma!=null ? (
        <Text style={styles.text}>gamma: {data.rotationRate.gamma}</Text>
      ) : null}

      <View>
        <Text style={styles.text}>Speed: {currSpeed}</Text>
        <TextInput
          style={styles.input}
          value={speed}
          keyboardType="numeric"
          onChangeText={(text) => setSpeed(text)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleCheck} style={styles.button}>
          <Text>Check</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={changeSpeed}
          style={[styles.button, styles.middleButton]}
        >
          <Text>Change Update Speed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
