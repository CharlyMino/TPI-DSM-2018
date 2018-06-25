import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      prueba: null,
    }
  }
  getListado() {
    axios.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=8b132a055df5bd398bb19f0e62276514&user_id=68142425%40N05&format=json&nojsoncallback=1&api_sig=782ff58edc4a9e21d9b26397ec7350de')
    .then(({data}) =>{
      this.setState({
        prueba: data.photosets.photoset[0].primary
      })
    }).catch(({error}) => {console.log(error)});
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.getListado()}</Text>
        <Text>{this.state.prueba}</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
