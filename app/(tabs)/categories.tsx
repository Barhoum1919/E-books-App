import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

// Define the interface for Book
interface Book {
  id: string;
  title: string;
  cover: any; // Use the appropriate type for image source
}

// Define the interface for Category
interface Category {
  id: string;
  name: string;
  books: Book[];
}

const Categories = () => {
  const categoriesData: Category[] = [
    {
      id: "1",
      name: "Action",
      books: [
        { id: "1", title: "The Great Gatsby", cover: require("../../assets/images/book1.jpg") },
        { id: "2", title: "1984", cover: require("../../assets/images/book2.jpg") },
      ],
    },
    {
      id: "2",
      name: "Romantic",
      books: [
        { id: "3", title: "Sapiens: A Brief History of Humankind", cover: require("../../assets/images/book3.jpg") },
        { id: "4", title: "Educated", cover: require("../../assets/images/book4.jpg") },
      ],
    },
    {
      id: "3",
      name: "Science",
      books: [
        { id: "5", title: "Dune", cover: require("../../assets/images/book1.jpg") },
        { id: "6", title: "Neuromancer", cover: require("../../assets/images/book2.jpg") },
      ],
    },
    {
      id: "4",
      name: "Philosophy",
      books: [
        { id: "7", title: "The Hobbit", cover: require("../../assets/images/book3.jpg") },
        { id: "8", title: "Harry Potter and the Sorcerer's Stone", cover: require("../../assets/images/book4.jpg") },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Browse Categories</Text>
      <FlatList
        data={categoriesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{item.name}</Text>
            <FlatList
              data={item.books}
              horizontal
              keyExtractor={(book) => book.id}
              renderItem={({ item: book }) => (
                <TouchableOpacity
                  style={styles.bookCard}
                  onPress={() => {
                    // Navigate to a book details screen (optional)
                    // router.push(`/book/${book.id}`);
                  }}
                >
                  <Image source={book.cover} style={styles.bookCover} resizeMode="cover" />
                  <Text style={styles.bookTitle}>{book.title}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.bookListContainer}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 16,
    alignSelf: "center",
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 12,
  },
  bookListContainer: {
    paddingHorizontal: 8,
  },
  bookCard: {
    marginRight: 16,
    alignItems: "center",
    backgroundColor: "#222",
    padding: 8,
    borderRadius: 8,
    width: 100,
    height: 160,
  },
  bookCover: {
    width: 80,
    height: 100,
    borderRadius: 8,
  },
  bookTitle: {
    fontSize: 12,
    color: "#FFF",
    marginTop: 8,
    textAlign: "center",
  },
});
