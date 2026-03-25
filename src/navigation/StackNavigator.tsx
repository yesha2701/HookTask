import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import ToDoScreen from "../screens/ToDoScreen";

const Stack = createStackNavigator();
const StackNavigator = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Todo" component={ToDoScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigator;