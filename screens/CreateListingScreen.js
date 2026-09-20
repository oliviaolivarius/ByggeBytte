import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

// formular til at oprette en ny annonce, indholdet gemmes ikke rigtigt,
// det er bare til at vise at det kan lade sig gøre at "oprette" en annonce.
export default function CreateListingScreen() {
  // Ét state-felt per input - holder styr på hvad brugeren har skrevet.
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  // Styrer om bekræftelses kortet nederst skal vises.
  // den ændres til true når brugeren trykker på "Opret annonce" knappen.
  const [submitted, setSubmitted] = useState(false);

  // her returneres JSX som beskriver hvordan skærmen skal se ud.
  //jsx er en syntaks der ligner HTML, men som bruges i React til at beskrive UI komponenter.
  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.heading}>Opret annonce</Text>

      <Text style={globalStyles.label}>Titel</Text>
      <TextInput
        style={globalStyles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="F.eks. Overskydende mursten"
      />

      <Text style={globalStyles.label}>Kategori</Text>
      <TextInput
        style={globalStyles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="F.eks. Mursten, Træ, Værktøj"
      />

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

      {/* Gemmer intet permanent - sætter bare submitted til true, */}
      {/* så bekræftelses, kortet dukker op nedenfor. */}
      <TouchableOpacity
        style={[globalStyles.button, { marginTop: 20 }]}
        onPress={() => setSubmitted(true)}
      >
        <Text style={globalStyles.buttonText}>Opret annonce</Text>
      </TouchableOpacity>

      {/* Vises kun når submitted er true - læser direkte fra state-felterne ovenfor */}
      {submitted && (
        <View style={globalStyles.card}>
          <Text style={globalStyles.cardTitle}>Annonce oprettet!</Text>
          <Text style={globalStyles.cardMeta}>{category || 'Ingen kategori'}</Text>
          <Text style={globalStyles.muted}>{title || 'Ingen titel'}</Text>
          <Text style={globalStyles.price}>{price ? `${price} kr` : ''}</Text>
          <Text style={globalStyles.muted}>{description}</Text>
        </View>
      )}
    </View>
  );
}
