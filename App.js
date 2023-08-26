
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, Text } from 'react-native';
import { UserProvider } from './components/Context/UserContext';
import { GeoProvider } from './components/Context/GeoContext';
import { GeoAdressProvider } from './components/Context/GeoAdressContext';
import { ServiceProvider } from './components/Context/ServiceContext';
import Start from './components/Start';
import Home from './components/Home/Home';
import RegisterPhoneScreen from './components/Auth/Register/RegisterPhoneScreen';
import RegisterDataScreen from './components/Auth/Register/RegisterDataScreen';
import Login from './components/Auth/Login/Login';
import RequestCodeScreen from './components/Auth/Restore/RequestCodeScreen';
import ResetPasswordScreen from './components/Auth/Restore/ResetPasswordScreen';
import ResetPassCode from './components/Auth/Restore/ResetPassCode';
import VisicomSearchWithSuggestions from './components/Home/Suggestion/VisicomSearchWithSuggestions';
import CalculateCostButton from './components/Home/Cost/CalculateCostButton';
import ServicesSelection from './components/Home/Cost/ServicesSelection';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <UserProvider>
        <GeoAdressProvider>    
          <GeoProvider>
            <ServiceProvider>
              <StatusBar />
              <Stack.Navigator
                screenOptions={{
                  headerShown: false, // Приховати заголовок та стрілку "назад"
                }}
              >
                <Stack.Screen name="Start" component={Start} />
                <Stack.Screen name="RegisterPhone" component={RegisterPhoneScreen} />
                <Stack.Screen name="RegisterData" component={RegisterDataScreen} />        
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="RequestCodeScreen" component={RequestCodeScreen} />
                <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
                <Stack.Screen name="ResetPassCode" component={ResetPassCode} />
                <Stack.Screen name="VisicomSearchWithSuggestions" component={VisicomSearchWithSuggestions} />
                <Stack.Screen name="CalculateCostButton" component={CalculateCostButton} />
                <Stack.Screen name="ServicesSelection" component={ServicesSelection} />
              </Stack.Navigator>
            </ServiceProvider>
          </GeoProvider>
        </GeoAdressProvider>
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;