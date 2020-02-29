//Components/FilmDetail.js

import React from 'react';
import {StyleSheet, View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image} from  'react-native';
import { Card, Badge } from 'react-native-elements';
import {getFilmDetail, getImageFromAPI} from '../API/api_conf';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
      }
}

class FilmDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            film: undefined,

            isLoading: true
        }
    }

    _toggleFavorite() {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.film };
        this.props.dispatch(action);
    }

    componentDidMount() {
        getFilmDetail(this.props.navigation.state.params.id).then(data => {
            this.setState({
                film: data,
                isLoading: false
            });
        })
    }

    componentDidUpdate() {
        console.log("componentDidUpdate : ");
        console.log(this.props.favoritesFilm);
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

    _displayFavoriteImage() {
        var sourceImage = require('../assets/nofav.png');
        if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
            // Film dans nos favoris
            sourceImage = require('../assets/fav.png')
        }
        return (
            <Image
                style={styles.favorite_image}
                source={sourceImage}
            />
        )
    }

    _displayFilm() {
        if (this.state.film != undefined) {
            const film = this.state.film;
            return (
                <ScrollView style={styles.scrollviewContainer}>
                    <Card
                    title={film.original_title}
                    image={{uri: getImageFromAPI(film.backdrop_path)}}>
                        <View style={styles.infobar}>
                            <View style={styles.genresContainer}>
                                {
                                    film.genres.map((value, key) => (
                                        <Text style={styles.genreBadge}>{value.name}</Text>
                                    ))
                                }
                            </View>
                            <View style={styles.noteContainer}>
                                <Text style={styles.note}>{film.vote_average}/10</Text>
                                <Text style={styles.voteCount}> | {film.vote_count} avis </Text>
                            </View>
                        </View>
                        <View style={styles.popularityContainer}>
                            <TouchableOpacity
                                style={styles.favorite}
                                onPress={() => this._toggleFavorite()}>
                                {this._displayFavoriteImage()}
                            </TouchableOpacity>
                            <Text style={styles.popularity}>Recommandé à {film.popularity}%</Text>
                        </View>
                        <Text style={styles.descriptionText}>
                            {film.overview}
                        </Text>

                        <View style={styles.extraInfo}>
                            <View style={styles.infoLine}>
                                <Text style={styles.infoLineHeader}>
                                    Production
                                </Text>
                                <View>
                                    {
                                        film.production_companies.map((value, key) => (
                                            <Text style={styles.infoLineInfo}>
                                                {value.name}
                                            </Text>
                                        ))
                                    }
                                </View>
                            </View>
                            <View style={styles.infoLine}>
                                <Text style={styles.infoLineHeader}>
                                    Date de sortie
                                </Text>
                                <Text style={styles.infoLineInfo}>
                                    {moment(new Date(film.release_date)).format('DD/MM/YYYY')}
                                </Text>
                            </View>

                            <View style={styles.infoLine}>
                                <Text style={styles.infoLineHeader}>
                                    Budget
                                </Text>
                                <Text style={styles.infoLineInfo}>
                                    {numeral(film.budget).format('0,0[.]00 $')}
                                </Text>
                            </View>
                            <View style={styles.infoLine}>
                                <Text style={styles.infoLineHeader}>
                                    Revenus générés
                                </Text>
                                <Text style={styles.infoLineInfo}>
                                    {numeral(film.revenue).format('0,0[.]00 $')}
                                </Text>
                            </View>
                        </View>

                    </Card>
                </ScrollView>
            );
        }
    }

    render() {
        console.log(this.props);
        return (
            <View style={styles.mainContainer}>
                {this._displayLoading()}
                {this._displayFilm()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    loadingContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        opacity: 0.7
    },
    scrollviewContainer: {
        flex: 1
    },
    descriptionText: {
        fontStyle: 'italic',
        color: "#666666",
        textAlign: "justify"
    },
    infobar: {
        flex: 1,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: "#999999",
        paddingBottom: 10,
        marginBottom: 10
    },
    genresContainer: {
        flex: 3,
        flexDirection: "row",
        justifyContent: "flex-start",

    },
    genreBadge: {
        padding: 6,
        color: '#999999',
        borderStyle: 'solid',
        borderColor: '#999999',
        borderWidth: 1,
        borderRadius: 20,
        marginRight: 4,
        textAlign: "center",
        fontSize: 10
    },
    noteContainer: {
        flex: 2,
        flexDirection: "row",
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    voteCount:{
        fontSize: 10,
        color : "#999999",
        fontStyle: 'italic'
    },
    note: {
        fontWeight: 'bold',
        color: "#666666"
    },
    badge: {
        backgroundColor: 'gray'
    },
    popularityContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    popularity: {
        color: "#999999",
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10
    },
    infoLine: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: "#999999",
        marginBottom: 5
    },
    infoLineHeader: {
        fontWeight: 'bold',
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoLineInfo: {
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'right'
    },
    favorite_image: {
        width: 30,
        height: 30
    },
    favorite: {
        flex : 1
    }
});

export default connect(mapStateToProps)(FilmDetail)
