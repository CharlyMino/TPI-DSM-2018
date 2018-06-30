import React from "react";
import { createStackNavigator } from "react-navigation";

import DirectoryList from "./Components/album-list";
import PhotoAlbumList from "./Components/album-photo-list";
import MenuBar from "./Components/menu-bar";
import Photo from './Components/photo';
import Comment from './Components/comment';

export const Navigator = createStackNavigator(
  {
    AlbumList: {
      screen: DirectoryList,
      navigationOptions: {
        header: <MenuBar header="Albums" />
      }
    },
    PhotoList: {
      screen: PhotoAlbumList,
      navigationOptions: {
        header: <MenuBar header="Album Photos"/>
      }
    },
    PhotoSelected: {
      screen: Photo,
      navigationOptions:{
          header: <MenuBar header="Photo"/>
      }
    },
    CommentSelected: {
        screen: Comment,
        navigationOptions:{
            header: <MenuBar header="Comment"/>
        }
    }
  },
  {
    initialRouteName: "AlbumList"
  }
);
