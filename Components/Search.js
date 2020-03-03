// Components/Search.js
import React from 'react';
import {StyleSheet, View, TextInput, ActivityIndicator} from 'react-native';
import FilmList from './FilmList';
import {searchFilmsFromAPI} from '../API/api_conf';
import {connect} from 'react-redux';

// On connecte le store Redux, ainsi que les films favoris du state de notre application, à notre component Search
const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
};

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.inputText = "";
        this.currentPage = 0;
        this.totalPage = 0;
        this.typingTimer = null;
        this.typingInterval = 300; //1.0s
        this.state = {
            films: [],
            isLoading: false
        };

        this._loadFilms = this._loadFilms.bind(this);
        this._searchFilms = this._searchFilms.bind(this);
    }

    _searchFilms() {
        this.currentPage = 0;
        this.totalPage = 0;
        this.setState({
                          films: [],
                          isLoading: false
                      }, () => this._loadFilms());
    }

    _loadFilms() {
        if (this.inputText.length > 0) {
            this.setState({isLoading: true});
            searchFilmsFromAPI(this.inputText, this.currentPage + 1).then(data => {
                this.currentPage = data.page;
                this.totalPage = data.total_pages;
                this.setState({
                                  films: this.state.films.concat(data.results),
                                  isLoading: false
                              });
            });
        }
    }

    _searchInputTextChanged(text) {
        this.inputText = text;
        clearTimeout(this.typingTimer);
        if (text) {
            this.typingTimer = setTimeout(this._searchFilms, this.typingInterval);
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large"/>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.searchBarContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Titre du film'
                        onChangeText={(text) => this._searchInputTextChanged(text)}
                        onSubmitEditing={() => this._searchFilms()}
                    />
                </View>
                <FilmList
                    films={this.state.films}
                    navigation={this.props.navigation}
                    loadFilms={this._loadFilms}
                    currentPage={this.currentPage}
                    totalPages={this.totalPage}
                    isFavoriteList={false}
                />
                {this._displayLoading()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
                                     mainContainer: {
                                         flex: 1,
                                         marginBottom: 0
                                     },
                                     textInput: {
                                         marginLeft: 5,
                                         marginRight: 5,
                                         height: 50,
                                         borderColor: '#000000',
                                         borderWidth: 1,
                                         paddingLeft: 5,
                                         flex: 7
                                     },
                                     loadingContainer: {
                                         position: "absolute",
                                         left: 0,
                                         right: 0,
                                         top: 55,
                                         bottom: 0,
                                         alignItems: 'center',
                                         justifyContent: 'center',
                                         backgroundColor: 'white',
                                         opacity: 0.7
                                     },
                                     searchBarContainer: {
                                         flexDirection: 'row',
                                         justifyContent: 'space-between',
                                         padding: 5
                                     },
                                     buttonFind: {
                                         flex: 2,
                                         justifyContent: "center",
                                         alignItems: "center",
                                         textAlignVertical: "center",
                                         backgroundColor: "#000000"
                                     },
                                     buttonText: {
                                         color: "white"
                                     }
                                 });

export default connect(mapStateToProps)(Search)
