export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  icon: string;
};

export type Umkm = {
  id: number;
  name: string;
  owner: string;
  category: string;
  description: string;
  longDescription: string;
  address: string;
  openingHours: string;
  whatsapp: string;
  mapsUrl: string;
  marketplaceUrl?: string;
  instagram?: string;
  icon: string;
  color: string;
  products: Product[];
};

export const umkmData: Umkm[] = [
  {
    id: 1,
    name: "Keripik Tempe Bu Sari",
    owner: "Ibu Sari",
    category: "Camilan",
    description:
      "Keripik tempe rumahan dengan tekstur renyah dan berbagai pilihan rasa.",
    longDescription:
      "Keripik Tempe Bu Sari merupakan usaha rumahan dari Desa Tanggirejo yang memproduksi keripik tempe dengan cita rasa gurih dan renyah. Produk dibuat secara rumahan dan tersedia dalam beberapa pilihan rasa.",
    address: "Desa Tanggirejo",
    openingHours: "08.00 - 17.00 WIB",
    whatsapp: "6281234567890",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Desa+Tanggirejo",
    marketplaceUrl: "https://shopee.co.id/",
    instagram: "@keripiktempelokal",
    icon: "🍘",
    color: "from-amber-100 to-orange-100",
    products: [
      {
        id: 1,
        name: "Keripik Tempe Original",
        price: 15000,
        description: "Keripik tempe rasa original.",
        icon: "🍘",
      },
      {
        id: 2,
        name: "Keripik Tempe Pedas",
        price: 17000,
        description: "Keripik tempe dengan rasa pedas.",
        icon: "🌶️",
      },
      {
        id: 3,
        name: "Keripik Tempe Balado",
        price: 18000,
        description: "Keripik tempe dengan bumbu balado.",
        icon: "🍘",
      },
    ],
  },

  {
    id: 2,
    name: "Pisang Sale Mak Yati",
    owner: "Ibu Yati",
    category: "Camilan",
    description:
      "Pisang sale manis dan legit yang diproduksi secara rumahan.",
    longDescription:
      "Pisang Sale Mak Yati merupakan produk olahan pisang rumahan yang dibuat oleh pelaku UMKM Desa Tanggirejo.",
    address: "Desa Tanggirejo",
    openingHours: "08.00 - 16.00 WIB",
    whatsapp: "6281234567891",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Desa+Tanggirejo",
    marketplaceUrl: "https://shopee.co.id/",
    icon: "🍌",
    color: "from-yellow-100 to-amber-100",
    products: [
      {
        id: 1,
        name: "Pisang Sale Original",
        price: 12000,
        description: "Pisang sale rasa original.",
        icon: "🍌",
      },
    ],
  },

  {
    id: 3,
    name: "Sari Jahe Merah",
    owner: "Pak Slamet",
    category: "Minuman",
    description:
      "Minuman jahe merah tradisional dengan rasa hangat dan khas.",
    longDescription:
      "Sari Jahe Merah merupakan minuman tradisional berbahan jahe merah yang diproduksi oleh masyarakat Desa Tanggirejo.",
    address: "Desa Tanggirejo",
    openingHours: "07.00 - 18.00 WIB",
    whatsapp: "6281234567892",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Desa+Tanggirejo",
    icon: "🥤",
    color: "from-red-100 to-orange-100",
    products: [
      {
        id: 1,
        name: "Sari Jahe Merah",
        price: 10000,
        description: "Minuman jahe merah siap konsumsi.",
        icon: "🥤",
      },
    ],
  },

  {
    id: 4,
    name: "Rempeyek Bu Darmi",
    owner: "Ibu Darmi",
    category: "Camilan",
    description:
      "Rempeyek gurih dan renyah dengan resep rumahan.",
    longDescription:
      "Rempeyek Bu Darmi merupakan makanan ringan rumahan dengan tekstur renyah dan cita rasa gurih.",
    address: "Desa Tanggirejo",
    openingHours: "08.00 - 17.00 WIB",
    whatsapp: "6281234567893",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Desa+Tanggirejo",
    icon: "🥠",
    color: "from-orange-100 to-yellow-100",
    products: [
      {
        id: 1,
        name: "Rempeyek Kacang",
        price: 15000,
        description: "Rempeyek kacang gurih dan renyah.",
        icon: "🥜",
      },
    ],
  },

  {
    id: 5,
    name: "Dapur Mbak Rina",
    owner: "Mbak Rina",
    category: "Makanan Berat",
    description:
      "Aneka makanan rumahan dan nasi kotak untuk berbagai kebutuhan.",
    longDescription:
      "Dapur Mbak Rina menyediakan berbagai makanan rumahan dan pesanan nasi kotak untuk kebutuhan acara maupun konsumsi sehari-hari.",
    address: "Desa Tanggirejo",
    openingHours: "07.00 - 17.00 WIB",
    whatsapp: "6281234567894",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Desa+Tanggirejo",
    icon: "🍱",
    color: "from-lime-100 to-green-100",
    products: [
      {
        id: 1,
        name: "Nasi Kotak",
        price: 20000,
        description: "Nasi kotak dengan lauk dan sayur.",
        icon: "🍱",
      },
    ],
  },

  {
    id: 6,
    name: "Kue Tradisional Bu Ani",
    owner: "Ibu Ani",
    category: "Kue & Dessert",
    description:
      "Berbagai pilihan jajanan dan kue tradisional buatan warga lokal.",
    longDescription:
      "Kue Tradisional Bu Ani menyediakan berbagai jajanan pasar dan kue tradisional yang dibuat secara rumahan.",
    address: "Desa Tanggirejo",
    openingHours: "06.00 - 15.00 WIB",
    whatsapp: "6281234567895",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Desa+Tanggirejo",
    icon: "🍰",
    color: "from-pink-100 to-orange-100",
    products: [
      {
        id: 1,
        name: "Paket Jajanan Pasar",
        price: 15000,
        description: "Paket aneka jajanan tradisional.",
        icon: "🍰",
      },
    ],
  },
];