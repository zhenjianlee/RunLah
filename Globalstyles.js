import { StyleSheet,StatusBar } from "react-native";

export default styles = StyleSheet.create({
    viewcontainer: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scrollViewRun: {
      backgroundColor: "pink",
      marginHorizontal: 20,
    },
    scrollViewStop: {
      backgroundColor: "white",
      marginHorizontal: 20,
    },
    speedcontainer:{
      justifyContent:'center',
      alignItems:'center',
    },
    input: {
      height: 40,
      margin: 12,
      width: 100,
      borderWidth: 1,
      padding: 10,
    },
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