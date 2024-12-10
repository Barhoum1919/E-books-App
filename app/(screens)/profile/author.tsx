import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

const BecomeAuthorScreen = () => {
  const handleSave=()=> {
    Alert.alert("Application Submitted with Success");}

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Become an Author</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your bio"
        multiline 
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Portfolio or Website URL"
        placeholderTextColor="#999"
      />
      
      <TouchableOpacity  style={styles.Button} onPress={handleSave}><Text style={styles.ButtonText}>Submit Application </Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20,backgroundColor: "#161622", justifyContent: 'center', alignItems: 'center' },
  heading: { fontSize: 24,color:"white", fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, width: '100%', borderRadius: 5,
    height: 50,
    paddingLeft: 10,
    fontSize: 16,
    color: 'white', },
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

export default BecomeAuthorScreen;
