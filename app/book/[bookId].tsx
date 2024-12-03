import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image, Button, Linking } from "react-native";
import { useLocalSearchParams } from "expo-router";  // Importing useLocalSearchParams
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

const Book = () => {
  const { bookId } = useLocalSearchParams(); // Access the bookId from the URL
  const [book, setBook] = useState<any | null>(null);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (bookId) {
      fetchBookDetails(bookId);
    }
  }, [bookId]);

  const fetchBookDetails = async (id: string | string[]) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
      console.log(response.data);  
      const bookData = response.data.volumeInfo;
      setBook(bookData);  
      
      const epubLink = response.data.accessInfo?.epub?.downloadLink;
      const pdfLink = response.data.accessInfo?.pdf?.downloadLink;
      setDownloadLink(epubLink || pdfLink || null);
    } catch (error) {
      console.error("Error fetching book details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (downloadLink) {
      // If there is a download link, open it
      Linking.openURL(downloadLink).catch((err) => {
        console.error("Error opening the download link:", err);
        alert("Unable to open the download link.");
      });
    } else {
      alert("No download link available for this book.");
    }
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
        onPress={handleDownload}
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
    color: "white",
  },
  author: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
  },
  publishedDate: {
    fontSize: 16,
    marginBottom: 10,
    color: "white",
  },
  description: {
    fontSize: 14,
    color: "white",
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
