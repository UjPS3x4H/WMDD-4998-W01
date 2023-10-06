import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "react-native-elements";
import TopNavigator from "./Components/TopNavigator";
import { SafeAreaView, StyleSheet } from "react-native"; // Import StyleSheet
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "./Components/Detail";
const Stack = createNativeStackNavigator();

function App() {
  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="TopNavigator"
            screenOptions={{ headerShown: true }}
          >
            <Stack.Screen name="Movie App" component={TopNavigator} />
            <Stack.Screen name="Detail" component={Detail} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
