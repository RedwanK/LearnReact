// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromAPI } from '../API/api_conf'

class FilmItem extends React.Component {

    _displayFavoriteImage() {
        if (this.props.isFilmFavorite) {
            // Si la props isFilmFavorite vaut true, on affiche le 🖤
            return (
                <Image
                    style={styles.favorite_image}
                    source={require('../assets/fav.png')}
                />
            )
        }
    }

  render() {
    const film = this.props.film;
    const displayFilmDetail = this.props.displayFilmDetail;
    return (
      <TouchableOpacity
          style={styles.mainContainer}
          onPress={() => displayFilmDetail(film.id)}>
          <Image
            style={styles.filmImage}
            source={{uri: getImageFromAPI(film.poster_path)}}
          />
          <View style={styles.filmDescription}>
            <View style={styles.descriptionHeader}>
                <Text style={styles.titleText}>{film.title}</Text>
                <Text style={styles.voteText}>{film.vote_average}</Text>
            </View>
            <View style={styles.descriptionContent}>
                <Text style={styles.descriptionText} numberOfLines={6}>{film.overview}</Text>
            </View>
            <View style={styles.descriptionFooter}>

                <Text style={styles.dateText}>
                    {this._displayFavoriteImage()} Sorti le {film.release_date}</Text>
            </View>
          </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
      height: 190,
      flexDirection: "row",
      marginBottom: 2,
      backgroundColor: "white"
  },
  filmImage: {
        flex: 1,
        margin: 5
  },
  filmDescription: {
      flex: 2,
      flexDirection: "column",
      justifyContent: "space-between",
      margin: 5
  },
  descriptionHeader: {
      flexDirection: "row",
      flex: 3
  },
  descriptionContent: {
      flex: 7
  },
  descriptionFooter: {
      flex: 1
  },
  titleText: {
      fontWeight: "bold",
      fontSize: 20,
      flex: 1,
      flexWrap: "wrap"
  },
  voteText: {
      fontWeight: "bold",
      fontSize: 26,
      color: "#666666"
  },
  descriptionText: {
      fontStyle: 'italic',
      color: "#666666"
  },
  dateText: {
      textAlign: 'right',
      fontSize: 14
  },
  favorite_image: {
      width: 15,
      height: 15
  }
});

export default FilmItem
