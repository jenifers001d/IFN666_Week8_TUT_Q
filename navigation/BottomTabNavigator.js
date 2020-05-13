import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";

import LogScreen from "../screens/LogScreen";
import RecordScreen from "../screens/RecordScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Event Log";

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="EventLog"
        component={LogScreen}
        options={{
          title: "Event Log", // icon 的標題
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-list" />
          ),
        }}
      />
      <BottomTab.Screen
        name="AddRecordEvent"
        component={RecordScreen}
        options={{
          title: "Add Record", // icon 的標題
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-add" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  //  這邊是頁面的標題
  switch (routeName) {
    case "EventLog":
      return "Event Logs";
    case "AddRecordEvent":
      return "Add Records";
  }
}
