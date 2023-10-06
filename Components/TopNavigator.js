import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Movie from "./Movie";
import Search from "./Search";
import TVShow from "./TVShow";

const Tab = createMaterialTopTabNavigator();

function TopNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          textTransform: "none",
          fontSize: 14,
          fontWeight: "bold",
          paddingTop: 0,
        },
        tabStyle: {
          justifyContent: "center",
        },
        indicatorStyle: { backgroundColor: "black" },
      }}
      screenOptions={{
        headerStyle: {
          backgroundColor: "grey",
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movie}
        options={{ tabBarLabel: "Movies" }}
      />
      <Tab.Screen
        name="Search Results"
        component={Search}
        options={{ tabBarLabel: "Search Results" }}
      />
      <Tab.Screen
        name="TV Shows"
        component={TVShow}
        options={{ tabBarLabel: "TV Shows" }}
      />
    </Tab.Navigator>
  );
}

export default TopNavigator;
