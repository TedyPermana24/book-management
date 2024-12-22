const sequelize = require('./utils/db');
const User = require('./models/userModel');
const Book = require('./models/bookModel');
const app = require('./app');
const PORT = 3000;

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });