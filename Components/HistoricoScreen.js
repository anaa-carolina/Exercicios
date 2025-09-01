import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FooterTabs from './FooterTabs';
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

const HistoricoScreen = ({ navigation }) => {
    const [atividades, setAtividades] = useState([]);
    const [selectedTab, setSelectedTab] = useState('Histórico');

    useEffect(() => {
        const carregarAtividades = async () => {
            try {
                const historico = await AsyncStorage.getItem('atividades');
                const dados = historico ? JSON.parse(historico) : [];
                setAtividades(dados.reverse());
            } catch (error) {
                alert('Erro ao carregar histórico');
            }
        };

        const unsubscribe = navigation.addListener('focus', carregarAtividades);
        return unsubscribe;
    }, [navigation]);

    const handleApagar = async (index) => {
        try {
            const novoHistorico = [...atividades];
            novoHistorico.splice(index, 1);
            await AsyncStorage.setItem('atividades', JSON.stringify(novoHistorico.reverse()));
            setAtividades(novoHistorico);
        } catch (error) {
            alert('Erro ao apagar atividade');
        }
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.card}>
            <Text style={styles.grupo}>{item.grupo}</Text>
            <Text style={styles.nome}>{item.nomeExercicio}</Text>
            <Text style={styles.info}>
                ⏱ {item.tempo} min | 🔁 {item.repeticoes} reps | 📦 {item.series} séries
            </Text>
            <Text style={styles.data}>{new Date(item.data).toLocaleString()}</Text>

            <TouchableOpacity style={styles.apagarBtn} onPress={() => handleApagar(index)}>
                <Text style={styles.apagarTexto}>🗑 Apagar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.title}>Histórico de Atividades</Text>

                {atividades.length === 0 ? (
                    <Text style={styles.empty}>Nenhuma atividade registrada ainda.</Text>
                ) : (
                    <FlatList
                        data={atividades}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 100 }}
                    />
                )}
            </View>

            <View style={styles.footer}>
                <FooterTabs
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                    navigation={navigation}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        position: 'relative',
    },
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    empty: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 40,
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 2,
    },
    grupo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#703394',
    },
    nome: {
        fontSize: 16,
        marginTop: 4,
    },
    info: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
    data: {
        fontSize: 12,
        color: '#999',
        marginTop: 6,
    },
    apagarBtn: {
        marginTop: 10,
        alignSelf: 'flex-end',
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#e53935',
        borderRadius: 6,
    },
    apagarTexto: {
        color: '#fff',
        fontWeight: 'bold',
    },
    footer: {
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
});

export default HistoricoScreen;
