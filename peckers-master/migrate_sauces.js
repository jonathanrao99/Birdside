const { createClient } = require('@sanity/client');

const sauceData = {
  "sauces": [
    {
      "name": "Mayonnaise",
      "description1": "A master blend of whole eggs, white wine vinegar, and cracked black pepper.",
      "description2": "Freshly made in-house every day, our signature Peckers sauces with zero preservatives, unlike the big boys.",
      "nutrition": {
        "calories_kcal": 622.9,
        "protein_g": 1.2,
        "carbs_g": 0.3,
        "fats_g": 70.5
      },
      "ingredients": ["Eggs", "Sea salt", "Cracked Black Peppercorns"]
    },
    {
      "name": "Garlic Aioli",
      "description1": "Our house-made mayo blended with fresh garlic cloves and a signature citrus finish.",
      "description2": "Freshly made in-house every day, our signature Peckers sauces with zero preservatives, unlike the big boys.",
      "nutrition": {
        "calories_kcal": 563.1,
        "protein_g": 1.4,
        "carbs_g": 2.5,
        "fats_g": 62.7
      },
      "ingredients": ["Garlic cloves", "Lemon wedges", "Black cracked peppercorns"]
    },
    {
      "name": "Butter Me Up",
      "description1": "Rich, creamy, and full of bold flavors, this family recipe brings a touch of heritage to every dish.",
      "description2": "Freshly made in-house every day, our signature Peckers sauces with zero preservatives, unlike the big boys.",
      "nutrition": {
        "calories_kcal": 531.3,
        "protein_g": 4.7,
        "carbs_g": 16.6,
        "fats_g": 48.9
      },
      "ingredients": ["Butter", "Onion", "Sea salt", "Tomato"]
    },
    {
      "name": "Honey Glaze BBQ",
      "description1": "A bold fusion of savoury Hoisin and sun-ripened tomatoes, finished with a kick of Cayenne.",
      "description2": "Freshly made in-house every day, our signature Peckers sauces with zero preservatives, unlike the big boys.",
      "nutrition": {
        "calories_kcal": 364.1,
        "protein_g": 1.5,
        "carbs_g": 64.2,
        "fats_g": 12.0
      },
      "ingredients": ["Honey", "Cherry tomato", "Soy Beans"]
    },
    {
      "name": "Hot Honey",
      "description1": "A powerhouse blend of farm-fresh honey, fiery sriracha, and our signature secret spice mix. It's the perfect balance of sweetness and heat.",
      "description2": "Freshly made in-house every day, our signature Peckers sauces with zero preservatives, unlike the big boys.",
      "nutrition": {
        "calories_kcal": 301.7,
        "protein_g": 1.1,
        "carbs_g": 54.1,
        "fats_g": 9.5
      },
      "ingredients": ["Honey", "Chillies"]
    },
    {
      "name": "Katsu Curry",
      "description1": "Slow-cooked with coconut milk, fresh aromatics, and a custom spice blend for a deep, authentic flavour.",
      "description2": "Freshly made in-house every day, our signature Peckers sauces with zero preservatives, unlike the big boys.",
      "nutrition": {
        "calories_kcal": 125.9,
        "protein_g": 1.5,
        "carbs_g": 13.9,
        "fats_g": 6.9
      },
      "ingredients": ["Coconut", "Honey", "Spice powders"]
    },
    {
      "name": "Korean Gochujang",
      "description1": "A rich blend of fermented chillies and aged soy, finished with the nuttiness of toasted sesame.",
      "description2": "Freshly made in-house every day, our signature Peckers sauces with zero preservatives, unlike the big boys.",
      "nutrition": {
        "calories_kcal": 272.2,
        "protein_g": 2.4,
        "carbs_g": 32.9,
        "fats_g": 15.1
      },
      "ingredients": ["Chillies", "Soya beans", "Sesame seeds"]
    },
    {
      "name": "Peanut Sweet Chilli",
      "description1": "Roasted peanuts and sun-ripened chillies, balanced with fresh herbs and a signature spice blend.",
      "description2": "Freshly made in-house every day, our signature Peckers sauces with zero preservatives, unlike the big boys.",
      "nutrition": {
        "calories_kcal": 222.7,
        "protein_g": 9.4,
        "carbs_g": 20.4,
        "fats_g": 13.6
      },
      "ingredients": ["Peanuts", "Chillies", "Spices"]
    },
    {
      "name": "Super Charge OG",
      "description1": "Hand-whisked whole eggs and bold Sriracha, balanced with a zesty citrus kick and smoked paprika.",
      "description2": "Freshly made in-house every day, our signature Peckers sauces with zero preservatives, unlike the big boys.",
      "nutrition": {
        "calories_kcal": 99.7,
        "protein_g": 4.4,
        "carbs_g": 12.0,
        "fats_g": 3.7
      },
      "ingredients": ["Eggs", "Chillies", "Lemon zest or lemon wedge"]
    },
    {
      "name": "Buffalo",
      "description1": "Buffalo Sauce \u2014 A creamy, spicy blend with the perfect balance of heat and tang, enhanced with bold seasonings for a zesty punch.",
      "description2": "Freshly made in-house every day, our signature Peckers sauces with zero preservatives, unlike the big boys.",
      "nutrition": {
        "calories_kcal": 313.8,
        "protein_g": 1.9,
        "carbs_g": 2.1,
        "fats_g": 33.0
      },
      "ingredients": ["Onion", "Butter", "Few spices"]
    },
    {
      "name": "Ranch (Dip)",
      "description1": "Creamy sour cream and tangy buttermilk, finished with fresh chives and cracked black pepper.",
      "description2": "Freshly made in-house every day, our signature Peckers sauces with zero preservatives, unlike the big boys.",
      "nutrition": {
        "calories_kcal": 425.9,
        "protein_g": 2.5,
        "carbs_g": 3.7,
        "fats_g": 45.9
      },
      "ingredients": ["Eggs", "Peppercorn", "Chives"]
    },
    {
      "name": "Cheese Sauce",
      "description1": "Creamy, indulgent sauce combining smooth cheddar and a hint of smoked paprika.",
      "description2": "Freshly made in-house every day, our signature Peckers sauces with zero preservatives, unlike the big boys.",
      "nutrition": {
        "calories_kcal": null,
        "protein_g": null,
        "carbs_g": null,
        "fats_g": null
      },
      "ingredients": ["Cheese", "Paprika powder"]
    },
    {
      "name": "OG Chilli",
      "description1": "",
      "description2": "Freshly made in-house every day, our signature Peckers sauces with zero preservatives, unlike the big boys.",
      "nutrition": {
        "calories_kcal": 52.0,
        "protein_g": 1.2,
        "carbs_g": 11.0,
        "fats_g": 0.2
      },
      "ingredients": []
    },
    {
      "name": "Korean Glaze",
      "description1": "",
      "description2": "Freshly made in-house every day, our signature Peckers sauces with zero preservatives, unlike the big boys.",
      "nutrition": {
        "calories_kcal": 130.2,
        "protein_g": 1.2,
        "carbs_g": 30.5,
        "fats_g": 0.8
      },
      "ingredients": []
    }
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

async function migrate() {
  console.log("Starting migration...");

  for (const sauce of sauceData.sauces) {
    console.log(`Processing ${sauce.name}...`);
    
    const doc = {
      _type: 'saucePage',
      title: sauce.name,
      descLine1: sauce.description1,
      descLine2: sauce.description2,
      cal: sauce.nutrition.calories_kcal !== null ? String(sauce.nutrition.calories_kcal) : "-",
      protein: sauce.nutrition.protein_g !== null ? String(sauce.nutrition.protein_g) : "-",
      carbs: sauce.nutrition.carbs_g !== null ? String(sauce.nutrition.carbs_g) : "-",
      fat: sauce.nutrition.fats_g !== null ? String(sauce.nutrition.fats_g) : "-",
      ingredients: sauce.ingredients
    };

    // Use name as part of ID to avoid duplicates if possible, or just create new ones
    // Actually, it's better to search for existing documents by title and update them
    const existing = await client.fetch(`*[_type == "saucePage" && title == $title][0]`, { title: sauce.name });

    if (existing) {
      console.log(`Updating existing document for ${sauce.name}...`);
      await client.patch(existing._id).set(doc).commit();
    } else {
      console.log(`Creating new document for ${sauce.name}...`);
      await client.create(doc);
    }
  }

  console.log("Migration successful!");
}

migrate().catch(err => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});
