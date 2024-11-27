import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Text,
  TextInput,
  View,
  StyleSheet,
  RefreshControl,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { router, usePathname } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [trendingBooks, setTrendingBooks] = useState<any[]>([]);
  const [allBooks, setAllBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState<Set<string>>(new Set());
  
  const pathname = usePathname();

  useEffect(() => {
    fetchTrendingBooks();
    fetchAllBooks();
  }, []);

  const fetchTrendingBooks = async () => {
    try {
      const response = await axios.get("https://www.googleapis.com/books/v1/volumes", {
        params: {
          q: "arabic",
          maxResults: 10,
          filter: "free-ebooks",
          key: "AIzaSyBqunAvVOl7RZWe0oAVOcU_LhevuP8TGeE",
        },
      });
      setTrendingBooks(
        response.data.items.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo.title || "No Title found",
          author: item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "No author found",
          description: item.volumeInfo.description || "No Description found",
          publishedDate: item.volumeInfo.publishedDate || "No Date Found",
          cover: item.volumeInfo.imageLinks?.thumbnail || null,
        }))
      );
    } catch (error) {
      console.error("Error fetching trending books:", error);
    }
  };

  const fetchAllBooks = async () => {
    try {
      const response = await axios.get("https://www.googleapis.com/books/v1/volumes", {
        params: {
          q: "all books",
          maxResults: 10,
          filter: "free-ebooks",
          key: "AIzaSyBqunAvVOl7RZWe0oAVOcU_LhevuP8TGeE",
        },
      });
      setAllBooks(
        response.data.items.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo.title || "No Title",
          author: item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "No author found",
          description: item.volumeInfo.description || "No Description found",
          publishedDate: item.volumeInfo.publishedDate || "No Date Found",
          cover: item.volumeInfo.imageLinks?.thumbnail || null,
        }))
      );
    } catch (error) {
      console.error("Error fetching all books:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchTrendingBooks(), fetchAllBooks()]);
    setRefreshing(false);
  };

  const handleSearch = () => {
    if (!query) {
      Alert.alert("Please enter something to search for");
      return;
    }
    if (pathname.startsWith('/search')) {
      router.setParams({ query });
    } else {
      router.push(`/search/${query}`);
    }
  };

  const toggleFavorite = (bookId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(bookId)) {
        newFavorites.delete(bookId);
      } else {
        newFavorites.add(bookId);
      }
      return newFavorites;
    });
  };

  const handleSavedBookToggle = (bookId: string) => {
    setSaved((prevSaved) => {
      const newSaved = new Set(prevSaved);
      if (newSaved.has(bookId)) {
        newSaved.delete(bookId);  // Remove from saved
      } else {
        newSaved.add(bookId);  // Add to saved
      }
      return newSaved;
    });
  };
  const handleBookPress = (bookId: string) => {
    // Navigate to the Book details page with the bookId
    router.push(`../book/${bookId}`);
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Welcome Section */}
      <View style={styles.welcomeContainer}>
        <View>
          <Text style={styles.greetingText}>Welcome Back!</Text>
          <Text style={styles.usernameText}>Ibrahim</Text>
        </View>
        <Image
          source={require("../../assets/images/book_icon.png")}
          style={styles.profileImage}
          resizeMode="contain"
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          value={query}
          onChangeText={setQuery}
          placeholder="Search for books..."
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity onPress={handleSearch}>
          <Image
            source={require("../../assets/images/search.png")}
            style={styles.searchIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FF9C01" />
      ) : (
        <FlatList
          data={allBooks}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Trending Books</Text>
              <FlatList
                data={trendingBooks}
                horizontal
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.trendingItem}>
                    {item.cover && (
                      <TouchableOpacity onPress={() => handleBookPress(item.id)} >
                      <Image
                        source={{ uri: item.cover }}
                        style={styles.bookCover}
                        resizeMode="contain"
                      /></TouchableOpacity>
                    )}
                    <Text style={styles.trendingText}>{item.title}</Text>
                    
                  </View>
                )}
                showsHorizontalScrollIndicator={false}
              />
              <Text style={styles.headerSubtitle}>All Books</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => handleBookPress(item.id)}
              >
                {item.cover && (
                  <Image
                    source={{ uri: item.cover }}
                    style={styles.cardImage}
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
              <Text style={styles.bookTitle}>BookTitle: {item.title}</Text>
              <Text style={styles.bookTitle}>Published Date: {item.publishedDate}</Text>
             
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                  <FontAwesome
                    name={favorites.has(item.id) ? "heart" : "heart-o"}
                    size={24}
                    color={favorites.has(item.id) ? "red" : "white"}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSavedBookToggle(item.id)}>
                  <FontAwesome
                    name={saved.has(item.id) ? "bookmark" : "bookmark-o"}
                    size={24}
                    color={saved.has(item.id) ? "#FF9001" : "white"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={() => (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No books found</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
  },
  welcomeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  greetingText: {
    fontSize: 14,
    color: "#AAA",
  },
  usernameText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#FFF",
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    margin: 16,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
  },
  searchBar: {
    flex: 1,
    height: "100%",
    color: "#333",
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: "#888",
    marginLeft: 8,
  },
  header: {
    marginBottom: 30,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#FFF",
  },
  headerSubtitle: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  trendingItem: {
    marginRight: 30,
    alignItems: "center",
    marginBottom:30
  },
  bookCover: {
    width: 100,
    height: 140,
    borderRadius: 8,
  },
  trendingText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  bookItem: {
    padding: 16,
    backgroundColor: "#242430",
    borderRadius: 8,
    marginBottom: 16,
  },
  bookTitle: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 4,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cardContainer: {
    marginBottom: 10,
  },
  cardImage: {
    width: "100%",
    height: 160,
    borderRadius: 8,
  },
  emptyState: {
    alignItems: "center",
    padding: 16,
  },
  emptyText: {
    color: "#AAA",
  },
});
