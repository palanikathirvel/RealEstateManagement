// Debug login functionality
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './backend/.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for debugging...');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const debugUser = async () => {
  await connectDB();
  
  // Import User model
  const User = require('./backend/models/User');
  
  try {
    // Find the user
    const user = await User.findOne({ 
      email: 'rajesh.agent@gmail.com' 
    }).select('+password');
    
    if (!user) {
      console.log('❌ User not found in database!');
      return;
    }
    
    console.log('✅ User found:');
    console.log('- Name:', user.name);
    console.log('- Email:', user.email);
    console.log('- Role:', user.role);
    console.log('- Status:', user.status);
    console.log('- Password hash length:', user.password.length);
    console.log('- Password starts with:', user.password.substring(0, 10) + '...');
    
    // Test password comparison
    const testPassword = 'agent123';
    console.log('\n🧪 Testing password comparison...');
    
    // Method 1: Using the model method
    const isValid1 = await user.comparePassword(testPassword);
    console.log('- Model method result:', isValid1);
    
    // Method 2: Direct bcrypt compare
    const isValid2 = await bcrypt.compare(testPassword, user.password);
    console.log('- Direct bcrypt result:', isValid2);
    
    // Test with wrong password
    const isValid3 = await user.comparePassword('wrongpassword');
    console.log('- Wrong password result:', isValid3);
    
    if (isValid1 && isValid2) {
      console.log('✅ Password verification working correctly');
    } else {
      console.log('❌ Password verification failed');
    }
    
  } catch (error) {
    console.error('❌ Debug error:', error);
  } finally {
    await mongoose.disconnect();
  }
};

// Run the debug
debugUser();