import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "@/components/RegisterScreen";
import DashboardScreen from "@/components/DashboardScreen";
import { LoginScreen } from "@/components/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "@/redux/stroe";
import { Provider, useDispatch } from "react-redux";
import { setUserDetails } from "@/redux/userDetailsSlice";

const Stack = createStackNavigator();

function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await AsyncStorage.getItem("userDetails");
        if (user) {
          dispatch(setUserDetails(JSON.parse(user)));
          setInitialRoute("Dashboard"); // Navigate to Dashboard if user exists
        } else {
          setInitialRoute("Login"); // Navigate to Login if no user exists
        }
      } catch (error) {
        console.error("Error fetching user details from storage:", error);
        setInitialRoute("Login"); // Default to Login on error
      }
    };

    checkUser();
  }, [dispatch]);

  if (!initialRoute) {
    // Show a loading screen or splash screen while checking user details
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
