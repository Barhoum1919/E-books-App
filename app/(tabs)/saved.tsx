import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Platform,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PdfRendererView from 'react-native-pdf-renderer';
import RNFS from 'react-native-fs'; 
import { Linking } from "react-native";
const Saved = () => {
  const [savedBooks, setSavedBooks] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState<string | null>(null);

  // Fetch saved books from AsyncStorage
  const loadSavedBooks = async () => {
    try {
      const storedBooks = await AsyncStorage.getItem("savedBooks");
      if (storedBooks) {
        setSavedBooks(JSON.parse(storedBooks));
      }
    } catch (error) {
      console.error("Failed to load books from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    loadSavedBooks();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSavedBooks();
    setRefreshing(false);
  };

  const openPDF = () => {
    const pdfUri:string= require("../../assets/bookspdf/book1.pdf");
    if (Platform.OS === "web") {
      // Open PDF in a new browser tab
      window.open(pdfUri, "_blank");
    } else if (Platform.OS === "ios" || Platform.OS === "android") {
      // Use native PDF viewer
      Linking.openURL("pdfUri");
    } else {
      Alert.alert("Unsupported Platform", "PDF viewing is not supported on this platform.");
    }
  };

  /*if (selectedPDF) {
    return (
      <View style={styles.pdfContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedPDF(null)}>
          <Text style={styles.closeButtonText}>Close PDF</Text>
        </TouchableOpacity>
      </View>
    );
  }*/

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Books</Text>
      </View>
      <FlatList
        data={savedBooks}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bookCard}
            onPress={() => openPDF()}
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

export default Saved;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161622",
    paddingHorizontal: 16,
    paddingTop: 70,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#161622",
    paddingVertical: 15,
    zIndex: 10,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  pdfContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  pdfViewer: {
    flex: 1,
    margin: 10,
  },
  closeButton: {
    marginTop:50,
    backgroundColor: "#333",
    padding: 10,
    alignItems: "center",
  },
  closeButtonText: {

    color: "#FFF",
    fontSize: 16,
  },
  contentContainer: {
    paddingBottom: 20,
    paddingTop: 50,
  },
  bookCard: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    backgroundColor: "#333",
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
