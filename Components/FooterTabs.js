import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const FooterTabs = ({ selectedTab, setSelectedTab, navigation }) => {

    return (
        <View style={styles.bottomNav}>
            <TouchableOpacity
                style={[styles.tab, selectedTab === 'Área' && styles.activeTab]}
                onPress={() => {
                    setSelectedTab('Área');
                    navigation.navigate('Home');
                }}
            >
                <Text style={selectedTab === 'Área' ? styles.activeText : styles.tabText}>Área</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.tab, selectedTab === 'Atividades' && styles.activeTab]}
                onPress={() => {
                    setSelectedTab('Atividades');
                    navigation.navigate('Atividades', { grupo: 'Manual' });
                }}
            >
                <Text style={selectedTab === 'Atividades' ? styles.activeText : styles.tabText}>Atividades</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.tab, selectedTab === 'Histórico' && styles.activeTab]}
                onPress={() => {
                    setSelectedTab('Histórico');
                    navigation.navigate('Histórico');
                }}
            >
                <Text style={selectedTab === 'Histórico' ? styles.activeText : styles.tabText}>Histórico</Text>
            </TouchableOpacity>


        </View>
    );
};

const styles = StyleSheet.create({
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ddd',
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

export default FooterTabs;
