import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./ToDoStyle";
import { images } from "../../assets/images";
import { icons } from "../../assets/icons";
import { Text } from "react-native-gesture-handler";
import Moment from "moment";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddModal from "../components/AddModal";
import { ModalContext } from "./AddModalContext";
import { Modal } from "react-native/types_generated/index";

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

const initialTasks = [
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

const ToDo = () => {
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
  const [newData, setNewData] = useState([]);
  const [isActive, setIsActive] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [onEditData,setOnEditData] = useState({});
  const [isEdit,setIsEdit]=useState(false)

  const navigation = useNavigation();

  const storeExistedData = async () => {
    try {
      const existing = await AsyncStorage.getItem("userData");
      if (existing) {
        setNewData(JSON.parse(existing));
      } else {
        await AsyncStorage.setItem("userData", JSON.stringify(initialTasks));
        setNewData(initialTasks);
      }
    } catch (e) {
      console.log("Error:", e);
    }
  };

  useEffect(() => {
    storeExistedData();
  }, []);

  const onDelete = async (id) => {
    try {
      const updatedData = newData.filter((x) => x.id !== id);
      await AsyncStorage.setItem("userData", JSON.stringify(updatedData));
      setNewData(updatedData);
    } catch (e) {
      console.log("Error on Delete :>> ", e);
    }
  };

  const createTwoButtonAlert = async (id) =>
    Alert.alert("Are you sure?", "Please Re-assure", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => onDelete(id) },
    ]);

  const stackNavigator = () => {
    return navigation.goBack();
  };

  const onUpdate = (id) => {
    setIsModalOpen(true);
    setIsEdit(true);
    try{
      const fetchedData =  newData?.find((x)=>x.id === id);
      setOnEditData(fetchedData);
    }catch(e){
      console.log('Error on Update :>> ', e);
    }
  };

  const propGroup = {
    setNewData:setNewData, 
    onEditData:onEditData, 
    setIsEdit:setIsEdit,
    isEdit:isEdit,
  };

  const filteredList = newData?.filter((task) => {
    const matchesSearch = task?.title
      ?.toLowerCase()
      ?.includes(searchQuery.toLowerCase());

    const matchesFilter =
      isActive === "All"
        ? true
        : isActive === "active"
        ? task?.status === "active"
        : task?.status === "completed";

    return matchesSearch && matchesFilter;
  });

  const Item = ({ item }: itemProp) => {
    const fomatDate = Moment(item.createdAt)?.format("DD/MM/YYYY");

    return (
      <View style={[styles.listView, styles.dropShadow]}>
        <View style={styles.infoView}>
          <Text style={styles.infoText}>{item.title}</Text>
          <View style={styles.dateView}>
            <Image source={icons.calender} />
            <Text style={styles.dateText}>{fomatDate}</Text>
          </View>
        </View>
        <View style={styles.mainIconsView}>
          <View>
            <View style={styles.logoIconView}>
              <View style={[iconBg(item.status), styles.iconView]}>
                <Image
                  source={isComplete(item.status)}
                  style={styles.statusIcon}
                />
              </View>
            </View>
            <View style={[styles.priorityView, prioBackground(item.priority)]}>
              <Text style={[styles.priorityText, isPriority(item.priority)]}>
                {item.priority}
              </Text>
            </View>
          </View>
          <View style={styles.updateDeleteView}>
            <TouchableOpacity onPress={() => onUpdate(item.id)}>
              <Image source={icons.edit} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => createTwoButtonAlert(item.id)}>
              <Image source={icons.delete} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

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
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => setIsModalOpen(true)}
              >
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
      <AddModal value={propGroup}/>
    </View>
  );
};

export default ToDo;
