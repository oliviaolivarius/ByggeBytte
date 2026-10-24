# ByggeBytte

ByggeBytte er en markedsplads app til byggebranchen, hvor civile og
håndværkere kan købe og sælge overskudsmaterialer og værktøj 

## Funktioner

- Annoncer gemmes i Firebase Firestore i collectionen `listings`.
- De 8 eksisterende eksempelannoncer uploades automatisk første gang,
	Firestore er tom.
- Browse-skærmen opdateres automatisk, når annoncer ændres i Firestore.
- Annoncer kan søges i realtid på titel og kategori.
- Filteret "Kun byggematerialer" virker sammen med søgningen.
- Annoncer kan markeres som favoritter fra både oversigten og detaljesiden.
	Favoritter gemmes lokalt med AsyncStorage og huskes mellem app-opstarter.
- Kategorier vælges fra en dropdown-menu, når en annonce oprettes.
- Efter oprettelse sendes brugeren tilbage til forsiden.
- På "Min side" kan brugeren se de annoncer, der er oprettet fra den aktuelle
	telefon. Appen bruger et lokalt bruger-id, fordi der endnu ikke er login.

## Firebase

Firebase-konfigurationen ligger i `firebaseConfig.js`. Firestore skal være
oprettet i Firebase Console. 

## Video

[https://youtube.com/shorts/BWKOqyhZRAc?feature=share](https://youtube.com/shorts/sJZy0UREy4Q) 
