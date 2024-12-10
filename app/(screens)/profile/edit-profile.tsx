import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const EditProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = () => {
    alert(`Profile Updated!\nName: ${name}\nEmail: ${email}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      
      <TouchableOpacity  style={styles.Button} onPress={handleSave}><Text style={styles.ButtonText}>Submit Changes </Text></TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20,backgroundColor: "#161622", justifyContent: 'center', alignItems: 'center' },
  heading: { fontSize: 24,color:"white", fontWeight: 'bold', marginBottom: 20 },
  input: { color:"white",borderWidth: 1, padding: 10, marginBottom: 15, width: '100%', borderRadius: 5 },
  Button: {
    backgroundColor: "#FF9C01",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  ButtonText:{
    fontSize: 16,
    color: "white",
  }
});

export default EditProfileScreen;
