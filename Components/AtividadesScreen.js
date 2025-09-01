import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import FooterTabs from './FooterTabs';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
} from 'react-native';


const AtividadesScreen = ({ route, navigation }) => {
    const { grupo } = route.params;
    const [nomeExercicio, setNomeExercicio] = useState('');
    const [tempo, setTempo] = useState('');
    const [repeticoes, setRepeticoes] = useState('');
    const [series, setSeries] = useState('');
    const [selectedTab, setSelectedTab] = useState('Atividades');

    const handleSalvar = async () => {
        if (!nomeExercicio || !tempo || !repeticoes || !series) {
            alert('Preencha todos os campos!');
            return;
        }

        const atividade = {
            grupo,
            nomeExercicio,
            tempo,
            repeticoes,

            series,
            data: new Date().toISOString(),
        };

        try {
            const historico = await AsyncStorage.getItem('atividades');
            const atividades = historico ? JSON.parse(historico) : [];
            atividades.push(atividade);
            await AsyncStorage.setItem('atividades', JSON.stringify(atividades));
            alert('Atividade salva com sucesso!');
        } catch (error) {
            alert('Erro ao salvar atividade');
        }
    };

    return (
        <View style={styles.wrapper}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Atividade: {grupo}</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nome do exercício"
                    value={nomeExercicio}
                    onChangeText={setNomeExercicio}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Tempo (min)"
                    keyboardType="numeric"
                    value={tempo}
                    onChangeText={setTempo}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Repetições"
                    keyboardType="numeric"
                    value={repeticoes}
                    onChangeText={setRepeticoes}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Séries"
                    keyboardType="numeric"
                    value={series}
                    onChangeText={setSeries}
                />
                <TouchableOpacity style={styles.Button} onPress={handleSalvar}>
                    <Text style={styles.ButtonText}>Salvar</Text>
                </TouchableOpacity>

            </ScrollView>

            <FooterTabs
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                navigation={navigation}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },

    container: {
        padding: 10,
        paddingBottom: 80
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20
    },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
    },

    Button: {
        backgroundColor: '#703394ff',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 12,
    },

    ButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

});

export default AtividadesScreen;
