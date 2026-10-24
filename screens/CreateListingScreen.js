import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { globalStyles } from '../styles/globalStyles';
import { db } from '../firebaseConfig';
import { getLocalUserId } from '../utils/favorites';

const categories = ['Mursten', 'Træ', 'Grus', 'Maling', 'Værktøj', 'Fliser', 'Isolering', 'Cement'];

// formular til at oprette en ny annonce, indholdet gemmes ikke rigtigt,
// det er bare til at vise at det kan lade sig gøre at "oprette" en annonce.
export default function CreateListingScreen({ navigation }) {
  // Ét state-felt per input - holder styr på hvad brugeren har skrevet.
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  // Styrer om bekræftelses kortet nederst skal vises.
  // den ændres til true når brugeren trykker på "Opret annonce" knappen.
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit() {
    if (!title.trim() || !category.trim() || !price.trim()) {
      setError('Udfyld titel, kategori og pris.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const ownerId = await getLocalUserId();
      await addDoc(collection(db, 'listings'), {
        title: title.trim(),
        category: category.trim(),
        price: Number(price),
        description: description.trim(),
        isBuildingMaterial: true,
        ownerId,
        createdAt: serverTimestamp(),
      });
      navigation.navigate('Browse');
    } catch (saveError) {
      setError('Annoncen kunne ikke gemmes. Tjek Firestore-reglerne.');
    } finally {
      setSaving(false);
    }
  }

  // her returneres JSX som beskriver hvordan skærmen skal se ud.
  //jsx er en syntaks der ligner HTML, men som bruges i React til at beskrive UI komponenter.
  return (
    <KeyboardAvoidingView
      style={globalStyles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={globalStyles.formContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={globalStyles.heading}>Opret annonce</Text>

      <Text style={globalStyles.label}>Titel</Text>
      <TextInput
        style={globalStyles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="F.eks. Overskydende mursten"
      />

      <Text style={globalStyles.label}>Kategori</Text>
      <View style={globalStyles.pickerWrapper}>
        <Picker selectedValue={category} onValueChange={setCategory}>
          <Picker.Item label="Vælg kategori" value="" />
          {categories.map((categoryOption) => (
            <Picker.Item
              key={categoryOption}
              label={categoryOption}
              value={categoryOption}
            />
          ))}
        </Picker>
      </View>

      <Text style={globalStyles.label}>Pris (kr)</Text>
      <TextInput
        style={globalStyles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="F.eks. 250"
        keyboardType="numeric"
      />

      <Text style={globalStyles.label}>Beskrivelse</Text>
      <TextInput
        style={globalStyles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Kort beskrivelse af varen"
        multiline
      />

      <TouchableOpacity
        style={[globalStyles.button, { marginTop: 20 }]}
        onPress={handleSubmit}
        disabled={saving}
      >
        <Text style={globalStyles.buttonText}>
          {saving ? 'Gemmer...' : 'Opret annonce'}
        </Text>
      </TouchableOpacity>

        {!!error && <Text style={globalStyles.muted}>{error}</Text>}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
