import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Navigator } from "./router.js";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Navigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  }
});
