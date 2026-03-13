import React from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./HomeStyle";
import { images } from "../../assets/images";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../assets/icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStack } from "../navigation/StackNavigator";

interface HomeScreen {
  navigation: StackNavigationProp<RootStack, "Home">;
}

const Home = ({ navigation }: HomeScreen) => {
  const stackNavigator = () => {
    return navigation.navigate("Todo");
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <ImageBackground
            source={images.backgroundImg}
            resizeMode="cover"
            style={styles.bgImg}
          >
            <Image source={images.female} style={styles.femaleImg} />
            <Text style={styles.onBoardText}>Task Management & To-Do List</Text>
            <Text style={styles.subText}>
              This productive tool is designed to help you better manage your
              task project-wise conveniently!
            </Text>
            <TouchableOpacity style={styles.startBtn} onPress={stackNavigator}>
              <View style={{ width: 48 }} />
              <Text style={styles.btnText}>Let's Start</Text>
              <Image source={icons.arrowRight} style={styles.arrowRight} />
            </TouchableOpacity>
          </ImageBackground>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;
