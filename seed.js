console.log("run seed script");

import { faker } from "@faker-js/faker";
import Recipe from "./models/Recipe.js";
import User from "./models/User.js";
import "./lib/mongoose.js";

const users = [];
const recipes = [];

const mealType = [
  "Vorspeise",
  "Hauptspeise",
  "Frühstück",
  "Dessert",
  "Snack",
  "Getränke",
];

const meal = [
  "Fleischgerichte",
  "Fischgerichte",
  "Pizza & Pasta",
  "Backen",
  "Suppe & Eintopf",
  "Salat",
  "Beilagen",
  "Dessert",
  "Auflauf",
  "Snacks",
];

const region = [
  "Asiatisch",
  "Chinesisch",
  "Deutsch",
  "Englisch",
  "Französisch",
  "Arabisch",
  "Griechisch",
  "Indisch",
  "Italienisch",
  "Japanisch",
  "Mexikanisch",
  "Osteuropäisch",
  "Spanisch",
  "Türkisch",
  "Orientalisch",
];

const nutrition = [
  "Vegan",
  "Vegetarisch",
  "Zuckerfrei",
  "Laktosefrei",
  "Glutenfrei",
  "Alkoholfrei",
];

const category = () => ({
  mealType: mealType[Math.floor(Math.random() * mealType.length)],
  meal: meal[Math.floor(Math.random() * meal.length)],
  region: region[Math.floor(Math.random() * region.length)],
  nutrition: nutrition[Math.floor(Math.random() * nutrition.length)],
});

const stepGenerator = () => {
  const steps = [];
  for (let i = 0; i < 5; i++) {
    steps.push(faker.lorem.sentence(5));
  }
  return steps;
};

const ingredientGen = () => {
  const ingredients = [];
  for (let i = 0; i < 5; i++) {
    ingredients.push(faker.lorem.word());
  }
  return ingredients;
};

const addRecipe = async () => {
  const index = Math.floor(Math.random() * 5);
  const newRecipe = await Recipe.create({
    name: faker.lorem.words(3),
    image: faker.image.food(640, 480, true),
    description: stepGenerator(),
    ingredients: ingredientGen(),
    category: category(),
    time: faker.datatype.number({ min: 10, max: 100 }),
    portion: faker.datatype.number({ min: 2, max: 6 }),
    user: users[index],
  });

  recipes.push(newRecipe._id);
};

const addRecipes = async (count = 20) => {
  for (let i = 0; i < count; i++) {
    console.log("adding recipe: ", i + 1);
    await addRecipe();
  }
};

const shoppingListGen = () => {
  const list = [];
  for (let i = 0; i < faker.datatype.number({ min: 5, max: 10 }); i++) {
    list.push(faker.lorem.word());
  }

  return list;
};

const shoppingList = () => ({
  date: faker.date.recent(10),
  title: faker.name.firstName() + "s Einkaufsliste",
  list: shoppingListGen(),
});

const recipesList = () => {
  const myRecipes = [];
  const index = Math.floor(Math.random() * recipes.length);
  for (let i = 0; i < faker.datatype.number({ min: 2, max: 5 }); i++) {
    myRecipes.push(recipes[index]);
  }

  return myRecipes;
};

const createUser = async () => {
  const newUser = await User.create({
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(20),
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    recipes: recipesList(),
    likedRecipes: recipesList(),
    shoppingList: [shoppingList()],
  });

  users.push(newUser._id);
};

const createUsers = async (count = 20) => {
  for (let i = 0; i < count / 4; i++) {
    console.log("creating user: ", i + 1);
    await createUser();
  }
};

try {
  if (!process.argv.includes("doNotDelete")) {
    console.log("deleting all recipes and users...");
    await User.deleteMany();
    await Recipe.deleteMany();
    console.log("done");
  }

  console.log("adding new recipes and users...");
  await addRecipes(
    process.argv[2] === "doNotDelete" ? undefined : process.argv[2]
  );
  await createUsers();
  console.log("done");

  console.log("seeding finished, happy coding!");
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
