import React from "react";
import { StyleSheet, View, Text } from "react-native";
import DirectoryList from "./Components/directory-list";
import MenuBar from "./Components/menu-bar";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MenuBar />
        <DirectoryList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});
