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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebView from 'react-native-webview';
import { Iframe } from "@bounceapp/iframe"

const Saved = () => {
  const [savedBooks, setSavedBooks] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState<string | null>(null);
  const fileName = 'bookspdf/book1.pdf';  // Relative path inside the assets folder
  const fileUri =
    Platform.OS === 'android'
      ? `file:///assets/${fileName}`  
      : require(`../../assets/${fileName}`);
  const yourPdfURL=`https://docs.google.com/gview?embedded=true&url=https://www.orimi.com/pdf-test.pdf`;
  


  // Fetch saved books from AsyncStorage
  const loadSavedBooks = async () => {
    try {
      const storedBooks = await AsyncStorage.getItem("savedBooks");
      if (storedBooks) {
        setSavedBooks(JSON.parse(storedBooks));
      } else {
        setSavedBooks([]);
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
    setSelectedPDF(fileUri);
  };

  if (selectedPDF) {
    if (Platform.OS === "web") {
      return (
        <View style={styles.webPDFContainer}>
          <iframe
            src={selectedPDF}
            style={styles.webPDFViewer}
            title="PDF Viewer"
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedPDF(null)}
          >
            <Text style={styles.closeButtonText}>Close PDF</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (Platform.OS === "ios" || Platform.OS === "android") {
      return (
        <View style={styles.nativePDFContainer}>
           
          <Iframe uri={yourPdfURL} style={{ flex: 1 , justifyContent:'center'}} />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedPDF(null)}
          >
            <Text style={styles.closeButtonText}>Close PDF</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

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
            onPress={() => openPDF()}  // Assuming item.pdfUri stores the path to the PDF
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
    paddingTop: Platform.OS === "android" ? 70 : 50,
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
  pdfContainer: {
    flex: 1,
    backgroundColor: "#000",
    margin: 10,
  },
  pdfViewer: {
    flex: 1,
    margin: 10,
  },
  webPDFContainer: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  webPDFViewer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  closeButton: {
    backgroundColor: "#333",
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  nativePDFContainer: {
    flex: 1,
  },
  nativePDFViewer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
