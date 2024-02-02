const Recipe = require("../models/recipe");

module.exports = {
  Query: {
    async recipe(_, ID) {
      return await Recipe.findById(ID);
    },
    async getRecipes(_, { amount }) {
      return await Recipe.find().sort({ createAt: -1 }.limit(amount));
    },
  },
  Mutation: {
    async createRecipe(_, { recipeInput: { name, description } }) {
      const createdRecipe = new Recipe({
        name: name,
        description: description,
        createdAt: new Date().toISOString(),
        thumbsUp: 0,
        thumbsDown: 0,
      });
      const res = await createdRecipe.save();

      return { id: res.id, ...res._doc };
    },
    async deleteRecipe(_, { ID }) {
      const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },
    async editRecipe(_, { ID, editrecipeInput: { name, description } }) {
      const result = await Recipe.updateOne(
        { _id: ID },
        { $set: { name: name, description: description } }
      );

      return result.modifiedCount === 1;
    },
  },
};
