const { env } = process;
module.exports = {
  HOST: env.HOST,
  PORT: env.PORT,
  jwtSecret:env.JWT_SECRET
}