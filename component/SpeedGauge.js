import { View, Text } from "react-native";
import style from "../Globalstyles";
import  {Pie, Circle,Bar} from "react-native-progress"

export default function SpeedGauge({ currAcc, maxAcc,motion ,runTime}) {
  return (
    <View>
      <Text>Motion: { motion === true? "Running" : "Stopped"}</Text>
      <Text>Run Time: {runTime  && runTime !=null ? runTime.toString() : "0"}</Text>
      <Bar animated={true} progress={runTime/60} borderWidth={3} borderRadius={3} height={5} width={150}/>
      <Text>Current Acc: {Math.round(currAcc)} ms^-2</Text>
      <Circle size={125} progress={currAcc/20} borderWidth={3} animated={true} showsText={true}/>
      <Text>{currAcc <= 1? "Why did you stop?"
      : currAcc <= 5? "You have to go faster!"
      : currAcc <=10? "Ok! Keep it up!"
      : currAcc <=15?" That's fast!"
      : "Awesome work!"} </Text>
      <Text>Maximum Acc: {Math.round(maxAcc)} ms^-2</Text>
      <Pie  size={125} progress={maxAcc/20} borderWidth={3} animated={true} showsText={true}/>
      <Text>{maxAcc <= 1? "Even a tree can outrun you"
      : maxAcc <= 5? "Snail on a stroll"
      : maxAcc <=10? "Running chicken"
      : maxAcc <=15?"Cheetah on the loose"
      : "Superman"} </Text>
    </View>
  );
}
const chartStyle = {
  height: 250,
};
