import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { FIREBASE_AUTH } from '../../firebaseConfig'; 

const Profile = () => {
  const router = useRouter();
  
  const [user, setUser] = useState<User | null>(null); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); 
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); 
  }, []);

  const options = [
    { id: "1", title: "Edit Profile", icon: "edit" },
    { id: "2", title: "Favourite Books", icon: "favorite" },
    { id: "3", title: "Become an Author", icon: "person-add" },
    { id: "4", title: "Settings", icon: "settings" },
    { id: "5", title: "Logout", icon: "logout" },
  ];

  const handleOptionPress = (option: string) => {
    switch (option) {
      case "Edit Profile":
        // router.push("/edit-profile");
        break;
      case "Favourite Books":
        // router.push("/favourite-books");
        break;
      case "Become an Author":
        // router.push("/become-an-author");
        break;
      case "Settings":
        // router.push("/settings");
        break;
      case "Logout":
        Alert.alert(
          "Logout",
          "Do you want to Log Out?",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "OK",
              onPress: () => {
                // Firebase logout action
                signOut(FIREBASE_AUTH).then(() => {
                  // After successful sign out, redirect to sign-in page
                  router.push("/sign-in");  // Ensure this route exists
                });
              },
            },
          ],
          { cancelable: true }
        );
        break;
      default:
        console.log("Unknown option selected");
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.noUserText}>Please log in to view your profile</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={user.photoURL ? { uri: user.photoURL } : require("../../assets/images/logo.png")}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.displayName || "No Name"}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* Profile Options */}
      <FlatList
        data={options}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleOptionPress(item.title)}
          >
            <Icon name={item.icon} size={24} color="#FFF" style={styles.optionIcon} />
            <Text style={styles.optionText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.optionsContainer}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    marginTop: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#BBB",
  },
  noUserText: {
    fontSize: 20,
    color: "#FFF",
    textAlign: "center",
    marginTop: 20,
  },
  optionsContainer: {
    paddingBottom: 20,
    marginTop: 60,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  optionIcon: {
    marginRight: 16,
  },
  optionText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default Profile;
