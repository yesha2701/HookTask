import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import ToDo from "../screens/ToDo";
import AddTask from "../screens/AddTask";


export type RootStack={
    Home:undefined,
    Todo:undefined,
    AddTask:undefined,
}

const Stack = createStackNavigator<RootStack>();
const StackNavigator = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Todo" component={ToDo}/>
                <Stack.Screen name="AddTask" component={AddTask}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigator;