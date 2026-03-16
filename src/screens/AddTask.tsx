import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { styles } from "./AddTaskStyle";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStack } from "../navigation/StackNavigator";
import { images } from "../../assets/images";
import { icons } from "../../assets/icons";
import { Dropdown } from "react-native-element-dropdown";

interface addDetail {
  navigation: StackNavigationProp<RootStack, "AddTask">;
}

const Options = [
  { label: "High", value: "High" },
  { label: "Medium", value: "Medium" },
  { label: "Low", value: "Low" },
];

const statusOpt = [
  { label: "Active", value: "Active" },
  { label: "Completed", value: "Completed" },
];

const AddTask = ({ navigation }: addDetail) => {
  const backNavigation = () => {
    return navigation.goBack();
  };
  const [priorities, setPriorities] = useState();
  const [statusActive, setStatusActive] = useState<string>();

  return (
    <View style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ImageBackground
          source={images.backgroundImg}
          resizeMode="cover"
          style={styles.bgImg}
        >
          <View style={styles.mainView}>
            <View style={styles.topView}>
              <TouchableOpacity onPress={backNavigation}>
                <Image source={icons.arrowLeft} />
              </TouchableOpacity>
              <Text style={styles.titleText}>Add Tasks</Text>
              <Image source={icons.notifications} />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.text}>Id</Text>
              <TextInput placeholder="Enter Your id" style={styles.textInput} />
              <Text style={styles.text}>Title</Text>
              <TextInput placeholder="Enter Title" style={styles.textInput} />
              <Text style={styles.text}>Priority</Text>
              <View>
                 <Dropdown
                  data={Options}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Priority"
                  value={priorities}
                  onChange={(item) => {
                    setPriorities(item.value);
                  }}
                  style={styles.textInput}
                  placeholderStyle={styles.placeholderStyle}
                />
              </View>
              <Text style={styles.text}>Status</Text>
              <View>
                 <Dropdown
                  data={statusOpt}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Status"
                  value={statusActive}
                  onChange={(item) => {
                    setStatusActive(item.value);
                  }}
                  style={styles.textInput}
                  placeholderStyle={styles.placeholderStyle}
                />
              </View>
              <Text style={styles.text}>Category</Text>
                <TextInput placeholder="Enter Category" style={styles.textInput}/>
                <Text style={styles.text}>durationSeconds</Text>
                <TextInput placeholder="Enter durationSeconds" style={styles.textInput}/>
                <Text style={styles.text}>remainingSeconds</Text>
                <TextInput placeholder="Enter remainingSeconds" style={styles.textInput}/>
            </View>
            <TouchableOpacity style={styles.startBtn}>
                          <View/>
                          <Text style={styles.btnText}>Submit</Text>
                        </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default AddTask;
