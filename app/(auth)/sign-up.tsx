import { useRouter, Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SignUp = () => {
  const router = useRouter(); // Router for navigation

  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Example of a simple validation
    if (!name || !email || !password) {
      alert('Please fill out all fields.');
      return;
    }

    // Simulate a successful sign-up
    alert('Sign-Up Successful!');
    router.push('/home'); // Navigate to the home page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up Please</Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />

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

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Link to Sign In Page */}
      <View style={{
         marginTop: 15,
        flexDirection: 'row',
      }}>
      <Text style={{
        color:'white'
      }}>Already have an account? </Text>
      <Link href="/sign-in" style={styles.link}>
         Sign In
      </Link>
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

export default SignUp;
