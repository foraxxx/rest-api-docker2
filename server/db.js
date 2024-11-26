import {Sequelize} from 'sequelize'

// process.loadEnvFile(".env")

const sequelize = new Sequelize(process.env.DATABASE_URL,
  // process.env.DB_NAME,
  // process.env.DB_USER,
  // process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    protocol: 'postgres',
    // host: process.env.DB_HOST,
    // port: process.env.DB_PORT,
  }
)

export default sequelize