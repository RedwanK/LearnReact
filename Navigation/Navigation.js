//Navigation/Navigation.js

import * as React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetail';
import Favorites from '../Components/Favorites';
import {Image, StyleSheet} from "react-native";

const MoviesTabNavigator = createBottomTabNavigator();
const SearchStackNavigator = createStackNavigator();
const FavoritesStackNavigator = createStackNavigator();

function SearchStackScreen() {
    return (
        <SearchStackNavigator.Navigator>
            <SearchStackNavigator.Screen
                name="Search"
                component={Search}
                options={
                    {
                        title: "Rechercher"
                    }
                }
            />
            <SearchStackNavigator.Screen
                name="FilmDetail"
                component={FilmDetail}
                options={
                    {
                        title: "Détail du film"
                    }
                }
            />
        </SearchStackNavigator.Navigator>
    );
}

function FavoritesStackScreen() {
    return (
        <FavoritesStackNavigator.Navigator>
            <FavoritesStackNavigator.Screen
                name="Favoris"
                component={Favorites}
                options={
                    {
                        title: "Mes Favoris"
                    }
                }
            />
            <FavoritesStackNavigator.Screen
                name="FilmDetail"
                component={FilmDetail}
                options={
                    {
                        title: "Détail du film"
                    }
                }
            />
        </FavoritesStackNavigator.Navigator>
    );

}

function mainTab() {
    return (
        <NavigationContainer>
            <MoviesTabNavigator.Navigator
                initialRouteName="Rechercher"
                tabBarOptions={{
                    activeBackgroundColor: '#DDDDDD',
                    inactiveBackgroundColor: '#FFFFFF',
                    showLabel: false
                }}
            >
                <MoviesTabNavigator.Screen
                    name="Rechercher"
                    component={SearchStackScreen}
                    options={
                        {
                            tabBarLabel: 'Rechercher',
                            tabBarIcon: () => {
                                return (
                                    <Image source={require('../assets/search.png')} style={styles.navIcon}/>
                                )
                            }
                        }
                    }
                />
                <MoviesTabNavigator.Screen
                    name="Favoris"
                    component={FavoritesStackScreen}
                    options={
                        {
                            tabBarLabel: 'Favoris',
                            tabBarIcon: () => {
                                return (
                                    <Image source={require('../assets/fav.png')} style={styles.navIcon}/>
                                )
                            }
                        }
                    }
                />
            </MoviesTabNavigator.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
                                     navIcon: {
                                         width: 30,
                                         height: 30
                                     }
                                 });

export default mainTab;
