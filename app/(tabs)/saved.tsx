import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";

const Saved = () => {
  // Sample data for saved books
  const savedBooks = [
    { id: "1", title: "The Great Gatsby", cover: require("../../assets/images/book1.jpg") },
    { id: "2", title: "1984", cover: require("../../assets/images/book2.jpg") },
    { id: "3", title: "Sapiens", cover: require("../../assets/images/book3.jpg") },
    { id: "4", title: "The Hobbit", cover: require("../../assets/images/book4.jpg") }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Books</Text>
      <FlatList
        data={savedBooks}
        keyExtractor={(item) => item.id}
        numColumns={2} 
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.bookCard}>
            <Image source={item.cover} style={styles.bookCover} resizeMode="cover" />
            <Text style={styles.bookTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default Saved;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    marginLeft:100,
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 30,
    marginBottom:15,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  bookCard: {
    flex: 1,
    margin: 8,
    
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
  },
  bookCover: {
    width: 120,
    height: 160,
    borderRadius: 8,
  },
  bookTitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
});
