/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://zenshorts_owner:JUZ5qpGQx7zA@ep-twilight-mud-a2x06ycn.eu-central-1.aws.neon.tech/zenshorts?sslmode=require",
    }
  };