import React from "React";
import { Image, View, StyleSheet, ScrollView, Linking, Dimensions } from "react-native";
import { List, ListItem, Button } from "react-native-elements";
import axios from "axios";

export default class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.photoId = this.props.navigation.getParam("photoId");
    this.state = {
      comments: null
    };
    this.getComments();
    this.url = null;
    this.width = Dimensions.get('window').width-2;
    this.height = Dimensions.get('window').height * 0.5;
  }

  getComments() {
    axios
      .get(
        "https://api.flickr.com/services/rest/?method=flickr.photos.comments.getList&api_key=6e8a597cb502b7b95dbd46a46e25db8d&photo_id=" +
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


  generateURL(photoId){
    return 'https://www.flickr.com/photos/25771860%40N03' + '/' + photoId
  }


  render() {
    if (!this.state.comments) {
      return (
        <View style={styles.loadingContainer}>
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
        <ScrollView style={styles.comments}>
          <Image
            style={{width: this.width, height:this.height, alignSelf: 'center'}}
            source={{ uri: this.props.navigation.getParam("photo") }}
          />
          <Button
            title="View on browser"
            titleStyle={{ fontWeight: "700" }}
            onPress={() =>{ Linking.openURL(this.generateURL(this.photoId)) } }
            buttonStyle={styles.ViewOnBrowserButton
            

            }
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
    loadingContainer: {
      flex: 1,
      backgroundColor: "#ffff",
      alignItems: "center",
      justifyContent: "center"
  },
    ViewOnBrowserButton: {
      backgroundColor: "rgba(92, 99,216, 1)",
      width: 300,
      height: 45,
      marginTop: 5,
      borderColor: "transparent",
      borderWidth: 0,
      borderRadius: 5,
      alignItems: "center",
      alignSelf: "center",
    }
  }
);
