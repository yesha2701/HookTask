import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  Alert,
} from "react-native";
import { styles } from "./AddModelStyle";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Moment from "moment";
import { ModalContext } from "../screens/AddModalContext";
import { colors } from "../Themes/Colors";

const AddModal = ({ value }) => {
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);
  const { setNewData, onEditData, setIsEdit, isEdit } = value;

  const Options = [
    { label: "High", value: "High" },
    { label: "Medium", value: "Medium" },
    { label: "Low", value: "Low" },
  ];

  const statusOpt = [
    { label: "active", value: "active" },
    { label: "completed", value: "completed" },
  ];

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [durationSeconds, setDuration] = useState("");
  const [remainingSeconds, setRemaining] = useState("");
  const [errors, setErrors] = useState({ field: "", message: "" });

  const validationForm = () => {
    let formError = { field: "", message: "" };

    if (id === "") {
      formError.field = "id";
      formError.message = "Id is Required";
      setErrors(formError);
    } else if (title === "") {
      formError.field = "title";
      formError.message = "Title is Required";
      setErrors(formError);
    } else if (priority === "" || priority === undefined) {
      formError.field = "priority";
      formError.message = "Priority is Required to select";
      setErrors(formError);
    } else if (status === "" || status === undefined) {
      formError.field = "status";
      formError.message = "status is Required to select";
      setErrors(formError);
    } else if (category === "") {
      formError.field = "category";
      formError.message = "category is Required";
      setErrors(formError);
    } else if (durationSeconds === "") {
      formError.field = "durationSeconds";
      formError.message = "durationSeconds is Required";
      setErrors(formError);
    } else if (remainingSeconds === "") {
      formError.field = "remaining";
      formError.message = "remaining is Required";
      setErrors(formError);
    } else {
      setErrors({ field: "", message: "" });
      handleOnSubmit();
      setIsModalOpen(false);
    }
    
  };

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const hideDatePicker = () => {
    setShowPicker(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const formattedDate = date.toLocaleString();
  const IsoFormattedDate = Moment(formattedDate, "DD/MM/YYYY").format(
    "YYYY-MM-DDTHH:mm:ss",
  );

  const handleOnSubmit = async () => {
    const multiParam = {
      id: id,
      title: title,
      priority: priority,
      status: status,
      category: category,
      durationSeconds: durationSeconds,
      remainingSeconds: remainingSeconds,
      createdAt: IsoFormattedDate,
    };

    try {
      const existingDataString = await AsyncStorage.getItem("userData");
      let existingData = existingDataString
        ? JSON.parse(existingDataString)
        : [];

      if (isEdit === true) {
        const updateTitle = existingData.map((item) => {
          if (item.id === onEditData.id) {
            return { ...item, title };
          }
          return item;
        });
        await AsyncStorage.setItem("userData", JSON.stringify(updateTitle));
        setNewData(updateTitle);
      } else {
        if (Array.isArray(existingData)) {
          if (existingData.map((x) => x.id).includes(multiParam.id)) {
            Alert.alert("Id already existed");
          } else {
            existingData.push(multiParam);
          }
        } else {
          console.error("Existing data is not an array. Cannot push new data.");
          return;
        }
        await AsyncStorage.setItem("userData", JSON.stringify(existingData));
        setNewData(existingData);
      }
      console.log("Data successfully updated and saved");
      setId("");
    setTitle("");
    setPriority("");
    setStatus("");
    setCategory("");
    setDuration("");
    setRemaining("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEdit === true) {
      setId(onEditData.id),
      setTitle(onEditData.title),
      setPriority(onEditData.priority);
      setStatus(onEditData.status);
      setCategory(onEditData.category);
      setDuration(onEditData.durationSeconds.toString());
      setRemaining(onEditData.remainingSeconds.toString());
      setDate(onEditData.createdAt);
    } else {
      setId(""), setTitle(""), setPriority(""), setStatus("");
      setCategory("");
      setDuration("");
      setRemaining("");
    }
  }, [isEdit]);

  const onCancel = () => {
    setIsModalOpen(false);
    setIsEdit(false);
  };

  return (
    <Modal
      visible={isModalOpen}
      animationType="slide"
      backdropColor={colors.backdrop}
      onRequestClose={() => setIsModalOpen(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <View style={styles.mainView}>
            <View style={styles.inputView}>
              <Text style={styles.text}>Id</Text>
              <TextInput
                placeholder="Enter Your id"
                value={id}
                style={styles.textInput}
                keyboardType="number-pad"
                onChangeText={(text) => {
                  setId(text.replace(/[^0-9]/g, ""));
                }}
              />
              {errors.field === "id" && (
                <Text style={styles.errorText}>{errors.message}</Text>
              )}
              <Text style={styles.text}>Title</Text>
              <TextInput
                placeholder="Enter Title"
                style={styles.textInput}
                value={title}
                onChangeText={setTitle}
              />
              {errors.field === "title" && (
                <Text style={styles.errorText}>{errors.message}</Text>
              )}
              <Text style={styles.text}>Priority</Text>
              <View>
                <Dropdown
                  data={Options}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Priority"
                  value={priority}
                  onChange={(item) => {
                    setPriority(item.value);
                    setErrors({ field: "", message: "" });
                  }}
                  style={styles.textInput}
                  placeholderStyle={styles.placeholderStyle}
                />
                {errors.field === "priority" && (
                  <Text style={styles.errorText}>{errors.message}</Text>
                )}
              </View>
              <Text style={styles.text}>Status</Text>
              <View>
                <Dropdown
                  data={statusOpt}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Status"
                  value={status}
                  onChange={(item) => {
                    setStatus(item.value);
                    setErrors({ field: "", message: "" });
                  }}
                  style={styles.textInput}
                  placeholderStyle={styles.placeholderStyle}
                />
                {errors.field === "status" && (
                  <Text style={styles.errorText}>{errors.message}</Text>
                )}
              </View>
              <Text style={styles.text}>Category</Text>
              <TextInput
                placeholder="Enter Category"
                style={styles.textInput}
                value={category}
                onChangeText={setCategory}
              />
              {errors.field === "category" && (
                <Text style={styles.errorText}>{errors.message}</Text>
              )}
              <Text style={styles.text}>DurationSeconds</Text>
              <TextInput
                placeholder="Enter durationSeconds"
                style={styles.textInput}
                value={durationSeconds}
                keyboardType="number-pad"
                onChangeText={(text) => {
                  setDuration(text.replace(/[^0-9]/g, ""));
                }}
              />
              {errors.field === "durationSeconds" && (
                <Text style={styles.errorText}>{errors.message}</Text>
              )}
              <Text style={styles.text}>RemainingSeconds</Text>
              <TextInput
                placeholder="Enter remainingSeconds"
                style={styles.textInput}
                value={remainingSeconds}
                keyboardType="number-pad"
                onChangeText={(text) => {
                  setRemaining(text.replace(/[^0-9]/g, ""));
                }}
              />
              {errors.field === "remaining" && (
                <Text style={styles.errorText}>{errors.message}</Text>
              )}
              <Text style={styles.text}>CreatedAt</Text>
              <TextInput
                style={styles.textInput}
                onPress={showDatePicker}
                value={formattedDate}
                placeholder="Select date and time"
                editable={false}
              />

              <DateTimePickerModal
                isVisible={showPicker}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
            <View style={styles.dateView}>
              <TouchableOpacity
                style={[styles.button, styles.submitBtn]}
                onPress={validationForm}
              >
                <Text style={[styles.btnText, styles.submitText]}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelBtn]}
                onPress={onCancel}
              >
                <Text style={[styles.btnText, styles.cancelText]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddModal;
