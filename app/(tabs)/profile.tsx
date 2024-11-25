import { useRouter } from "expo-router"; // Use `useRouter` hook from expo-router
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Profile = () => {
  const router = useRouter(); // Initialize router
  const user = {
    name: "Ibrahim Darghouthi",
    email: "ibrahim.darghouthi@supcom.tn",
    avatar: require("../../assets/images/logo.png"), // Replace with your image path
  };

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
        //router.push("/edit-profile");
        break;
      case "Favourite Books":
       // router.push("/favourite-books");
        break;
      case "Become an Author":
       // router.push("/become-an-author");
        break;
      case "Settings":
        //router.push("/settings");
        break;
      case "Logout":
        router.push("/sign-in");
        break;
      default:
        console.log("Unknown option selected");
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image source={user.avatar} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
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

export default Profile;

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
