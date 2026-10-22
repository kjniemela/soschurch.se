// Prototype content, copied from soschurch.se in October 2026.
// Swap this module for a CMS / Church Center feed once the data source is decided.

const CDN = 'https://images.squarespace-cdn.com/content/v1/58a71373d482e9a65572dd35';

export const images = {
  logo: `${CDN}/1535228524703-J4N5W91EK2TSII911VEM/SOS-Icon-White.png?format=500w`,
  hero: `${CDN}/66d77926-8ff5-4b74-a0c0-268db9c82026/Copy+of+6X6B9786.JPG?format=2500w`,
  worship: `${CDN}/fa9813ac-1bcb-4f5c-bba7-0e6fd65cfb66/6X6B3335+%281%29.JPG?format=1500w`,
  crowd: `${CDN}/2413b522-4157-4567-9902-ee74e486a30b/6X6B3460.JPG?format=1500w`,
};

export const church = {
  name: 'SOS Church Stockholm',
  tagline: 'An international church in the heart of downtown Stockholm.',
  email: 'info@soschurch.se',
  phone: '070 286 36 92',
  instagram: 'https://www.instagram.com/soschurchsthlm/',
  youtube: 'https://www.youtube.com/@SOSChurchSthlm-/streams',
  spotify: 'https://open.spotify.com/show/6EpYHtspBbsAxqIIAu3uQ1',
  applePodcasts: 'https://podcasts.apple.com/se/podcast/podcast-sos-church-stockholm/id1457432695',
};

export const service = {
  day: 'Every Sunday',
  times: ['10:30', '13:00'],
  language: 'Held in English with live translation into Swedish, Farsi and Spanish.',
};

export type Location = {
  id: string;
  title: string;
  name: string;
  street: string;
  postal: string;
  note: string;
};

export const locations: Location[] = [
  {
    id: 'venue81',
    title: 'Sunday Celebration',
    name: 'Venue 81',
    street: 'Drottninggatan 81',
    postal: '111 60 Stockholm',
    note: 'Celebration services every Sunday at 10:30 and 13:00.',
  },
  {
    id: 'office',
    title: 'Office & Kids Church',
    name: "S:t Peter's Place",
    street: 'Kammakargatan 60',
    postal: '113 59 Stockholm',
    note: 'Church office, and Kids Church on Sundays. Two minutes from Venue 81.',
  },
];

export type ChurchEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  place: string;
};

export const events: ChurchEvent[] = [
  {
    id: 'sunday-2026-10-25',
    title: 'Sunday Celebration',
    date: '2026-10-25',
    time: '10:30 & 13:00',
    place: 'Venue 81, Drottninggatan 81',
  },
  {
    id: 'late-night-cafe-2026-10-30',
    title: 'Late Night Cafe Outreach',
    date: '2026-10-30',
    time: 'Fri–Sat, 22:00',
    place: 'Stureplan',
  },
];

export const pastors = [
  {
    names: 'Christopher & Eli Fränberg',
    role: 'Lead Pastors',
    bio: 'Took over leadership in January 2020. Since moving to Drottninggatan 81 the church has roughly doubled. They live in Tullinge with their four children.',
  },
  {
    names: 'Elias & Julia Knudtzon',
    role: 'Pastors & Directors of Events',
    bio: 'Oversee the annual events and city outreaches. They live in Farsta.',
  },
  {
    names: 'Isak & Maria Prytz',
    role: 'Pastors & Directors of Production',
    bio: 'Lead production for the Sunday Celebration and online services.',
  },
  {
    names: 'Douglas & Maria Tchape',
    role: 'Care Pastors',
    bio: 'Lead the care ministry: Life Groups, follow-up for new believers, baptisms and life coaching. They live in Upplands Väsby.',
  },
  {
    names: 'Noel & Esther Amritzer',
    role: 'Pastors of the Next Generation',
    bio: 'Pastor the Kids Teams. Originally from Jönköping, they joined in 2021 and live in Tullinge.',
  },
];

export const giving = {
  verse: '“Freely you have received; freely give.” — Matthew 10:8',
  options: [
    {
      title: 'Card',
      blurb: 'Give online with a debit or credit card.',
      url: 'https://secure.squarespace.com/checkout/donate?donatePageId=5c52e01b4fa51a04f5dd0aad',
    },
    { title: 'Swish', blurb: 'Give instantly with Swish.', url: 'https://soschurch.se/swish' },
    { title: 'Bank transfer', blurb: 'Bankgiro and account details.', url: 'https://soschurch.se/payment-information' },
  ],
  miracleOffering: {
    reference: 'MO25',
    areas: [
      'Sending young people on mission',
      'Next Generation camps',
      'Mission Festival in Kilgoris',
      'We Love Stockholm',
    ],
  },
};

export const network = [
  { country: 'Sweden', name: 'SOS Church Malmö', url: 'https://www.soschurchmalmo.se/' },
  { country: 'Switzerland', name: 'SOS Church Bienne', url: 'https://www.sosbienne.ch/' },
  { country: 'Switzerland', name: 'SOS Church Fribourg', url: 'https://www.sosfribourg.ch/' },
  { country: 'France', name: 'SOS Church Lyon', url: 'https://www.eglisesoslyon.com/' },
];

export const lifeGroupsUrl =
  'https://sosstockholm.churchcenter.com/groups/life-groups?enrollment=open_signup%2Crequest_to_join&filter=enrollment';
export const childDedicationUrl = 'https://sosstockholm.churchcenter.com/people/forms/1070715';
export const bibleSchoolUrl = 'https://www.sosbibleschools.org/';
