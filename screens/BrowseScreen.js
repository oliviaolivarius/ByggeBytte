
// her importeres React og de komponenter vi skal bruge i denne fil.
import { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { addDoc, collection, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { listings } from '../data/listings';
import { globalStyles } from '../styles/globalStyles';
import { db } from '../firebaseConfig';
import { getFavoriteIds, toggleFavorite } from '../utils/favorites';

// "navigation" bliver automatisk sendt med som property af Stack.Navigator,
// og giver adgang til navigation.navigate() for at skifte skræm.
export default function BrowseScreen({ navigation }) {
  // Filter tilstand: false = vis alt, true = vis kun byggematerialer.
  const [showOnlyMaterials, setShowOnlyMaterials] = useState(false);
  const [databaseListings, setDatabaseListings] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'listings'), async (snapshot) => {
      if (snapshot.empty) {
        await Promise.all(
          listings.map((listing) =>
            addDoc(collection(db, 'listings'), {
              ...listing,
              createdAt: serverTimestamp(),
            })
          )
        );
        return;
      }

      const firestoreListings = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setDatabaseListings(firestoreListings);
    });

    getFavoriteIds().then(setFavoriteIds);

    return unsubscribe;
  }, []);

  // Beregnes ved hvert render ud fra state, ingen ekstra kopi af data gemmes.
  // denne funktion viser dermed kun de annoncer som er byggematerialer, hvis showOnlyMaterials er true.
  const normalizedSearch = searchText.trim().toLowerCase();
  const dataToShow = databaseListings.filter((item) => {
    const matchesSearch =
      !normalizedSearch ||
      item.title.toLowerCase().includes(normalizedSearch) ||
      item.category.toLowerCase().includes(normalizedSearch);
    const matchesFilter = !showOnlyMaterials || item.isBuildingMaterial;

    return matchesSearch && matchesFilter;
  });

  async function handleToggleFavorite(id) {
    setFavoriteIds(await toggleFavorite(id));
  }

  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.heading}>ByggeBytte</Text>

      <TextInput
        style={globalStyles.input}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Søg på titel eller kategori"
      />

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

      <TouchableOpacity
        style={globalStyles.buttonOutline}
        onPress={() => navigation.navigate('MyPage')}
      >
        <Text style={globalStyles.buttonOutlineText}>Min side</Text>
      </TouchableOpacity>

      {/* FlatList render kun de elementer der er synlige på skærmen - */}
      {/* bedre til lange lister end at mappe listen manuelt. */}
      <FlatList
        data={dataToShow}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <View style={globalStyles.cardRow}>
              <TouchableOpacity
                style={globalStyles.cardContent}
                // Sender hele annoncen med som param, så DetailScreen
                // kan hente den igen via route.params.
                onPress={() => navigation.navigate('Detail', { listing: item })}
              >
                <Text style={globalStyles.cardTitle}>{item.title}</Text>
                <Text style={globalStyles.cardMeta}>{item.category}</Text>
                <Text style={globalStyles.price}>{item.price} kr</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={globalStyles.favoriteButton}
                onPress={() => handleToggleFavorite(item.id)}
                accessibilityLabel="Markér som favorit"
              >
                <Text style={globalStyles.favoriteIcon}>
                  {favoriteIds.includes(item.id) ? '♥' : '♡'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
