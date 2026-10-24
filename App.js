import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BrowseScreen from './screens/BrowseScreen';
import DetailScreen from './screens/DetailScreen';
import CreateListingScreen from './screens/CreateListingScreen';
import MyPageScreen from './screens/MyPageScreen';
import { colors } from './styles/colors';

// createNativeStackNavigator giver os Stack.Navigator/Stack.Screen,
// som holder styr på hvilken screen der vises og navigations-historikken.
// Stack betyder her at screens lægger sig oven på hinanden, ligesom en stak papir,
// og man kan gå "tilbage" for at fjerne det øverste screen igen.
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // NavigationContainer skal altid pakke hele navigations, træet ind.
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        // screenOptions gælder som standard for ALLE screens i navigatoren.
        screenOptions={{
          headerStyle: { backgroundColor: colors.forestGreen },
          headerTintColor: colors.cream,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* "name" er det navn man bruger i navigation.navigate('Detail', ...) */}
        <Stack.Screen
          name="Browse"
          component={BrowseScreen}
          options={{ title: 'ByggeBytte' }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: 'Annonce' }}
        />
        <Stack.Screen
          name="CreateListing"
          component={CreateListingScreen}
          options={{ title: 'Opret annonce' }}
        />
        <Stack.Screen
          name="MyPage"
          component={MyPageScreen}
          options={{ title: 'Min side' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
