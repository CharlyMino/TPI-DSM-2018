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
        header: <MenuBar />
      }
    },
    PhotoList: {
      screen: PhotoAlbumList,
      navigationOptions: {
        header: <MenuBar />
      }
    },
    PhotoSelected: {
      screen: Photo,
      navigationOptions:{
          header: <MenuBar />
      }
    },
    CommentSelected: {
        screen: Comment,
        navigationOptions:{
            header: <MenuBar />
        }
    }
  },
  {
    initialRouteName: "AlbumList"
  }
);
