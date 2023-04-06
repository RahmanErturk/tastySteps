export const postSchema = {
  type: "object",
  properties: {
    userName: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string" },
    image: { type: "string" },
    recipes: {
      type: "array",
      items: { type: "object" },
    },
    likedRecipes: {
      type: "array",
      items: { type: "object" },
    },
    shoppingList: { type: "object" },
  },
  required: ["userName", "email", "password"],
  additionalProperties: false,
};
