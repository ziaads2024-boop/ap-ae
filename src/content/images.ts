// Every photo used on the guide pages, with its licence and credit. All are
// real photographs under free licences (Wikimedia Commons, StockSnap); none are
// AI-generated. Treatment photos are illustrative and do not show clinics
// listed on AppointPanda. CC BY / CC BY-SA images must keep their credit
// visible wherever they appear (see <CreditedImage>).

export interface SiteImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Short caption shown with the credit */
  caption: string;
  credit: {
    author: string;
    license: 'CC0' | 'CC BY 2.0' | 'CC BY 4.0' | 'CC BY-SA 3.0' | 'CC BY-SA 4.0';
    sourceUrl: string;
    sourceName: 'Wikimedia Commons' | 'StockSnap';
  };
}

export const LICENSE_URLS: Record<SiteImage['credit']['license'], string> = {
  CC0: 'https://creativecommons.org/publicdomain/zero/1.0/',
  'CC BY 2.0': 'https://creativecommons.org/licenses/by/2.0/',
  'CC BY 4.0': 'https://creativecommons.org/licenses/by/4.0/',
  'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
};

const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;

export const images = {
  // ------------------------------------------------------------- emirates
  dubai: {
    src: '/images/emirates/dubai.jpg', width: 1800, height: 1202,
    alt: 'Dubai skyline at sunset with the Burj Khalifa rising above the other towers',
    caption: 'Dubai skyline and the Burj Khalifa',
    credit: { author: 'imran shahabuddin', license: 'CC BY 2.0', sourceName: 'Wikimedia Commons', sourceUrl: commons('Burj_Khalifa_(worlds_tallest_building)_and_the_Dubai_skyline_(25781049892).jpg') },
  },
  'abu-dhabi': {
    src: '/images/emirates/abu-dhabi.jpg', width: 1800, height: 1350,
    alt: 'Palm-lined walkway leading to the white minarets of the Sheikh Zayed Grand Mosque in Abu Dhabi',
    caption: 'Sheikh Zayed Grand Mosque, Abu Dhabi',
    credit: { author: 'Guilhem Vellut', license: 'CC BY 2.0', sourceName: 'Wikimedia Commons', sourceUrl: commons('Sheikh_Zayed_Grand_Mosque_@_Abu_Dhabi_(15856602738).jpg') },
  },
  sharjah: {
    src: '/images/emirates/sharjah.jpg', width: 1800, height: 1350,
    alt: 'View over the water in Sharjah towards the city skyline, with a small island in the lagoon',
    caption: 'Sharjah waterfront',
    credit: { author: 'Thomas Dahlstrøm Nielsen', license: 'CC BY-SA 4.0', sourceName: 'Wikimedia Commons', sourceUrl: commons('Sharjah_Corniche_2012_(1).jpg') },
  },
  ajman: {
    src: '/images/emirates/ajman.jpg', width: 1800, height: 1350,
    alt: 'Main gate of the Ajman Museum, a traditional fort with crenellated towers and an arched entrance',
    caption: 'Ajman Museum',
    credit: { author: 'ZI Jony', license: 'CC BY-SA 4.0', sourceName: 'Wikimedia Commons', sourceUrl: commons('Main_Entrance_of_Ajman_Museum_1.jpg') },
  },
  'ras-al-khaimah': {
    src: '/images/emirates/ras-al-khaimah.jpg', width: 1800, height: 1012,
    alt: 'Dhayah Fort, a mud-brick fort on a rocky hill in front of the Hajar Mountains in Ras Al Khaimah',
    caption: 'Dhayah Fort, Ras Al Khaimah',
    credit: { author: 'Balaji Rai', license: 'CC BY-SA 4.0', sourceName: 'Wikimedia Commons', sourceUrl: commons('Dhayah_Fort,_Ras_Al_Khaimah.jpg') },
  },
  fujairah: {
    src: '/images/emirates/fujairah.jpg', width: 1800, height: 1200,
    alt: 'The round towers of Fujairah Fort under a clear sky with mountains behind',
    caption: 'Fujairah Fort',
    credit: { author: 'Clémence Jacqueri', license: 'CC BY-SA 4.0', sourceName: 'Wikimedia Commons', sourceUrl: commons('Fujairah_Fort_Entrance.jpg') },
  },
  'umm-al-quwain': {
    src: '/images/emirates/umm-al-quwain.jpg', width: 1800, height: 898,
    alt: 'The white walls and watchtower of Umm Al Quwain Fort with palm trees in front',
    caption: 'Umm Al Quwain Fort',
    credit: { author: 'Prof. Mortel', license: 'CC BY 2.0', sourceName: 'Wikimedia Commons', sourceUrl: commons('Umm_al-Quwain_Fort,_UAE_01.jpg') },
  },

  // ----------------------------------------------------------- treatments
  implantModel: {
    src: '/images/treatments/implant-model.jpg', width: 1800, height: 1200,
    alt: 'Hands holding a dental model showing an implant post beneath an artificial tooth',
    caption: 'Dental implant model',
    credit: { author: 'Peter Kasprzyk', license: 'CC0', sourceName: 'Wikimedia Commons', sourceUrl: commons('Dental_implants_(Unsplash).jpg') },
  },
  braces: {
    src: '/images/treatments/braces.jpg', width: 1800, height: 1351,
    alt: 'Close-up of teeth wearing clear ceramic brackets connected by an archwire',
    caption: 'Ceramic braces',
    credit: { author: 'Tamaki Sono', license: 'CC BY 2.0', sourceName: 'Wikimedia Commons', sourceUrl: commons('2015-03-10_teeth_wearing_dental_braces.jpg') },
  },
  panoramicXray: {
    src: '/images/treatments/panoramic-xray.jpg', width: 1800, height: 904,
    alt: 'Panoramic dental X-ray showing both jaws, fillings and the position of the back teeth',
    caption: 'Panoramic dental X-ray',
    credit: { author: 'Fastsmiles', license: 'CC0', sourceName: 'Wikimedia Commons', sourceUrl: commons('Pano-GH21101912.jpg') },
  },
  whiteningMaterials: {
    src: '/images/treatments/whitening-materials.jpg', width: 1800, height: 1200,
    alt: 'Gloved hands preparing a whitening gel syringe beside a shade guide and cheek retractor',
    caption: 'Preparing professional whitening materials',
    credit: { author: 'Jameswasswa', license: 'CC BY-SA 4.0', sourceName: 'Wikimedia Commons', sourceUrl: commons('Preparing_Teeth_Whitening_Materials_for_Dental_Treatment.jpg') },
  },
  toothbrush: {
    src: '/images/treatments/toothbrush.jpg', width: 1800, height: 1200,
    alt: 'Toothpaste being squeezed onto a toothbrush',
    caption: 'Daily brushing',
    credit: { author: 'Steve Buissinne', license: 'CC0', sourceName: 'Wikimedia Commons', sourceUrl: commons('Toothbrush,_Toothpaste,_Dental_Care_(571741).jpg') },
  },
  xrayViewer: {
    src: '/images/treatments/xray-viewer.jpg', width: 1800, height: 1196,
    alt: 'Dental X-rays of several teeth and their roots displayed on a light viewer',
    caption: 'Dental X-rays used to check roots and canals',
    credit: { author: 'Vyacheslav Argenberg', license: 'CC BY 4.0', sourceName: 'Wikimedia Commons', sourceUrl: commons('Teeth,_Root_canals,_Dentistry,_Endodontology,_Teeth_dental_X-rays,_Rostov-on-Don,_Russia.jpg') },
  },
  chairWhite: {
    src: '/images/treatments/clinic-chair-white.jpg', width: 960, height: 640,
    alt: 'A modern white dental treatment room with the chair, overhead light and instrument tray',
    caption: 'Dental treatment room',
    credit: { author: 'Daniel Frank', license: 'CC0', sourceName: 'StockSnap', sourceUrl: 'https://stocksnap.io/photo/chair-dentist-3J10QN5PTS' },
  },
  chairOverhead: {
    src: '/images/treatments/clinic-chair-overhead.jpg', width: 960, height: 640,
    alt: 'Dental chair and instrument unit seen from above',
    caption: 'Dental chair from above',
    credit: { author: 'Daniel Frank', license: 'CC0', sourceName: 'StockSnap', sourceUrl: 'https://stocksnap.io/photo/chair-dentist-E4SV0WQ539' },
  },
  clinicRoom: {
    src: '/images/treatments/clinic-room.jpg', width: 960, height: 640,
    alt: 'Dental instruments mounted on a treatment unit next to the chair headrest',
    caption: 'Treatment unit and instruments',
    credit: { author: 'Daniel Frank', license: 'CC0', sourceName: 'StockSnap', sourceUrl: 'https://stocksnap.io/photo/chair-dentist-N79O15BH30' },
  },
  childCheckup: {
    src: '/images/treatments/child-checkup.jpg', width: 960, height: 636,
    alt: 'A dentist in gloves examining a child\'s teeth in the dental chair',
    caption: 'A child\'s dental check-up',
    credit: { author: 'Michal Jarmoluk', license: 'CC0', sourceName: 'StockSnap', sourceUrl: 'https://stocksnap.io/photo/dentist-orthodontist-YXEEJ34DKF' },
  },
  curingLight: {
    src: '/images/treatments/curing-light.jpg', width: 960, height: 636,
    alt: 'A dentist using a blue curing light on a patient\'s front teeth',
    caption: 'Bonding with a curing light',
    credit: { author: 'Michal Jarmoluk', license: 'CC0', sourceName: 'StockSnap', sourceUrl: 'https://stocksnap.io/photo/dentist-orthodontist-6HV52GTPO3' },
  },
  chairClassic: {
    src: '/images/treatments/clinic-chair-classic.jpg', width: 1800, height: 1350,
    alt: 'A dental treatment room with a reclined chair, cabinets and a monitor',
    caption: 'Dental treatment room',
    credit: { author: 'Harrison Keely', license: 'CC BY 4.0', sourceName: 'Wikimedia Commons', sourceUrl: commons('A_dental_chair_in_a_dentist_clinic_in_North_Carolina,_United_States.jpg') },
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;

export const serviceImage: Record<string, ImageKey> = {
  'dental-implants': 'implantModel',
  invisalign: 'chairOverhead',
  braces: 'braces',
  veneers: 'curingLight',
  'hollywood-smile': 'clinicRoom',
  'teeth-whitening': 'whiteningMaterials',
  'root-canal': 'xrayViewer',
  'teeth-cleaning': 'toothbrush',
  'emergency-dentist': 'chairClassic',
  'pediatric-dentistry': 'childCheckup',
  'wisdom-tooth-removal': 'panoramicXray',
  'dental-crowns': 'chairWhite',
};

export const imageForService = (slug: string): SiteImage => images[serviceImage[slug] ?? 'chairWhite'];
export const imageForEmirate = (slug: string): SiteImage => images[slug as ImageKey] ?? images.dubai;
export const allImages = Object.values(images) as SiteImage[];
