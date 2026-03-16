import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./ToDoStyle";
import { images } from "../../assets/images";
import { icons } from "../../assets/icons";
import { Text } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStack } from "../navigation/StackNavigator";
import Moment from "moment";
interface todayprop {
  navigation: StackNavigationProp<RootStack, "Todo">;
}

interface detail {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  status: "active" | "completed";
  category: string;
  durationSeconds: number;
  remainingSeconds: number;
  createdAt: string;
}

const initialTasks: detail[] = [
  {
    id: "1",
    title: "Set up project structure",
    priority: "High",
    status: "completed",
    category: "Setup",
    durationSeconds: 300,
    remainingSeconds: 0,
    createdAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "2",
    title: "Build navigation flow",
    priority: "High",
    status: "active",
    category: "Development",
    durationSeconds: 300,
    remainingSeconds: 210,
    createdAt: "2024-01-15T09:00:00Z",
  },
  {
    id: "3",
    title: "Design task card component",
    priority: "Medium",
    status: "active",
    category: "UI",
    durationSeconds: 300,
    remainingSeconds: 145,
    createdAt: "2024-01-15T09:30:00Z",
  },
  {
    id: "4",
    title: "Integrate AsyncStorage",
    priority: "Medium",
    status: "active",
    category: "Development",
    durationSeconds: 300,
    remainingSeconds: 300,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "5",
    title: "Write input validation logic",
    priority: "High",
    status: "active",
    category: "Development",
    durationSeconds: 300,
    remainingSeconds: 60,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "6",
    title: "Add search and filter UI",
    priority: "Medium",
    status: "active",
    category: "UI",
    durationSeconds: 300,
    remainingSeconds: 180,
    createdAt: "2024-01-15T11:00:00Z",
  },
  {
    id: "7",
    title: "Implement delete confirmation alert",
    priority: "Low",
    status: "active",
    category: "UI",
    durationSeconds: 300,
    remainingSeconds: 90,
    createdAt: "2024-01-15T11:30:00Z",
  },
  {
    id: "8",
    title: "Test countdown timer cleanup",
    priority: "High",
    status: "active",
    category: "Testing",
    durationSeconds: 300,
    remainingSeconds: 255,
    createdAt: "2024-01-15T12:00:00Z",
  },
  {
    id: "9",
    title: "Fix priority badge styling",
    priority: "Low",
    status: "completed",
    category: "UI",
    durationSeconds: 300,
    remainingSeconds: 0,
    createdAt: "2024-01-15T12:30:00Z",
  },
  {
    id: "10",
    title: "Code review and cleanup",
    priority: "Medium",
    status: "active",
    category: "Review",
    durationSeconds: 300,
    remainingSeconds: 300,
    createdAt: "2024-01-15T13:00:00Z",
  },
];

const btnStatus = ["All", "active", "completed"];

interface itemProp {
  item: detail;
}
const isComplete = (status: "active" | "completed") => {
  if (status === "active") {
    return icons.check;
  } else {
    return icons.checked;
  }
};

const iconBg = (status: "active" | "completed") => {
  if (status === "active") {
    return styles.activeIcon;
  } else {
    return styles.completeIcon;
  }
};

const isPriority = (priority: "High" | "Medium" | "Low") => {
  if (priority === "High") {
    return styles.highText;
  } else if (priority === "Medium") {
    return styles.mediumText;
  } else {
    return styles.lowText;
  }
};

const prioBackground = (priority: "High" | "Medium" | "Low") => {
  if (priority === "High") {
    return styles.highBg;
  } else if (priority === "Medium") {
    return styles.mediumBg;
  } else {
    return styles.lowBg;
  }
};

const Item = ({ item }: itemProp) => {
  const fomatDate = Moment(item.createdAt).format("DD/MM/YYYY");

  return (
    <View style={[styles.listView, styles.dropShadow]}>
      <View style={styles.infoView}>
        <Text style={styles.infoText}>{item.title}</Text>
        <View style={styles.dateView}>
          <Image source={icons.calender} />
          <Text style={styles.dateText}>{fomatDate}</Text>
        </View>
      </View>
      <View>
        <View style={styles.logoIconView}>
          <View style={[iconBg(item.status), styles.iconView]}>
            <Image source={isComplete(item.status)} style={styles.statusIcon} />
          </View>
        </View>
        <View style={[styles.priorityView, prioBackground(item.priority)]}>
          <Text style={[styles.priorityText, isPriority(item.priority)]}>
            {item.priority}
          </Text>
        </View>
      </View>
    </View>
  );
};
const ToDo = ({ navigation }: todayprop) => {
  const [isActive, setIsActive] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const stackNavigator = () => {
    return navigation.goBack();
  };

  const addNavigator = () => {
    return navigation.navigate("AddTask");
  };

  const filteredList = initialTasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesFilter =
      isActive === "All"
        ? true
        : isActive === "active"
        ? task.status === "active"
        : task.status === "completed";

    return matchesSearch && matchesFilter;
  });
  
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ImageBackground
          source={images.backgroundImg}
          resizeMode="cover"
          style={styles.bgImg}
        >
          <View style={styles.mainView}>
            <View style={styles.topView}>
              <TouchableOpacity onPress={stackNavigator}>
                <Image source={icons.arrowLeft} />
              </TouchableOpacity>
              <Text style={styles.titleText}>Today's Tasks</Text>
              <Image source={icons.notifications} />
            </View>
            <View style={styles.searchView}>
              <TextInput
                value={searchQuery}
                placeholder="Search Title"
                style={styles.searchBar}
                clearButtonMode="always"
                onChangeText={(text) => setSearchQuery(text)}
              />
              <TouchableOpacity style={styles.addBtn} onPress={addNavigator}>
                <Text style={styles.addText}>Add</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.trioBtnView}>
              {btnStatus.map((x) => (
                <TouchableOpacity
                  style={[
                    styles.button,
                    isActive === x ? styles.selectedBtn : styles.diableBtn,
                  ]}
                  onPress={() => setIsActive(x)}
                >
                  <Text
                    style={[
                      styles.selectionText,
                      isActive === x ? styles.selectedText : styles.disableText,
                    ]}
                  >
                    {x}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <FlatList
              data={filteredList}
              renderItem={({ item }) => <Item item={item} />}
            />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ToDo;
