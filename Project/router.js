import React from "react";
import { createStackNavigator } from "react-navigation";

import DirectoryList from "./Components/album-list";
import PhotoAlbumList from "./Components/album-photo-list";
import MenuBar from "./Components/menu-bar";

export const Navigator = createStackNavigator(
  {
    AlbumList: {
      screen: DirectoryList,
      navigationOptions: {
        header: (<MenuBar/>),
      }
    },
    PhotoList: { screen: PhotoAlbumList,
    navigationOptions: {
        header: (<MenuBar/>)
    } }
  },
  {
    initialRouteName: "AlbumList"
  }
);
