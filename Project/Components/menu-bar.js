import React from "react";
import { Header } from "react-native-elements";

export default class MenuBar extends React.Component {
  render() {
    return (
        <Header
          backgroundColor = '#5C63D8'
          leftComponent={{ icon: "home", color: "#fff"}}
          centerComponent={{text:this.props.header, style: { color: "#fff" } }}
        />
    );
  }
}
