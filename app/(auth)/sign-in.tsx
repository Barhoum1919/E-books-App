import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SignIn = () => {
  const router = useRouter(); // Router for navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    // Handle authentication logic here (e.g., API call)
    alert('Sign-In Successful!');
    router.push('/home'); // Navigate to the home screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please Fill The Login Form</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#999"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      {/* Sign In Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Link to Sign-Up Page */}
      <View style={{
       marginTop:15,
       flexDirection: 'row',
      }}>
      <Text style={{
        color:'white'
      }}>Don't have an account?</Text>
      <TouchableOpacity onPress={() => router.push('/sign-up')}>
        <Text style={styles.link}> Sign Up</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#161622',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FF9C01",
    alignItems: "center",
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#FF9C01',
    borderWidth: 3,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF9C01',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    
    fontSize: 16,
    color: '#FF9C01',
    textDecorationLine: 'none',
  },
  
});

export default SignIn;
