import React, { useState } from "react";
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
} from "react-native";
import { router } from "expo-router";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const trendingBooks = [
    { id: "1", title: "The Great Gatsby" ,cover: require("../../assets/images/book1.jpg")},
    { id: "2", title: "1984",cover: require("../../assets/images/book2.jpg") },
    { id: "3", title: "To Kill a Mockingbird" ,cover: require("../../assets/images/book3.jpg")},
    { id: "4", title: "Moby Dick",cover: require("../../assets/images/book4.jpg") },
    { id: "5", title: "War and Peace",cover: require("../../assets/images/book1.jpg") },
  ];

  const allBooks = [
    { id: "1", title: "Pride and Prejudice", cover: require("../../assets/images/book1.jpg") },
    { id: "2", title: "The Catcher in the Rye", cover: require("../../assets/images/book2.jpg") },
    { id: "3", title: "Moby Dick", cover: require("../../assets/images/book3.jpg") },
    { id: "4", title: "War and Peace", cover: require("../../assets/images/book4.jpg") },
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refreshing data
    setTimeout(() => setRefreshing(false), 1500);
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
          placeholder="Search for books..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={() => {
          router.push('/categories');
        }}>
          <Image
            source={require("../../assets/images/search.png")}
            style={styles.searchIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Books List */}
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
                  <Image
                    source={item.cover}
                    style={styles.bookCover}
                    resizeMode="contain"
                  />
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
            <Text style={styles.bookTitle}>{item.title}</Text>
            <TouchableOpacity
          style={styles.cardContainer}
          onPress={() => { /* Handle Press */ }}
>
  <Image
    source={item.cover}
    style={styles.cardImage}
    resizeMode="contain"
  />
</TouchableOpacity>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No books found</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
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
    color: "#333", // Text color
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: "#888", // Optional: Set icon color
    marginLeft: 8,
  },
  header: {
    marginBottom: 16,
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
    marginRight: 16,
    alignItems: "center",
  },
  bookCover: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginLeft:22
  },
  trendingText: {
    marginTop: 8,
    fontSize: 12,
    color: "#FFF",
  },
  bookItem: {
    padding: 16,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: "#161622",
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  bookTitle: {
    fontSize: 16,
    color: "white",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
  bookArticle:{
    width:'100%',
    height: 100 ,

  },
  cardContainer: {
    width: '100%', 
    height: 350, 
    marginTop: 12, 
    borderRadius: 16, 
    overflow: 'hidden', 
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5, 
   
  },
  cardImage: {
    width: '100%', 
    height: '100%', 
    borderRadius: 16, 
  },
});
