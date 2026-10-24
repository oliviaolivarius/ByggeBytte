import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@byggebytte/favorites';
const USER_ID_KEY = '@byggebytte/user-id';

export async function getFavoriteIds() {
  const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
  return storedFavorites ? JSON.parse(storedFavorites) : [];
}

export async function toggleFavorite(id) {
  const favoriteIds = await getFavoriteIds();
  const updatedIds = favoriteIds.includes(id)
    ? favoriteIds.filter((favoriteId) => favoriteId !== id)
    : [...favoriteIds, id];

  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedIds));
  return updatedIds;
}

export async function getLocalUserId() {
  let userId = await AsyncStorage.getItem(USER_ID_KEY);

  if (!userId) {
    userId = `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    await AsyncStorage.setItem(USER_ID_KEY, userId);
  }

  return userId;
}