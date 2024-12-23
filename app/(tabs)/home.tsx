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
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from '../../firebaseConfig'; 


const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [trendingBooks, setTrendingBooks] = useState<any[]>([]);
  const [allBooks, setAllBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<any>>(new Set());
  const [saved, setSaved] = useState<Set<any>>(new Set());
  const [readingTime, setReadingTime] = useState<number>(0);
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null); 
  useEffect(() => {
    fetchTrendingBooks();
    fetchAllBooks();
  }, []);
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
  
  const loadReadingTime = async () => {
    try {
      const readingTime = await AsyncStorage.getItem('GlobalReadingTime');
      setReadingTime(readingTime ? parseInt(readingTime, 10) : 0);  
    } catch (error) {
      console.error("Failed to load reading time:", error);
    }
  };
  
  useEffect(() => {
    const loadFromStorage = async () => {
      const favBooks   = await AsyncStorage.getItem("favBooks");
      const savedBooks = await AsyncStorage.getItem("savedBooks");
      if (savedBooks) {
        setSaved(new Set(JSON.parse(savedBooks)));
      }
      if (favBooks){
        setFavorites(new Set(JSON.parse(favBooks)))
      }
    };
    loadFromStorage();
  }, []);
  useEffect(() => {
    loadReadingTime();
  }, []);
  useEffect(() => {
    const saveToStorage = async () => {
      const savedArray = Array.from(saved); 
      await AsyncStorage.setItem("savedBooks", JSON.stringify(savedArray));
    };
    saveToStorage();
  }, [saved]);
  useEffect(() => {
    const saveToStorage = async () => {
      const favArray = Array.from(favorites)
      await AsyncStorage.setItem("favBooks", JSON.stringify(favArray));
    };
    saveToStorage();
  }, [favorites] );

  
  const fetchTrendingBooks = async () => {
    try {
      const response = await axios.get("https://www.googleapis.com/books/v1/volumes", {
        params: {
          q: "publishedDate=2024",
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
          q: "isAvailable",
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
    await Promise.all([fetchTrendingBooks(), fetchAllBooks(),loadReadingTime()]);
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

  const toggleFavorite = (book: any) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(book)) {
        newFavorites.delete(book);
      } else {
        newFavorites.add(book);
      }
      return newFavorites;
    });
  };

  const handleSavedBookToggle = (book: any) => {
    setSaved((prevSaved) => {
      const newSaved = new Set(prevSaved);
      if (newSaved.has(book)) {
        newSaved.delete(book); 
        Alert.alert("Book Deleted from Saved");
      } else {
        newSaved.add(book); 
        Alert.alert("Book Added To Saved");
      }
  
      return newSaved;
    });
  };
  const isBookfav = (bookId: string) => {
    
    return Array.from(favorites).some(savedBook => savedBook.id === bookId);
  };
  const isBookSaved = (bookId: string) => {
    
    return Array.from(saved).some(savedBook => savedBook.id === bookId);
  };
  

  const handleBookPress = (bookId: string) => {
    router.push(`../book/${bookId}`);
  };

  return (
    <SafeAreaView  style={ styles.container}>
      {/* Welcome Section */}
      <View style={styles.welcomeContainer}>
        <View>
          <Text style={styles.greetingText}>Welcome Back!</Text>
          <Text style={styles.usernameText}>{user?.displayName}</Text>
          <Text style={styles.ReadingText}>Today's Reading : {Math.floor(readingTime / 60)}m {readingTime % 60}s
            
          </Text>
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
                      <TouchableOpacity onPress={() => handleBookPress(item.id)}>
                        <Image
                          source={{ uri: item.cover }}
                          style={styles.cardImage}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
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
                <TouchableOpacity onPress={() => toggleFavorite(item)}>
                  <FontAwesome
                    name={isBookfav(item.id) ? "heart" : "heart-o"}
                    size={24}
                    color={isBookfav(item.id) ? "red" : "white"}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSavedBookToggle(item)}>
             <FontAwesome
    name={isBookSaved(item.id) ? "bookmark" : "bookmark-o"}
    size={24}
    color={isBookSaved(item.id) ? "#FF9001" : "white"} 
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
  Timer:{
    fontSize: 34,
    color:"white"
  },
  usernameText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#FFF",
  },
  profileImage: {
    width: 36,
    height: 36,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#161622",
    marginHorizontal: 16,
    marginVertical: 15,
    paddingHorizontal: 8,
    paddingVertical:8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#2C2C2E",
  },
  searchBar: {
    flex: 1,
    height: 40,
    color: "white",
    paddingLeft: 10,
  },
  searchIcon: {
    width: 30,
    height: 30,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 16,
    marginBottom: 8,
  },
  trendingItem: {
    marginRight: 12,
  },
  cardImage: {
    width: 100,
    height: 160,
    borderRadius: 8,
  },
  trendingText: {
    color: "white",
    textAlign: "center",
    marginTop: 8,
  },
  headerSubtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 16,
    marginTop:40
  },
  bookItem: {
    backgroundColor: "#2C2C2E",
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  bookTitle: {
    color: "white",
    fontSize: 16,
    marginTop: 8,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  emptyState: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    color: "white",
  },
  ReadingText:{
    color: "white",
    fontSize:18,
    fontWeight:"bold"
  }
});
