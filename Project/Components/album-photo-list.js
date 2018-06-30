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
    this.img = null;
  }

  getPhotos() {
    axios
      .get(
        "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=b1b891993540a0a16824aa1325b151ba&photoset_id=" +
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

  getPhotoURL(farm, server, id, secret) {
      return "https://farm" + farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + ".jpg"
  }

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
                        uri: this.getPhotoURL(photo.farm, photo.server, photo.id, photo.secret)
                      }}
                    />
                  </View>
                }
                onPress = {() => this.props.navigation.navigate('PhotoSelected', 
                {
                    photo: this.getPhotoURL(photo.farm, photo.server, photo.id, photo.secret),
                    photoId: photo.id
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
  },
  subtitleView: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 200,
    width: 375
  },
  ratingText: {
    paddingLeft: 10,
    color: "grey"
  }
});
