const bcrypt = require('bcrypt'); 
const User = require('./models/userModel'); 

async function createAdmin() {
  const hashedPassword = await bcrypt.hash('admin', 10); 

  try {
    const admin = await User.create({
      username: 'admin',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('Admin user created:', admin);
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

createAdmin();
