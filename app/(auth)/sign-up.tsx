import { useRouter, Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { EnvelopeIcon, KeyIcon, EyeIcon, EyeSlashIcon, UserCircleIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = () => {
  const router = useRouter();

  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkedPassword, setCheckedPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCheckedPasswordVisible, setIsCheckedPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // Checkbox state

  const handleSignUp = () => {
    if (!name || !email || !password || !checkedPassword) {
      alert('Please fill out all fields.');
      return;
    }

    if (password !== checkedPassword) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);
    alert('Sign-Up Successful!');
    router.push('/home');
  };

  const handleGoogleSignUp = () => {
    router.push('/home');
  };

  return (
    
      <ImageBackground source={require('../../assets/images/livre.png')} style={styles.container}>
        <Text style={styles.title}>You're just one click away</Text>
        {/*<Text style={styles.subtitle}>Sign Up</Text>*/}

        {/* Name Input */}
        <View style={styles.inputContainer}>
          <UserCircleIcon size={22} color="#FF9C01" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />
        </View>

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

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <KeyIcon size={22} color="#FF9C01" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            placeholderTextColor="#999"
            secureTextEntry={!isCheckedPasswordVisible}
            value={checkedPassword}
            onChangeText={setCheckedPassword}
          />
          <TouchableOpacity onPress={() => setIsCheckedPasswordVisible(!isCheckedPasswordVisible)}>
            {isCheckedPasswordVisible ? (
              <EyeIcon size={22} color="#FF9C01" style={styles.icon} />
            ) : (
              <EyeSlashIcon size={22} color="#FF9C01" style={styles.icon} />
            )}
          </TouchableOpacity>
        </View>

        {/* Password mismatch error message */}
        {passwordMismatch && <Text style={styles.errorText}>Passwords do not match</Text>}

        <TouchableOpacity style={styles.checkboxRow} onPress={() => setIsChecked(!isChecked)}>
          <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]} />
          <Text style={styles.checkboxLabel}>
            I agree to the <Text style={styles.linkText}>Terms and Policy</Text>.
          </Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={[styles.button, (!isChecked || passwordMismatch || !name || !email || !password) && styles.disabledButton]}
          onPress={handleSignUp}
          disabled={!isChecked ||!name || !email || !password || !checkedPassword }
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Google Sign Up Button */}
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignUp}>
          <Image source={require('../../assets/images/google.png')} style={styles.googleImage} />
          <Text style={styles.buttonTextGoogle}>Sign Up with Google</Text>
        </TouchableOpacity>

        {/* Link to Sign In Page */}
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Already have an account? </Text>
          <Link href="/sign-in" style={styles.signInLink}>
            Sign In
          </Link>
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
  subtitle: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    marginBottom: 15,
    borderColor: '#FF9C01',
    borderWidth: 2,
    borderRadius: 25,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#161622',
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 17,
    height: 17,
    borderWidth: 2,
    borderColor: '#FF9C01',
    borderRadius: 4,
    marginRight: 10,
    backgroundColor: '#161622',
    marginTop:3
  },
  checkedCheckbox: {
    backgroundColor: '#FF9C01',
  },
  checkboxLabel: {
    color: 'white',
    fontSize: 16,
  },
  linkText: {
    color: 'white',
  },
  signInLink: {
    color: '#FF9C01',
    textDecorationLine: 'none',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF9C01',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    borderColor: '#FF9C01',
    borderWidth: 1,
  },
  googleImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  buttonTextGoogle: {
    color: 'black',
  },
  linkContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  errorText: {
    textDecorationLine:'underline',
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default SignUp;
