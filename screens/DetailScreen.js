import { View, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

// "route" er den anden prop Stack.Navigator sender med
// route.params indeholder det, BrowseScreen sendte via navigate().
// funktionen modtager route som prop, og destrukturerer listing ud af route.params.
export default function DetailScreen({ route }) {
  // henter den annonce som blev sendt med fra BrowseScreen.
  const { listing } = route.params;

  // her vises bare de forskellige felter fra listing-objektet,
  // ingen state eller logik nødvendig, det er kun en visning.
  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.heading}>{listing.title}</Text>
      <Text style={globalStyles.price}>{listing.price} kr</Text>

      <Text style={[globalStyles.label, { marginTop: 16 }]}>Kategori</Text>
      <Text style={globalStyles.muted}>{listing.category}</Text>

      <Text style={globalStyles.label}>Beskrivelse</Text>
      <Text style={globalStyles.muted}>{listing.description}</Text>
    </View>
  );
}
