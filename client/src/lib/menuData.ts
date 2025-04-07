import { MenuItem } from "@shared/schema";

// Define static image URLs
const baseUrl = "/api/static";
const pooriImage = `${baseUrl}/poori.png`;
const dosaImage = `${baseUrl}/dosa.png`;
const idliImage = `${baseUrl}/idili.png`;
const vadaImage = `${baseUrl}/vada.png`;
const paneerPalakImage = `${baseUrl}/paneer palak.png`;
const chapathiImage = `${baseUrl}/chapathi.png`;
const southMealsImage = `${baseUrl}/south meals.png`;
const northMealsImage = `${baseUrl}/north meals.png`;
const noodlesImage = `${baseUrl}/noodles.png`;
const gobiManchurianImage = `${baseUrl}/gobi manchi.jpg`;
const rasagullaImage = `${baseUrl}/rasagulla.jpg`;
const puffImage = `${baseUrl}/puff.jpg`;
const cornflakesImage = `${baseUrl}/cornflakes.webp`;
const samosaImage = `${baseUrl}/samosa.jpg`;

// Categories
export const categories = [
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "snacks", label: "Snacks" }
];

// Food images mapped to menu items
export const foodImages: {[key: string]: string} = {
  // Breakfast items
  "Poori": pooriImage,
  "Dosa": dosaImage,
  "Idli": idliImage,
  "Vada": vadaImage,
  
  // Lunch items
  "Paneer Palak": paneerPalakImage,
  "Chapati": chapathiImage,
  "South Meals": southMealsImage,
  "North Meals": northMealsImage,
  "Noodles": noodlesImage,
  "Gobi Manchurian": gobiManchurianImage,
  
  // Snacks items
  "Samosa": samosaImage,
  "Rasgulla": rasagullaImage,
  "Puffs": puffImage,
  "Cornflakes": cornflakesImage
};

// Food descriptions with authentic details
export const foodDescriptions: {[key: string]: string} = {
  // Breakfast items
  "Poori": "Golden-fried, puffy whole wheat bread served with spicy potato masala. A hearty breakfast staple across India.",
  "Dosa": "Crispy, golden-brown fermented rice and lentil crepe served with coconut chutney and tangy sambar. South Indian favorite.",
  "Idli": "Soft, fluffy steamed rice cakes made from fermented rice and lentil batter. Served with sambar and chutney.",
  "Vada": "Crispy, donut-shaped savory fritters made from urad dal, flavored with curry leaves, ginger, and chilies. Perfect with chutney.",
  
  // Lunch items
  "Paneer Palak": "Fresh cottage cheese cubes in a creamy, pureed spinach gravy seasoned with aromatic spices. Rich in iron and protein.",
  "Chapati": "Soft, whole wheat flatbread roasted on a tawa. The perfect accompaniment for curries and dals.",
  "South Meals": "A complete balanced meal with rice, sambar, rasam, vegetable curries, curd, pickle, and papadam served on a traditional banana leaf.",
  "North Meals": "Wholesome thali with rotis, dal, vegetable curry, rice, pickle, and a sweet dish. A perfect representation of North Indian cuisine.",
  "Noodles": "Stir-fried noodles with mixed vegetables in a spicy Indo-Chinese sauce, topped with spring onions.",
  "Gobi Manchurian": "Crispy cauliflower florets tossed in a tangy, spicy Manchurian sauce. A popular Indo-Chinese delicacy.",
  
  // Snacks items
  "Samosa": "Triangle-shaped pastries filled with spiced potatoes, peas, and aromatic spices. Served with mint and tamarind chutneys.",
  "Rasgulla": "Soft, spongy cheese balls soaked in light sugar syrup. A melt-in-mouth Bengali sweet treat.",
  "Puffs": "Flaky, layered pastry filled with spicy vegetable or paneer stuffing. Perfect tea-time snack.",
  "Cornflakes": "Crunchy cornflakes served with cold milk and topped with fresh seasonal fruits and honey."
};

// Get random order number
export const getRandomOrderNumber = (): string => {
  return 'ACE' + Math.floor(10000 + Math.random() * 90000);
};

// Generate a frontend menu item from API menu item with enhanced description
export const formatMenuItemForDisplay = (item: MenuItem) => {
  const itemName = item.name as string;
  return {
    ...item,
    formattedPrice: `₹${item.price}`,
    description: foodDescriptions[itemName] || item.description,
    imageUrl: foodImages[itemName] || item.imageUrl
  };
};
