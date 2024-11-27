import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();  
  const [books, setBooks] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (query) {
      fetchBooks(query);
    }
  }, [query]);

  const fetchBooks = async (query: string | string[]) => {
    try {
      const response = await axios.get("https://www.googleapis.com/books/v1/volumes", {
        params: {
          q: query,
          maxResults: 10,
          filter: "free-ebooks",
          key: "AIzaSyBqunAvVOl7RZWe0oAVOcU_LhevuP8TGeE",  
        },
      });
      setBooks(response.data.items || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderBookItem = ({ item }: { item: any }) => {  
    return (
      <TouchableOpacity onPress={()=>{
        router.push(`/book/${item.id}`);
      }}>
      <View style={styles.bookItem}>
        <Text style={styles.bookTitle}>{item.volumeInfo.title}</Text>
        <Text style={styles.bookAuthor}>
          {item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "No author found"}
        </Text>
        {item.volumeInfo.imageLinks && (
          <Image
            source={{ uri: item.volumeInfo.imageLinks.smallThumbnail }}
            style={styles.bookImage}
          />
        )}
      </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF9C01" /> 
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
  const handleBookPress = (bookId: string) => {
    // Navigate to the Book details page with the bookId
    router.push(`../book/${bookId}`);
  };
  return (
    <SafeAreaView style={styles.container} >
      <Text style={styles.title}>Search Results</Text>
      <Text style={styles.queryText}>Showing results for: {query}</Text>

      {books.length > 0 ? (
        <FlatList
          data={books}
          renderItem={renderBookItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noQueryText}>No books found for "{query}".</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#161622", // Match the theme
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF9C01",
    marginBottom: 20,
  },
  queryText: {
    fontSize: 18,
    color: "#AAA",
    marginBottom: 50,
  },
  bookItem: {
    marginBottom: 100,
    alignItems: "center",
    width: "100%",
    backgroundColor: "#161622",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
  },
  bookAuthor: {
    fontSize: 14,
    color: "#555",
  },
  bookImage: {
    width: 300,
    height: 200,
    marginTop: 10,
    borderRadius:25
  },
  noQueryText: {
    fontSize: 18,
    color: "#888",
    marginTop: 20,
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
});

export default Search;
