module.exports = {
  HOST: "detool.cq7xabbes0x8.ap-south-1.rds.amazonaws.com",
  USER: "KIESQUAREDE",
  PASSWORD: "KIESQUARE123",
  DB: "KIESQUAREDE",
  PORT: 5434, 
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
};
