
// her importeres React og de komponenter vi skal bruge i denne fil.
import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { listings } from '../data/listings';
import { globalStyles } from '../styles/globalStyles';

// "navigation" bliver automatisk sendt med som property af Stack.Navigator,
// og giver adgang til navigation.navigate() for at skifte skræm.
export default function BrowseScreen({ navigation }) {
  // Filter tilstand: false = vis alt, true = vis kun byggematerialer.
  const [showOnlyMaterials, setShowOnlyMaterials] = useState(false);

  // Beregnes ved hvert render ud fra state, ingen ekstra kopi af data gemmes.
  // denne funktion viser dermed kun de annoncer som er byggematerialer, hvis showOnlyMaterials er true.
  const dataToShow = showOnlyMaterials
    ? listings.filter((item) => item.isBuildingMaterial)
    : listings;

  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.heading}>ByggeBytte</Text>

      {/* Toggler filter-state frem og tilbage ved hvert tryk */}
      <TouchableOpacity
        style={globalStyles.buttonOutline}
        onPress={() => setShowOnlyMaterials(!showOnlyMaterials)}
      >
        <Text style={globalStyles.buttonOutlineText}>
          {showOnlyMaterials
            ? 'Vis alle annoncer'
            : 'Filtrer: Kun byggematerialer'}
        </Text>
      </TouchableOpacity>

      {/* FlatList render kun de elementer der er synlige på skærmen - */}
      {/* bedre til lange lister end at mappe listen manuelt. */}
      <FlatList
        data={dataToShow}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={globalStyles.card}
            // Sender hele annoncen med som param, så DetailScreen
            // kan hente den igen via route.params.
            onPress={() => navigation.navigate('Detail', { listing: item })}
          >
            <Text style={globalStyles.cardTitle}>{item.title}</Text>
            <Text style={globalStyles.cardMeta}>{item.category}</Text>
            <Text style={globalStyles.price}>{item.price} kr</Text>
          </TouchableOpacity>
        )}
      />

      {/* Navigerer til formular-screenet uden nogen params */}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('CreateListing')}
      >
        <Text style={globalStyles.buttonText}>+ Opret annonce</Text>
      </TouchableOpacity>
    </View>
  );
}
