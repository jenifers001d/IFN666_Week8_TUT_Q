import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LoggerContext } from "../Context";

const opts = ["Chocolate", "Coffee", "Fruit", "Walk"];

function ActionButton(props) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#00ee11",
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 6,
      }}
      onPress={() => {
        props.onPress(props.name);
      }}
    >
      <Text style={{ fontSize: 18 }}>{props.name}</Text>
    </TouchableOpacity>
  );
}

export default function RecordScreen() {
  const [state, setState] = useContext(LoggerContext);
  return (
    <View style={styles.container}>
      {opts.map((opt) => (
        <ActionButton
          name={opt}
          key={opt}
          onPress={(name) => {
            // Array.some(函式)：陣列中是否有至少一個值，可以符合「函式」的條件，回傳 true 或 false
            if (state.some((a_group_logs) => a_group_logs.event == name)) {
              setState((prev) => {
                let i = prev.findIndex((a_group) => a_group.event == name);
                prev[i].data = prev[i].data.concat(Date.now());
                return [...prev];
              });
            } else {
              setState((prev) => {
                return prev.concat({
                  event: name,
                  data: [Date.now()],
                });
              });
            }
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
