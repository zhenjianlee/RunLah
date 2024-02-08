import { useState, useEffect } from "react";
import { Pedometer } from "expo-sensors";
import { PaperProvider } from "react-native-paper";
import {
  Text,
  TextInput,
  RadioButton,
  Button,
  Dialog,
  Portal,
} from "react-native-paper";
import { View, Image, StyleSheet } from "react-native";

function LoginScreen() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [coffee, setCoffee] = useState(false);
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* <Button onPress={() => navigation.navigate("Feed")} title="Go to feed" /> */}
      {/* <Image source={cafe} /> */}
      <TextInput
        label="Your Name:"
        onChangeText={(name) => setName(name)}
        value={name}
        style={{
          width: "60%",
        }}
      />
      <TextInput
        label="Your Age:"
        onChangeText={(age) => setAge(age)}
        value={age}
        style={{
          width: "60%",
        }}
      />
      <View>
        <Text>Like coffee?</Text>
        <RadioButton
          value="like"
          status={coffee === "like" ? "checked" : "unchecked"}
          onPress={() => setCoffee("like")}
        />
      </View>

      <View>
        <Text>Dislike coffee?</Text>
        <RadioButton
          value="dislike"
          status={coffee === "dislike" ? "checked" : "unchecked"}
          onPress={() => setCoffee("dislike")}
        />
      </View>

      <Button icon="send-circle" mode="contained" onPress={showDialog}>
        Submit
      </Button>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Icon icon="alert" />
          <Dialog.Title>Summary</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              My name is {name} , I am {age}, I {coffee} coffee{" "}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

export default LoginScreen;
