// Components/Search.js
import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, ActivityIndicator } from 'react-native';
import FilmItem from './FilmItem';
import { searchFilmsFromAPI } from '../API/api_conf'

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.inputText = "";
        this.currentPage = 0;
        this.totalPage = 0;
        this.state = {
            films: [],
            isLoading: false
        };
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
        if(this._searchInputTextChanged.length > 0) {
            this.setState({isLoading: true});
            searchFilmsFromAPI(this.inputText, this.currentPage+1).then(data => {
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
    }

    _displayLoading() {
        if(this.state.isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large"/>
                </View>
            );
        }
    }

    _loadNextFilms() {
        if (this.currentPage < this.totalPage) {
            this._loadFilms();
        }
    }
    _displayFilmDetail = (id) => {
        console.log("Display Detail id : "+id);
        this.props.navigation.navigate("FilmDetail", {id: id});
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
                    <TouchableOpacity 
                    style={styles.buttonFind} 
                    onPress={() => this._searchFilms()}
                    >
                        <Text style={styles.buttonText}>Chercher</Text>
                    </TouchableOpacity>    
                </View>
                 <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item} displayFilmDetail={this._displayFilmDetail} />}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => this._loadNextFilms()}
                 />
                {this._displayLoading()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginBottom: 20
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
        alignItems:"center",
        textAlignVertical: "center",
        backgroundColor: "#000000"
    },
    buttonText: {
        color: "white"
    }
});

export default Search