const { createClient } = require('@sanity/client');

// --- USER PROVIDED CONTENT ---
const menuData = {
  "burgers": [
    { "name": "The OG", "mainIngredient": "Pressure-fried tenders and house mayo with crisp lettuce", "calories": 544.4, "protein_g": 36.5, "carbs_g": 38.0, "fats_g": 29.6, "allergens": "", "spiceLevel": "1/4" },
    { "name": "Supercharged OG", "mainIngredient": "Crispy chicken and house mayo finished with sriracha and a spice blend", "calories": 532.9, "protein_g": 40.0, "carbs_g": 40.2, "fats_g": 25.8, "allergens": "", "spiceLevel": "3/4" },
    { "name": "Butter Me Up", "mainIngredient": "Crispy chicken in a secret family butter sauce for a rich, authentic taste", "calories": 579.7, "protein_g": 35.3, "carbs_g": 42.1, "fats_g": 31.6, "allergens": "", "spiceLevel": "2/4" },
    { "name": "Honey-Glazed BBQ Classic", "mainIngredient": "Golden chicken fillet and melted cheese glazed in house-made honey BBQ", "calories": 634.5, "protein_g": 41.9, "carbs_g": 56.1, "fats_g": 29.2, "allergens": "", "spiceLevel": "1/4" },
    { "name": "Buffalo Soldier", "mainIngredient": "Seeded brioche with crunchy breaded chicken, house mayo, and our secret buffalo sauce", "calories": 593, "protein_g": 37.1, "carbs_g": 41.3, "fats_g": 32.9, "allergens": "", "spiceLevel": "4/4" },
    { "name": "Murger on the Dance Floor", "mainIngredient": "Seeded brioche with crunchy chicken, onion bhaji, and our signature butter sauce", "calories": 665.1, "protein_g": 36.5, "carbs_g": 57.4, "fats_g": 33.3, "allergens": "", "spiceLevel": "2/4" },
    { "name": "Hert and Seoul", "mainIngredient": "Crunchy breaded chicken in a Korean glaze and house mayo with OG slaw", "calories": 620.7, "protein_g": 35.5, "carbs_g": 48.4, "fats_g": 33.8, "allergens": "", "spiceLevel": "2/4" },
    { "name": "Mega Pecker", "mainIngredient": "Double-crunchy chicken, hash brown, and melted cheese with house-made mayo", "calories": 997.5, "protein_g": 72.6, "carbs_g": 59.3, "fats_g": 56.6, "allergens": "", "spiceLevel": "1/4" },
    { "name": "Peri-Peri Grilled Chicken Burger", "mainIngredient": "Flame-grilled chicken in your choice of marinade with house-made mayo", "calories": null, "protein_g": null, "carbs_g": null, "fats_g": null, "allergens": "", "spiceLevel": "Depends" }
  ],
  "wraps": [
    { "name": "The OG", "mainIngredient": "Crispy fried chicken, house mayo, and lettuce in a toasted wrap", "calories": 683.3, "protein_g": 37.6, "carbs_g": 55.8, "fats_g": 36.6, "allergens": "", "spiceLevel": "1/4" },
    { "name": "Supercharged OG", "mainIngredient": "Crispy breaded chicken, supercharged sauce, cheese, and lettuce in a wrap", "calories": 617.6, "protein_g": 41.1, "carbs_g": 58.1, "fats_g": 26.5, "allergens": "", "spiceLevel": "3/4" },
    { "name": "Butter Me Up", "mainIngredient": "Fried chicken and authentic family-recipe butter chicken sauce in a toasted wrap", "calories": 671.9, "protein_g": 38.5, "carbs_g": 60.1, "fats_g": 32.3, "allergens": "", "spiceLevel": "2/4" },
    { "name": "Buffalo Soldier", "mainIngredient": "Breaded chicken fillet, buffalo sauce, house mayo, lettuce, and onions, wrapped", "calories": 759.3, "protein_g": 38.9, "carbs_g": 60.0, "fats_g": 42.2, "allergens": "", "spiceLevel": "4/4" },
    { "name": "Murger on the Dance Floor", "mainIngredient": "Breaded chicken, house masala sauce, onion bhaji, mango chutney, and pickled onions in a toasted wrap", "calories": 770.8, "protein_g": 40.2, "carbs_g": 76.1, "fats_g": 33.3, "allergens": "", "spiceLevel": "2/4" },
    { "name": "Hert and Seoul", "mainIngredient": "Breaded chicken, Korean glaze, house mayo, OG slaw, and onions in a toasted wrap", "calories": 722.0, "protein_g": 38.8, "carbs_g": 64.9, "fats_g": 36.2, "allergens": "", "spiceLevel": "2/4" },
    { "name": "Mega Pecker", "mainIngredient": "Double chicken, hash brown, cheese, house mayo, lettuce, and onions, wrapped", "calories": 1136.4, "protein_g": 73.8, "carbs_g": 77.1, "fats_g": 63.6, "allergens": "", "spiceLevel": "1/4" },
    { "name": "OG Grilled Peri-Peri Wrap", "mainIngredient": "Grilled chicken, house mayo, lettuce, and your choice of marinade, wrapped", "calories": null, "protein_g": null, "carbs_g": null, "fats_g": null, "allergens": "", "spiceLevel": "Depends" },
    { "name": "Peckers Grilled Snack Wrap", "mainIngredient": "Grilled chicken, house mayo, house-made salsa, lettuce in a 10\" wrap", "calories": null, "protein_g": null, "carbs_g": null, "fats_g": null, "allergens": "", "spiceLevel": "" }
  ],
  "wingsAndTenders": {
    "wings": [
      { "name": "Butter Me Up Wings", "mainIngredient": "Southern fried chicken wings coated in our unique Butter Me Up sauce", "calories": null, "allergens": "", "spiceLevel": "" },
      { "name": "Peri-Peri Flame Grilled Wings", "mainIngredient": "Flame-grilled wings", "calories": null, "allergens": "", "spiceLevel": "" },
      { "name": "SFC Wings", "mainIngredient": "Southern fried chicken wings coated with our own peckers breading", "calories": null, "allergens": "", "spiceLevel": "" },
      { "name": "Hot Honey Wings", "mainIngredient": "Southern fried chicken wings coated with our Peckers breading, glazed with house-made hot honey sauce", "calories": null, "allergens": "", "spiceLevel": "" },
      { "name": "Buffalo Wings", "mainIngredient": "Southern fried chicken wings coated in our house-made buffalo sauce", "calories": null, "allergens": "", "spiceLevel": "" },
      { "name": "Honey-Glazed BBQ Wings", "mainIngredient": "SFC wings coated in our house-made honey-glazed BBQ sauce", "calories": null, "allergens": "", "spiceLevel": "" },
      { "name": "Garlic Aioli Wings", "mainIngredient": "SFC wings coated in our unique garlic aioli sauce", "calories": null, "allergens": "", "spiceLevel": "" },
      { "name": "Supercharged Wings", "mainIngredient": "Southern fried chicken wings coated in our house-made supercharged sauce", "calories": null, "allergens": "", "spiceLevel": "" },
      { "name": "Korean Gochujang Wings", "mainIngredient": "SFC wings coated in our house-made Korean gochujang sauce", "calories": null, "allergens": "", "spiceLevel": "" },
      { "name": "Peanut Sweet Chilli Wings", "mainIngredient": "Southern fried chicken wings coated with a delicious peanut sweet chilli sauce", "calories": null, "allergens": "", "spiceLevel": "" },
      { "name": "Katsu Curry Wings", "mainIngredient": "Southern fried chicken wings coated with a delicious katsu curry sauce", "calories": null, "allergens": "", "spiceLevel": "" }
    ],
    "tenders": [
      { "name": "Butter Me Up Tenders", "mainIngredient": "", "calories": null, "allergens": "", "spiceLevel": "" },
      { "name": "Buffalo Tenders", "mainIngredient": "SFC buttermilk buffalo tenders with house mayo on the side", "calories": null, "allergens": "", "spiceLevel": "" },
      { "name": "SFC Buttermilk Tenders", "mainIngredient": "Peckers buttermilk tenders, coated in our very own Peckers breading", "calories": null, "allergens": "", "spiceLevel": "" },
      { "name": "Hot Honey Tenders", "mainIngredient": "Buttermilk hot honey tenders with house mayo on the side", "calories": null, "allergens": "", "spiceLevel": "" },
      { "name": "Katsu Curry Tenders", "mainIngredient": "SFC buttermilk tenders with house-made spice-infused katsu curry sauce", "calories": null, "allergens": "", "spiceLevel": "" },
      { "name": "Honey-Glazed BBQ Tenders", "mainIngredient": "Buttermilk tenders glazed with home-made honey glazed BBQ sauce", "calories": null, "allergens": "", "spiceLevel": "" },
      { "name": "Garlic Aioli Tenders", "mainIngredient": "SFC buttermilk tenders coated in signature garlic aioli", "calories": null, "allergens": "", "spiceLevel": "" },
      { "name": "Supercharged Tenders", "mainIngredient": "Buttermilk tenders with signature supercharged sauce", "calories": null, "allergens": "", "spiceLevel": "" },
      { "name": "Korean Gochujang Tenders", "mainIngredient": "SFC buttermilk tenders glazed with home-made Korean gochujang sauce", "calories": null, "allergens": "", "spiceLevel": "" },
      { "name": "Peanut Sweet Chilli Coriander Tenders", "mainIngredient": "SFC buttermilk tenders in peanut and sweet chilli sauce", "calories": null, "allergens": "", "spiceLevel": "" }
    ]
  },
  "periPeriGrilledChicken": [
    { "name": "Peckers Health Box", "mainIngredient": "Protein-packed blend of grilled chicken with your choice of marinade, mild spicy rice, salad, and grilled halloumi", "calories": null, "allergens": "", "spiceLevel": "" },
    { "name": "Peri-Peri Flame Grilled Wings", "mainIngredient": "Flame-grilled wings with your choice of marinade", "calories": null, "allergens": "", "spiceLevel": "" },
    { "name": "Peckers Grilled Snack Wrap", "mainIngredient": "Grilled chicken, house mayo, house-made salsa, lettuce in a 10\" wrap", "calories": null, "allergens": "", "spiceLevel": "" },
    { "name": "OG Peri-Peri Grilled Burger", "mainIngredient": "Flame-grilled chicken in your choice of marinade with house-made mayo", "calories": null, "allergens": "", "spiceLevel": "" },
    { "name": "OG Peri-Peri Grilled Wrap", "mainIngredient": "Grilled chicken, house mayo, lettuce, and your choice of marinade, wrapped", "calories": null, "allergens": "", "spiceLevel": "" },
    { "name": "Peri-Peri Quarter Grilled Chicken", "mainIngredient": "1/4 piece of grilled chicken in your choice of Peckers marinade", "calories": null, "allergens": "", "spiceLevel": "" },
    { "name": "Peri-Peri Half Grilled Chicken", "mainIngredient": "1/2 piece of grilled chicken in your choice of Peckers marinade", "calories": null, "allergens": "", "spiceLevel": "" },
    { "name": "OG Peri-Peri Grilled Rice Bowl", "mainIngredient": "Mild spicy rice, grilled chicken with your choice of marinade, and house mayo", "calories": null, "allergens": "", "spiceLevel": "" },
    { "name": "OG Peri-Peri Grilled Salad Bowl", "mainIngredient": "Mixed salad, grilled chicken with your choice of marinade, and house mayo", "calories": null, "allergens": "", "spiceLevel": "" }
  ],
  "riceBowls": [
    { "name": "The OG Rice Bowl", "mainIngredient": "Mild spicy rice, signature peckers chicken, house mayo, and lettuce", "calories": 666.4, "protein_g": 38.8, "carbs_g": 58.0, "fats_g": 35.6, "allergens": "", "spiceLevel": "1/4" },
    { "name": "Buffalo Soldier Rice Bowl", "mainIngredient": "Mild spicy rice, signature chicken, buffalo sauce, house mayo, lettuce, and onions", "calories": 742.5, "protein_g": 40.1, "carbs_g": 62.2, "fats_g": 41.3, "allergens": "", "spiceLevel": "4/4" },
    { "name": "Murger on the Dance Floor Rice Bowl", "mainIngredient": "Mild spicy rice, peckers chicken, masala sauce, onion bhaji, and pickled onions", "calories": 754.0, "protein_g": 41.4, "carbs_g": 78.3, "fats_g": 33.8, "allergens": "", "spiceLevel": "2/4" },
    { "name": "Hert and Seoul Rice Bowl", "mainIngredient": "Mild spicy rice, signature chicken, Korean glaze, and house mayo", "calories": 705.2, "protein_g": 39.9, "carbs_g": 67.2, "fats_g": 35.2, "allergens": "", "spiceLevel": "2/4" },
    { "name": "Mega Pecker Rice Bowl", "mainIngredient": "Mild spicy rice, double-peckers breaded chicken, hash brown, and melted cheese", "calories": 1119.5, "protein_g": 75.0, "carbs_g": 79.3, "fats_g": 62.6, "allergens": "", "spiceLevel": "1/4" },
    { "name": "Supercharged OG Rice Bowl", "mainIngredient": "Mild spicy rice, peckers breaded chicken, supercharged sauce, and melted cheese", "calories": 600.8, "protein_g": 42.3, "carbs_g": 60.4, "fats_g": 25.5, "allergens": "", "spiceLevel": "3/4" },
    { "name": "OG Peri-Peri Grilled Chicken Rice Bowl", "mainIngredient": "Mild spicy rice, grilled chicken, choice of marinade, and house mayo", "calories": null, "protein_g": null, "carbs_g": null, "fats_g": null, "allergens": "", "spiceLevel": "" }
  ],
  "saladBowls": [
    { "name": "The OG Salad Bowl", "mainIngredient": "Fresh mixed salad, crispy peckers breaded chicken fillet, house mayo", "calories": 539.8, "protein_g": 41.1, "carbs_g": 15.5, "fats_g": 36.8, "allergens": "", "spiceLevel": "1/4" },
    { "name": "Buffalo Soldier Salad Bowl", "mainIngredient": "Fresh salad, signature peckers breaded chicken, house buffalo sauce, and house mayo", "calories": 540.7, "protein_g": 33.7, "carbs_g": 17.7, "fats_g": 38.4, "allergens": "", "spiceLevel": "4/4" },
    { "name": "Murger on the Dance Floor Salad Bowl", "mainIngredient": "Fresh salad, peckers breaded chicken, masala sauce, and onion bhaji", "calories": 549.1, "protein_g": 34.8, "carbs_g": 33.5, "fats_g": 30.9, "allergens": "", "spiceLevel": "2/4" },
    { "name": "Hert and Seoul Salad Bowl", "mainIngredient": "Crunchy mixed salad, crispy peckers breaded chicken fillet, Korean glaze and house mayo, house Korean slaw", "calories": 480.6, "protein_g": 32.8, "carbs_g": 20.9, "fats_g": 30.9, "allergens": "", "spiceLevel": "2/4" },
    { "name": "Mega Pecker Salad Bowl", "mainIngredient": "Fresh mixed salad, double peckers breaded chicken fillet, house mayo, hash brown, melted cheese", "calories": 914.7, "protein_g": 68.3, "carbs_g": 34.5, "fats_g": 59.7, "allergens": "", "spiceLevel": "1/4" },
    { "name": "OG Peri-Peri Grilled Salad Bowl", "mainIngredient": "Mixed salad, grilled chicken with your choice of marinade, and house mayo", "calories": null, "protein_g": null, "carbs_g": null, "fats_g": null, "allergens": "", "spiceLevel": "Depends" }
  ],
  "whatsNew": [
    { "name": "Peckers Health Box", "mainIngredient": "Protein-packed blend of grilled chicken with your choice of marinade, mild spicy rice, salad, and grilled halloumi", "calories": null, "allergens": "", "spiceLevel": "" },
    { "name": "Grilled Wings", "mainIngredient": "Flame-grilled wings with your choice of marinade", "calories": null, "allergens": "", "spiceLevel": "" },
    { "name": "Peckers Grilled Snack Wrap", "mainIngredient": "Grilled chicken, house mayo, house salsa, lettuce in a 10\" wrap", "calories": null, "allergens": "", "spiceLevel": "" },
    { "name": "Honey-Glazed BBQ Classic Burger", "mainIngredient": "Crispy fillet, melted cheese, and house honey BBQ sauce on brioche bun", "calories": null, "allergens": "", "spiceLevel": "" }
  ],
  "veg": [
    { "name": "Peckerless OG Burger", "mainIngredient": "Crunchy plant-based soy patty and house mayo on a seeded brioche", "calories": null, "allergens": "", "spiceLevel": "" },
    { "name": "Peckerless Murger on the Dance Floor Burger", "mainIngredient": "Plant-based soy patty, onion bhaji, and mango chutney in a butter masala sauce", "calories": null, "allergens": "", "spiceLevel": "" },
    { "name": "Peckerless Hert and Seoul Burger", "mainIngredient": "Plant-based soy patty and OG slaw in a Korean glaze and house mayo", "calories": null, "allergens": "", "spiceLevel": "" },
    { "name": "Peckerless Mega Pecker Burger", "mainIngredient": "Double plant-based patties, hash brown, and melted cheese with house mayo", "calories": null, "allergens": "", "spiceLevel": "" },
    { "name": "Peckerless OG Wrap", "mainIngredient": "Crispy soy-based patty, house mayo, and lettuce in a toasted wrap", "calories": null, "allergens": "", "spiceLevel": "" },
    { "name": "Peckerless Murger on the Dance Floor Wrap", "mainIngredient": "Soy-based patty, house masala, onion bhaji, mango chutney, and pickled onions, wrapped", "calories": null, "allergens": "", "spiceLevel": "" },
    { "name": "Peckerless Hert and Seoul Wrap", "mainIngredient": "Soy-based patty, Korean glaze, house mayo, OG slaw, and onions, wrapped", "calories": null, "allergens": "", "spiceLevel": "" },
    { "name": "Peckerless Mega Pecker Wrap", "mainIngredient": "Double soy-based patties, hash brown, cheese, house mayo, lettuce, and onions, wrapped", "calories": null, "allergens": "", "spiceLevel": "" },
    { "name": "Peckerless Rice Bowl", "mainIngredient": "Mild spicy rice, crispy vegetarian soy-based patty, with your choice of a Peckers flavour", "calories": null, "allergens": "", "spiceLevel": "" },
    { "name": "Peckerless Salad Bowl", "mainIngredient": "Fresh mixed salad, crispy vegetarian soy-based patty, with your choice of a Peckers flavour", "calories": null, "allergens": "", "spiceLevel": "" }
  ],
  "sides": [
    { "name": "1 Piece Southern Fried Chicken", "mainIngredient": "", "calories": null, "allergens": "", "spiceLevel": "" },
    { "name": "1 Piece Southern Fried Chicken & Chips", "mainIngredient": "", "calories": null, "allergens": "" },
    { "name": "2 Piece Southern Fried Chicken & Chips", "mainIngredient": "", "calories": null, "allergens": "" },
    { "name": "3 Piece Southern Fried Chicken & Chips", "mainIngredient": "", "calories": null, "allergens": "" },
    { "name": "Fries", "mainIngredient": "Classic and crispy portion of fries", "calories": null, "allergens": "" },
    { "name": "Cheesy Fries", "mainIngredient": "Cheesy fries tossed in mozzarella, house garlic mayo, and chives", "calories": null },
    { "name": "Peckers Loaded Fries", "mainIngredient": "Fries dripping in cheese, house Buffalo Soldier sauce, jalapeños, and crispy onions" },
    { "name": "Halloumi Fries with Chilli Jam", "mainIngredient": "Halloumi fries served with a sweet chilli kick" },
    { "name": "Mac & Cheese Sticks", "mainIngredient": "Mac and cheese bites with house-made OG chilli" },
    { "name": "Corn on the Cob", "mainIngredient": "Sweet, fragrant corn on the cob, buttered to perfection" },
    { "name": "Mac and Cheese", "mainIngredient": "Macaroni pasta tossed in a rich, velvety cheese sauce" },
    { "name": "Rice Bowl", "mainIngredient": "Fragrant, mild spicy rice tossed with peppers, garlic, and onions" },
    { "name": "Salad", "mainIngredient": "Crisp, garden-fresh greens tossed with tangy pickled onions" },
    { "name": "Grilled Halloumi", "mainIngredient": "Grilled halloumi with a perfect squeak, served with zesty salsa" }
  ],
  "shakes": [
    { "name": "Vanilla Milkshake", "description": "Thick, creamy, real vanilla milkshake", "calories": null, "allergens": "" },
    { "name": "Chocolate Milkshake", "description": "Thick, creamy, and properly churned chocolate", "calories": null, "allergens": "" },
    { "name": "Kunafa Dubai Chocolate", "description": "Rich chocolate and pistachio shake with a crunchy kunafa twist", "calories": null, "allergens": "" },
    { "name": "Oreo Cookie Pieces Milkshake", "description": "Thick, creamy, and loaded with real Oreo", "calories": null, "allergens": "" },
    { "name": "Lotus Biscoff Milkshake", "description": "Thick, creamy, and packed with Biscoff crunch", "calories": null, "allergens": "" },
    { "name": "Reese's Peanut Butter Cups", "description": "Thick, creamy, and loaded with Reese's peanut butter", "calories": null, "allergens": "" },
    { "name": "Ferrero Rocher", "description": "Rich, velvety, and packed with Ferrero nuttiness", "calories": null, "allergens": "" },
    { "name": "Kinder Bueno", "description": "Smooth hazelnut flavour blended with real Kinder Bueno", "calories": null, "allergens": "" },
    { "name": "Kinder Bueno White", "description": "Creamy white chocolate and hazelnut blended with Bueno White", "calories": null, "allergens": "" },
    { "name": "Galaxy Caramel", "description": "Smooth milk chocolate blended with Galaxy caramel", "calories": null, "allergens": "" },
    { "name": "Galaxy Original", "description": "Smooth, silky Galaxy chocolate blended into a thick shake", "calories": null, "allergens": "" },
    { "name": "Terry's Orange", "description": "Zesty orange chocolate blended with real Terry's pieces", "calories": null, "allergens": "" },
    { "name": "Bailey's Nutella", "description": "Rich hazelnut cocoa blended with a creamy liqueur kick", "calories": null, "allergens": "" }
  ]
};

