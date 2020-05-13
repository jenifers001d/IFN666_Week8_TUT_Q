import React, { useContext } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { LoggerContext } from "../Context";

// const log = [
//   {
//     event: "Chocolate",
//     data: [
//       "Tue Apr 21 2020 22:01:33 GMT+1000 (AEST)",
//       "Tue Apr 21 2020 22:01:37 GMT+1000 (AEST)",
//     ],
//   },
//   {
//     event: "Coffee",
//     data: [
//       "Tue Apr 21 2020 22:01:21 GMT+1000 (AEST)",
//       "Tue Apr 21 2020 22:01:28 GMT+1000 (AEST)",
//       "Tue Apr 21 2020 22:01:30 GMT+1000 (AEST)",
//     ],
//   },
//   {
//     event: "Fruit",
//     data: [
//       "Tue Apr 21 2020 22:01:35 GMT+1000 (AEST)",
//       "Tue Apr 21 2020 22:01:36 GMT+1000 (AEST)",
//     ],
//   },
//   {
//     event: "Walk",
//     data: [
//       "Tue Apr 21 2020 22:01:17 GMT+1000 (AEST)",
//       "Tue Apr 21 2020 22:01:32 GMT+1000 (AEST)",
//       "Tue Apr 21 2020 22:01:38 GMT+1000 (AEST)",
//       "Tue Apr 21 2020 22:01:39 GMT+1000 (AEST)",
//     ],
//   },
// ];
function EventLog(props) {
  return (
    <View style={{ marginBottom: 4 }}>
      <Text
        style={{
          backgroundColor: "#ff88aa",
          paddingHorizontal: 17,
          paddingVertical: 12,
          fontSize: 18,
          fontWeight: "700",
          borderRadius: 4,
        }}
      >
        {props.event}{" "}
        <Text style={{ fontWeight: "100", fontSize: 16 }}>
          ({props.data.length})
        </Text>
      </Text>
      <View>
        {props.data &&
          props.data.map((logTime) => (
            <Text
              style={{ paddingHorizontal: 17, paddingVertical: 6 }}
              key={logTime}
            >
              {new Date(logTime).toString()}
            </Text>
          ))}
      </View>
    </View>
  );
}

export default function LogScreen() {
  const [state, setState] = useContext(LoggerContext);
  return (
    <ScrollView
      style={styles.container}
      style={{ paddingHorizontal: 6, paddingVertical: 6 }}
    >
      {
        // 有 log 資料時，產生 <EventLog> 這個畫面
        state.map(
          (a_group_logs) =>
            a_group_logs.data.length > 0 && (
              <EventLog {...a_group_logs} key={a_group_logs.event} />
            )
        )
      }

      {
        // 沒有 log 資料時，產生 <Text> 這個畫面
        state.length == 0 && (
          <Text
            style={{
              fontSize: 30,
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            No any data!
          </Text>
        )
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
