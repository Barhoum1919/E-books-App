import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image, Button, Linking } from "react-native";
import { useLocalSearchParams } from "expo-router";  // Importing useLocalSearchParams
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

const Book = () => {
  // Using useLocalSearchParams to access the bookId from the URL
  const { bookId } = useLocalSearchParams(); 
  const [book, setBook] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (bookId) {
      fetchBookDetails(bookId);
    }
  }, [bookId]);

  const fetchBookDetails = async (id: string | string[]) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
      setBook(response.data.volumeInfo);
    } catch (error) {
      console.error("Error fetching book details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    // Check if there's a valid epub or pdf download link in accessInfo
    const epubLink = book?.accessInfo?.epub?.downloadLink;
    //const pdfLink = book?.accessInfo?.pdf?.downloadLink;
    Linking.openURL(epubLink);
    
      // Open the epub download link in the browser
      
    
    
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF9C01" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Book not found!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: book.imageLinks?.thumbnail }}
        style={styles.coverImage}
      />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>
        Author: {book.authors ? book.authors.join(", ") : "Unknown"}
      </Text>
      <Text style={styles.publishedDate}>
        Published: {book.publishedDate}
      </Text>
      <Text style={styles.description}>{book.description}</Text>
      
      <Button 
  title="Download Book" 
  onPress={() => {
    const epubLink = book?.accessInfo?.epub?.isAvailable ? book?.accessInfo?.epub?.downloadLink : null;
    const pdfLink = book?.accessInfo?.pdf?.downloadLink; 

    if (epubLink) {
      Linking.openURL(epubLink).catch((err) => {
        console.error("Error opening the EPUB link:", err);
        alert("Unable to open the EPUB link.");
      });
    } else if (pdfLink) {
      Linking.openURL(pdfLink).catch((err) => {
        console.error("Error opening the PDF link:", err);
        alert("Unable to open the PDF link.");
      });
    } else {
      alert("No download link available for this book.");
    }
  }} 
/>



      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#161622", 
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  coverImage: {
    width: 500,
    height: 500,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color:"white"
  },
  author: {
    color:"white",
    fontSize: 18,
    marginBottom: 10,
  },
  publishedDate: {
    fontSize: 16,
    marginBottom: 10,
    color:"white"
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161622",
  },
  loadingText: {
    fontSize: 18,
    color: "#FF9C01",
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

export default Book;
