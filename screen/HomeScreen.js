import { View, Image, StyleSheet, Text} from "react-native";
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