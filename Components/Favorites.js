// Components/Favorites.js

import React from 'react'
import {StyleSheet} from 'react-native'
import {connect} from 'react-redux';
import FilmList from "./FilmList";

// On connecte le store Redux, ainsi que les films favoris du state de notre application, à notre component Search
const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
};

class Favorites extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        }
    }


    render() {
        return (
            <FilmList
                films={this.props.favoritesFilm}
                navigation={this.props.navigation}
                loadFilms={this._loadFilms}
                currentPage={this.currentPage}
                totalPages={this.totalPage}
                isFavoriteList={true}
            />
        )
    }
}

const styles = StyleSheet.create({});

export default connect(mapStateToProps)(Favorites);
