import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { List, Button, Card } from "react-native-elements";
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
        "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photoset_id=" +
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
            {this.state.photos.map((photo, i) => (
              <Card
                key={i}
                title={photo.title}
                image={{
                  uri: this.getPhotoURL(
                    photo.farm,
                    photo.server,
                    photo.id,
                    photo.secret
                  )
                }}
                imageProps={{ resizeMode: "cover" }}
              >
                <Button
                  title="View Now"
                  titleStyle={{ fontWeight: "700" }}
                  color="rgba(92, 99,216, 1)"
                  buttonStyle={{
                    backgroundColor: "#ffff",
                    width: 150,
                    alignSelf: "center",
                    height: 45,
                    borderColor: "rgba(92, 99,216, 1)",
                    borderWidth: 1,
                    borderRadius: 5
                  }}
                  onPress={() =>
                    this.props.navigation.navigate("PhotoSelected", {
                      photo: this.getPhotoURL(
                        photo.farm,
                        photo.server,
                        photo.id,
                        photo.secret
                      ),
                      photoId: photo.id
                    })
                  }
                />
              </Card>
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
