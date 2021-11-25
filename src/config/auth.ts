export default {
  secret: process.env.TOKEN_SECRET,
  secret_refresh_token: process.env.REFRESH_TOKEN_SECRET,
  expires_in_token: '15m',
  expires_in_refresh_token: '7d',
  expires_refresh_token_days: 30,
};
