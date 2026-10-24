// Fælles styling, genbrugt på tværs af alle screens.
// alt samlet ét sted, så jeg undgår at skrive de samme styles i hver fil.
import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const globalStyles = StyleSheet.create({
  // bruges som wrapper om hele indholdet på hver screen
  screen: {
    flex: 1,
    backgroundColor: colors.cream,
    padding: 16,
  },
  formContent: {
    paddingBottom: 24,
  },
  // den store overskrift øverst på hver screen
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginBottom: 12,
  },
  // det hvide kort en annonce vises i, både i listen og bekræftelsen
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  favoriteButton: {
    padding: 8,
    marginLeft: 8,
  },
  favoriteIcon: {
    fontSize: 28,
    color: colors.terracotta,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 6,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.terracotta,
  },
  // den fyldte grønne knap, bruges til de "vigtige" handlinger
  button: {
    backgroundColor: colors.forestGreen,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  // samme knap, bare med kant i stedet for fyldt baggrund, til filter-knappen
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.forestGreen,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 15,
  },
  buttonOutlineText: {
    color: colors.forestGreen,
    fontWeight: '600',
    fontSize: 15,
  },
  // labels over hvert inputfelt i formularen, fx "Titel", "Pris (kr)"
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    color: colors.textDark,
  },
  pickerWrapper: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  // bruges til den lidt lysere tekst, fx kategori og beskrivelse
  muted: {
    color: colors.textMuted,
  },
});
