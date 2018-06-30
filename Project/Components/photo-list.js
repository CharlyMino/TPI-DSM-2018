import React from "react";
import { StyleSheet, ScrollView, View, Image, Button } from "react-native";
import { List, ListItem } from "react-native-elements";
import axios from "axios";

export default class PhotoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      album: null
    };
    this.getListPhotos();
  }

  getListPhotos() {
    axios
      .get(
        "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=72157661365435091&format=json&nojsoncallback=1&auth_token=72157695340278552-66f95f583a2caa5f&api_sig=6d833dd56205cb0f90fa6e86feb56045"
      )
      .then(({ data }) => {
        this.setState({
          album: data.photoset.photo
        });
      })
      .catch(({ error }) => {
        console.log(error);
      });
  }

  render() {
    if (!this.state.album) {
      return (
        <View style= {styles.container}>
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
            {this.state.album.map((photo, i) => (
              <ListItem
              key={i}
              title={photo.title}
              subtitle={
                <View style={styles.subtitleView}>
                  <Image
                    style={styles.ratingImage}
                    source={{uri:'https://farm1.staticflickr.com/2/1418878_1e92283336_m.jpg'}}
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
    flex:1,
    flexDirection: 'column'
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 100,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  }
});
