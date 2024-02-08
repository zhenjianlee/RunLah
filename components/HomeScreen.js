import { View, Image, StyleSheet} from "react-native";
import {
    Text,
    TextInput,
    RadioButton,
    Button,
    Dialog,
    Portal,
  } from "react-native-paper";

import starry from "../assets/sn.jpg";

function HomeScreen() {
    return (
      <>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Home!</Text>
          <Image source={starry} />
        </View>
      </>
    );
  }
  

export default HomeScreen;