const token = process.argv[2];
if (!token) {
  console.error("Please provide a Sanity Write Token as the first argument.");
  process.exit(1);
}

const client = createClient({
  projectId: '3gu4dx3n',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2026-03-07',
  token: token,
});

const DOC_ID = 'db6c36ff-22f1-4474-81ec-6889e8b09f65';

const formatVal = (val, unit) => {
  if (val === null || val === undefined) return "-";
  return `${val}${unit}`;
};

const mapCommon = (item) => ({
  _type: 'object',
  name: item.name,
  ingredients: item.mainIngredient || item.description || "",
  protein: formatVal(item.protein_g, "g"),
  carbs: formatVal(item.carbs_g, "g"),
  fats: formatVal(item.fats_g, "g"),
  calories: formatVal(item.calories, " Kcal"),
  energy: "-",
  allergens: item.allergens || "-",
  spiceLevel: item.spiceLevel || "-",
  availabilityText: item.availabilityText || "",
});

async function migrate() {
  const patches = {
    burgerCarousel: menuData.burgers.map(mapCommon),
    wrapsCarousel: menuData.wraps.map(mapCommon),
    wingsAndTendersCarousel: [
        ...menuData.wingsAndTenders.wings.map(mapCommon),
        ...menuData.wingsAndTenders.tenders.map(mapCommon)
    ],
    periPeriGrillCarousel: menuData.periPeriGrilledChicken.map(mapCommon),
    riceBowlsCarousel: menuData.riceBowls.map(mapCommon),
    saladBowlsCarousel: menuData.saladBowls.map(mapCommon),
    whatsNewCarousel: menuData.whatsNew.map(mapCommon),
    vegCarousel: menuData.veg.map(mapCommon),
    sidesAndFriesCarousel: menuData.sides.map(mapCommon),
    shakesCarousel: menuData.shakes.map(mapCommon),
  };

  console.log("Patching document...");
  const result = await client.patch(DOC_ID).set(patches).commit();
  console.log("Migration successful!", result._id);
}

migrate().catch(err => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});
