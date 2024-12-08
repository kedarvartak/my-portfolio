const corsOptions = {
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:3000',
    'https://my-portfolio-r4a11ypl0-kedar-vartaks-projects.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = corsOptions; 