// Components/FilmItem.js

import React from 'react'
import {StyleSheet, FlatList} from 'react-native'
import FilmItem from "./FilmItem";
import {connect} from 'react-redux';


class FilmList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            films: []
        }
    }

    _displayFilmDetail = (id) => {
        this.props.navigation.navigate("FilmDetail", {id: id});
    };

    render() {
        return (
            <FlatList
                data={this.props.films}
                extraData={this.props.favoritesFilm}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) =>
                    <FilmItem
                        film={item}
                        displayFilmDetail={this._displayFilmDetail}
                        isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1)}
                    />
                }
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if ((this.props.currentPage < this.props.totalPages) && !this.props.isFavoriteList) {
                        this.props.loadFilms()
                    }
                }
                }

            />
        );
    }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
};

export default connect(mapStateToProps)(FilmList)
