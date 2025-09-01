import React, { useState } from 'react';
import FooterTabs from './FooterTabs';
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';

const muscleGroups = [
    { label: 'Braços', color: '#7e57c2' },
    { label: 'Abdômen', color: '#aa49e2ff' },
    { label: 'Peito', color: '#7e57c2' },
    { label: 'Glúteos', color: '#aa49e2ff' },
    { label: 'Costas', color: '#7e57c2' },
    { label: 'Quadris', color: '#aa49e2ff' },
];

const HomeScreen = ({ navigation }) => {
    const [selectedTab, setSelectedTab] = useState('Área');
    const renderButton = ({ item }) => (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: item.color }]}
            onPress={() => navigation.navigate('Atividades', { grupo: item.label })}
        >
            <Text style={styles.buttonText}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <Image source={require('../assets/favicon.png')} style={{ width: 24, height: 24 }} />
                <Text style={styles.title}>Workout</Text>
            </View>

            <Text style={styles.text}>Selecione o que treinou hoje!</Text>

            <FlatList
                data={muscleGroups}
                renderItem={renderButton}
                keyExtractor={(item) => item.label}
                numColumns={2}
                contentContainerStyle={styles.grid}
            />

            <FooterTabs
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                navigation={navigation}
            />

        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },

    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        elevation: 1,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },

    text: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10
    },

    grid: {
        padding: 5,
        gap: 5
    },

    button: {
        flex: 1,
        margin: 6,
        padding: 10,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%',
    },

    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600'
    },

    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },

    tab: {
        paddingVertical: 1,
        paddingHorizontal: 1
    },

    tabText: {
        fontSize: 16,
        color: '#888'
    },

    activeTab: {
        borderBottomWidth: 2,
        borderColor: '#000'
    },

    activeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
});

export default HomeScreen;
