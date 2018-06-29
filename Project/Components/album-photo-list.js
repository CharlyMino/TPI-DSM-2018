import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { Card, Button, List, ListItem } from "react-native-elements";
import axios from "axios";

export default class PhotoAlbumList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: null
    };
    this.getPhotos();
  }

  getPhotos() {
    axios
      .get(
        "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=4c09c61bc069a47addbbaf2b3003c6b2&photoset_id=" +
          this.props.navigation.getParam("directoryId") +
          "&format=json&nojsoncallback=1"
      )
      .then(({ data }) =>
        this.setState({
          photos: data.photoset.photo
        })
      )
      .catch(({ error }) => {
        console.log(error);
      });
  }

  getPhotoURL() {}

  render() {
    if (!this.state.photos) {
      return (
        <View style={styles.container}>
          <Text>Loading, please wait...</Text>
        </View>
      );
    } else {
      return (
        <ScrollView>
          <List>
            {this.state.photos.map((photo, i) => (
              <ListItem
                key={i}
                title={photo.title}
                subtitle={
                  <View style={styles.subtitleView}>
                    <Image
                      style={styles.ratingImage}
                      source={{
                        uri:
                          "https://farm" +
                          photo.farm +
                          ".staticflickr.com/" +
                          photo.server +
                          "/" +
                          photo.id +
                          "_" +
                          photo.secret +
                          ".jpg"
                      }}
                    />
                  </View>
                }
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
  },
  subtitleView: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 200,
    width: 370
  },
  ratingText: {
    paddingLeft: 10,
    color: "grey"
  }
});
