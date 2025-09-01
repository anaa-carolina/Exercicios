import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Components/HomeScreen';
import AtividadesScreen from './Components/AtividadesScreen';
import HistoricoScreen from './Components/HistoricoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Atividades" component={AtividadesScreen} />
        <Stack.Screen name="Histórico" component={HistoricoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
