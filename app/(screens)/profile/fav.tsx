import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, RefreshControl } from 'react-native';

const FavoritesScreen = () => {
  const [favBooks, setFavBooks] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Load saved books from AsyncStorage
  const loadSavedBooks = async () => {
    try {
      const storedFavBooks = await AsyncStorage.getItem('favBooks');
      if (storedFavBooks) {
        setFavBooks(JSON.parse(storedFavBooks));
      } else {
        setFavBooks([]); 
      }
    } catch (error) {
      console.error('Failed to load books from AsyncStorage:', error);
    }
  };

  // Load saved books on component mount
  useEffect(() => {
    loadSavedBooks();
  }, []);

  // Handle refresh action
  const onRefresh = async () => {
    setRefreshing(true);
    await loadSavedBooks();
    setRefreshing(false);
  };

  // Open PDF (this function needs to be implemented for opening a PDF file)
  const openPDF = (item: any) => {
    // Example of handling PDF opening (implement according to your requirements)
    console.log(`Opening PDF for ${item.title}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fav Books</Text>
      </View>
      <FlatList
        data={favBooks}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bookCard}
            onPress={() => openPDF(item)}  // Pass item to openPDF
          >
            {item.cover ? (
              <Image source={{ uri: item.cover }} style={styles.bookCover} resizeMode="cover" />
            ) : (
              <Text>No Cover Available</Text>
            )}
            <Text style={styles.bookTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {alignSelf: "center",
    marginTop:40,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  bookCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#232533',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookCover: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  bookTitle: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  contentContainer: {
    paddingBottom: 20,
  },
});

export default FavoritesScreen;
