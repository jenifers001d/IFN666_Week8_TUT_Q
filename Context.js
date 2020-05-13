import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";

// const init_data = [
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
//   { event: "Fruit", data: [] },
// ];

const init_data = [];

export const LoggerContext = React.createContext();
export const LoggerProvider = ({ children }) => {
  const [state, setState] = useState(init_data);

  useEffect(() => {
    retrieveData();
  });

  // 從「磁碟」獲取資料
  const retrieveData = async () => {
    try {
      // 把從「磁碟」取得的資料，存進 state，渲染畫面
      let gainedData = await AsyncStorage.getItem("logs").then((value) => {
        if (value !== null) {
          return JSON.parse(value);
        }
        return [];
      });
      setState(gainedData);
    } catch (err) {
      console.log(err);
      alert("Disk corrupted");
    }
  };

  // 儲存資料進入「磁碟」
  const storeData = async (updateFun) => {
    // updateFun 函式是 RecordScreen.js 中
    // 使用 setState (也就是這個 storeData) 時傳入的「函式參數」
    // 它可能是下面兩種形式之一

    // updateFun = (prev) => {
    //   let i = prev.findIndex((a_group) => a_group.event == name);
    //   prev[i].data = prev[i].data.concat(Date.now());
    //   return [...prev];
    // }
    //
    // 或
    //
    // updateFun = (prev) => {
    //   return prev.concat({
    //     event: name,
    //     data: [Date.now()],
    //   });
    // };

    // updateFun 函式中的 state 必須用這裡的 state
    // 因為點擊 RecordScreen.js 的按鈕時，必須改變 state 才會重新渲染畫面
    let newState = updateFun(state);
    console.log(newState);
    try {
      await AsyncStorage.setItem("logs", JSON.stringify(newState));
      //iSetState(newState);
    } catch (err) {
      console.log(err);
      alert("There was an error saving.");
    }
  };

  return (
    <LoggerContext.Provider value={[state, storeData]}>
      {children}
    </LoggerContext.Provider>
  );
};
