import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ImageBackground } from 'react-native';
import { EnvelopeIcon, KeyIcon, EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline'; // Import Eye icons from Heroicons

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSignIn = () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    alert('Sign-In Successful!');
    router.push('/home'); // Navigate to home
  };

  return (
    <ImageBackground 
    source={require('../../assets/images/livre.png')} 
    style={styles.container}
  >
 
      <Text style={styles.title}>Log in and explore!</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <EnvelopeIcon size={22} color="#FF9C01" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
  <KeyIcon size={22} color="#FF9C01" style={styles.icon} />
  <TextInput
    style={styles.input}
    placeholder="Enter your password"
    placeholderTextColor="#999"
    secureTextEntry={!isPasswordVisible}  
    value={password}
    onChangeText={setPassword}
  />
  <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
    {isPasswordVisible ? (
      <EyeIcon size={22} color="#FF9C01" style={styles.icon} />
    ) : (
      <EyeSlashIcon size={22} color="#FF9C01" style={styles.icon} />
    )}
  </TouchableOpacity>
</View>


      {/* Sign In Button */}
      <TouchableOpacity style={[styles.button, (!email || !password)  && styles.disabledButton]} onPress={handleSignIn}
      disabled={ !email || !password }
      
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Link to Sign-Up Page */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/sign-up')}>
          <Text style={styles.link}> Sign Up</Text>
        </TouchableOpacity>
      </View>
   
  </ImageBackground>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginTop:15,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#FF9C01',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderColor: '#FF9C01',
    borderWidth: 2,
    borderRadius: 25,  // Round the corners
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    fontSize: 16,
    color: '#161622',  // Dark color for better contrast
  },
  icon: {
    marginRight: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF9C01',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,  // Round the corners of the button
    marginBottom: 20,
    elevation: 4,  // Shadow for Android
    shadowColor: '#000',  // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 9,
  },
  signUpText: {
    
    color: 'white',
    
  },
  link: {
    
    color: '#FF9C01',
    marginLeft: 5,
    textDecorationLine: 'none',
  },
  disabledButton:{
    backgroundColor: '#999'
  }
});

export default SignIn;
