import React from "React";
import { Image, View, StyleSheet, ScrollView, Text } from "react-native";
import { List, ListItem } from "react-native-elements";
import axios from "axios";

export default class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.photoId = this.props.navigation.getParam("photoId");
    this.state = {
      comments: null
    };
    this.getComments();
  }

  getComments() {
    axios
      .get(
        "https://api.flickr.com/services/rest/?method=flickr.photos.comments.getList&api_key=b1b891993540a0a16824aa1325b151ba&photo_id=" +
          this.photoId +
          "&format=json&nojsoncallback=1"
      )
      .then(({ data }) => {
        this.setState({
          comments: data.comments.comment
        });
      })
      .catch(({ error }) => {
        console.log(error);
      });
  }

  render() {
    if (!this.state.comments) {
      return (
        <View style={styles.container}>
          <Text>Loading, please wait...}</Text>
        </View>
      );
    } else {
      return (
        <ScrollView style={styles.comments}>
          <Image
            style={styles.image}
            source={{ uri: this.props.navigation.getParam("photo") }}
          />
            <List>
              {this.state.comments.map((comment, i) => (
                <ListItem
                  key={i}
                  title={comment.authorname}
                  subtitle={comment._content}
                  onPress = {() => {this.props.navigation.navigate('CommentSelected', {
                      author: comment.authorname,
                      content: comment._content
                  })}}
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
    flexDirection: "column"
  },
  image: {
    width: 425,
    height: 425,
    flex: 1,
    flexDirection: "column",
    alignSelf: "center"
  },
});
