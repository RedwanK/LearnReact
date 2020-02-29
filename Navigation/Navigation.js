//Navigation/Navigation.js

import * as React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import {createAppContainer} from 'react-navigation'
import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetail';
import Favorites from '../Components/Favorites';

const SearchStackNavigator = createStackNavigator({
  Search: {
      screen: Search,
      navigationOptions: {
          title: "Rechercher"
      }
  },
  FilmDetail: {
      screen: FilmDetail,
      navigationOptions: {
          title: "Détails du film"
      }
  }
});

const MoviesTabNavigator = createBottomTabNavigator();

function mainTab() {
    return(
        <NavigationContainer>
            <MoviesTabNavigator.Navigator initialRouteName="Rechercher">
                <MoviesTabNavigator.Screen name="Rechercher" component={Search} />
                <MoviesTabNavigator.Screen name="Favoris" component={Favorites} />
            </MoviesTabNavigator.Navigator>
        </NavigationContainer>

    )
}

export default MoviesTabNavigator;
