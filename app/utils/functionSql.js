import { sequelize } from "../models/associations.js"; // import the sequelize object from the associations.js file

const functionSqL = {
  averageRating: async (id) => {
    const result = await sequelize.query(`
            SELECT * FROM find_average_rating(_media_id => :id)
        `, {
      replacements: { id: id },
      type: sequelize.QueryTypes.SELECT
    });
    return result[0];
  },
};

export default functionSqL;