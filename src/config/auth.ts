export default {
  jwt: {
    secret: process.env.JWT_SECRET,
    expireIn: '1d',
  },
};
