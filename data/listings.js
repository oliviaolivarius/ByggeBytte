// Fake annoncer til ByggeBytte, dette er lavet så jeg ikke skulle lave database. 
// Det er også dem der vises på min app.
// Objekterne eksporteres som en liste, så de kan importeres i andre filer.

export const listings = [
  {
    id: '1',
    title: 'Overskydende mursten',
    category: 'Mursten',
    price: 350,
    description:
      'Ca. 200 røde mursten fra renoveringsprojekt. Hentes selv i Valby.',
    isBuildingMaterial: true,
  },
  {
    id: '2',
    title: 'Rest grus',
    category: 'Grus',
    price: 150,
    description: '1 kubikmeter grus til indkørsel. Kun afhentning.',
    isBuildingMaterial: true,
  },
  {
    id: '3',
    title: 'Ubrugte træbrædder',
    category: 'Træ',
    price: 600,
    description:
      '10 brædder, 45x145mm, 4 meter lange. Perfekt til terrasse.',
    isBuildingMaterial: true,
  },
  {
    id: '4',
    title: 'Hvid vægmaling, 2 spande',
    category: 'Maling',
    price: 120,
    description: '2 spande hvid indendørs maling, ubrudt. 10 liter hver.',
    isBuildingMaterial: false,
  },
  {
    id: '5',
    title: 'Brugt boremaskine',
    category: 'Værktøj',
    price: 400,
    description: 'Bosch boremaskine, brugt men velholdt. Inkl. kuffert.',
    isBuildingMaterial: false,
  },
  {
    id: '6',
    title: 'Badeværelsesfliser, hvide',
    category: 'Fliser',
    price: 250,
    description: 'Ca. 15 m² hvide fliser, overskud fra badeværelsesrenovering.',
    isBuildingMaterial: true,
  },
  {
    id: '7',
    title: 'Isoleringsmåtter, uåbnede',
    category: 'Isolering',
    price: 300,
    description: 'Rockwool isoleringsmåtter, 5 pakker, uåbnede.',
    isBuildingMaterial: true,
  },
  {
    id: '8',
    title: 'Cementsække',
    category: 'Cement',
    price: 200,
    description: '8 sække cement, 25 kg hver. Tørt opbevaret.',
    isBuildingMaterial: true,
  },
];
