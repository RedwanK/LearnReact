// Components/Search.js
import React from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native';
import films from '../Helpers/filmsData';

class Search extends React.Component {
    render() {
        return (
            <View style={styles.mainContainer}>
                <TextInput
                 style={styles.textInput}
                 placeholder='Titre du film'/>
                <Button 
                 title='Rechercher' 
                 onPress={() => {}}
                 color="red"/>
                 <FlatList
                    data={films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <Text>{item.title}</Text>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 50,
        marginBottom: 20
    },
    textInput: {
        marginLeft: 5, 
        marginRight: 5, 
        height: 50, 
        borderColor: '#000000', 
        borderWidth: 1, 
        paddingLeft: 5 
    }
});

export default Search