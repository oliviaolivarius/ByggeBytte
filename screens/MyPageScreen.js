import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getLocalUserId } from '../utils/favorites';
import { globalStyles } from '../styles/globalStyles';

export default function MyPageScreen({ navigation }) {
  const [myListings, setMyListings] = useState([]);

  useEffect(() => {
    let unsubscribe;

    getLocalUserId().then((ownerId) => {
      unsubscribe = onSnapshot(collection(db, 'listings'), (snapshot) => {
        const listings = snapshot.docs
          .map((document) => ({ id: document.id, ...document.data() }))
          .filter((listing) => listing.ownerId === ownerId);
        setMyListings(listings);
      });
    });

    return () => unsubscribe?.();
  }, []);

  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.heading}>Min side</Text>
      <Text style={globalStyles.muted}>Dine egne annoncer</Text>

      <FlatList
        data={myListings}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={globalStyles.muted}>Du har ikke oprettet nogen annoncer endnu.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={globalStyles.card}
            onPress={() => navigation.navigate('Detail', { listing: item })}
          >
            <Text style={globalStyles.cardTitle}>{item.title}</Text>
            <Text style={globalStyles.cardMeta}>{item.category}</Text>
            <Text style={globalStyles.price}>{item.price} kr</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}