import React from "react";
import { StyleSheet, Text, ScrollView, View, Alert } from "react-native";
import { List, ListItem } from "react-native-elements";
import axios from "axios";

export default class DirectoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      directories: null
    };
    this.getListado();
  }

  getListado() {
    axios
      .get(
        "https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=d8aaa725663506bab63f8a0067a5fe54&user_id=25771860%40N03&format=json&nojsoncallback=1&api_sig=7540cbce75f7eb3bfa8b5f42cd3ec89d"
      )
      .then(({ data }) => {
        this.setState({
          directories: data.photosets.photoset
        });
      })
      .catch(({ error }) => {
        console.log(error);
      });
  }

  render() {
    if (!this.state.directories) {
      return (
        <View style= {styles.container}>
          <Text>Loading, please wait...</Text>
        </View>
      );
    } else {
      return (
        <ScrollView>
          <List>
            {this.state.directories.map((directory, i) => (
              <ListItem
                key={i}
                title={directory.title._content}
                onPress={() => Alert.alert("Touched")}
              />
            ))}
          </List>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center"
  },
  scrollView: {
    flex:1,
    flexDirection: 'column'
  }
});
