import React from "react";
import axios from "axios";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { List, ListItem, Card } from "react-native-elements";

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null
    };
    this.author = this.props.navigation.getParam("author");
    this.content = this.props.navigation.getParam("content");
  }

  render() {
    return (
      <Card title={this.author}>
        <Text style={{ marginBottom: 10 }}>{this.content}</Text>
      </Card>
    );
  }
}
