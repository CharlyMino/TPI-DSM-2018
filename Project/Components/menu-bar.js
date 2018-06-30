import React from "react";
import { Header } from "react-native-elements";

export default class MenuBar extends React.Component {
  render() {
    return (
        <Header
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{text:this.props.header, style: { color: "#fff" } }}
          rightComponent={{ icon: "home", color: "#fff", onPress: () => {this.props.navigation.navigate("AlbumList")} }}
        />
    );
  }
}
