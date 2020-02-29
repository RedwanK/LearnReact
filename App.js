// App.js

import React from 'react'
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import Search from "./Components/Search";
import Favorites from "./Components/Favorites";
import {NavigationContainer} from "@react-navigation/native";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <NavigationContainer>
          <Navigation.Navigator initialRouteName="Rechercher">
            <Navigation.Screen name="Rechercher" component={Search} />
            <Navigation.Screen name="Favoris" component={Favorites} />
          </Navigation.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}
