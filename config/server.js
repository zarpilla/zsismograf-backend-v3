module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('URL', 'https://api.example.com'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '34dd651ee4ff9a6cb2aae6393f6d90f7'),
    },
    url: env('ADMIN_URL', '/admin')
  },
});
