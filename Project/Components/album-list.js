import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { List, ListItem, Button } from "react-native-elements";
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
        "https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&user_id=25771860%40N03&format=json&nojsoncallback=1"
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
        <View style={styles.container}>
          <Button
            title="Loading..."
            loading
            loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "rgba(92, 99,216, 1)",
              width: 300,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5
            }}
            containerStyle={{ marginTop: 20 }}
          />
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
                  onPress={() => this.props.navigation.navigate("PhotoList", {
                    directoryId: directory.id
                  })}
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
    flex: 1,
    flexDirection: "column"
  }
});
