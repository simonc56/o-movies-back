import "dotenv/config";

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.PG_URL, {
  define: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  logging: false,
});

Sequelize.postgres.DECIMAL.parse = function (value) {
  return parseFloat(value);
};

await sequelize.authenticate();
