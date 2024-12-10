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
import WebView from "react-native-webview";

const Saved = () => {
  const [savedBooks, setSavedBooks] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState<string | null>(null);
  const [readingTime, setReadingTime] = useState<number>(0); 
  const [globalReadingTime, setGlobalReadingTime] = useState<number>(0); 
  const [timerId, setTimerId] = useState<ReturnType<typeof setInterval> | null>(null);
  const PdfURL =
    "https://mozilla.github.io/pdf.js/web/viewer.html?file=https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf";

  // Load saved books and global reading time from AsyncStorage
  useEffect(() => {
    loadSavedBooks();
    loadGlobalReadingTime();

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, []);

  const loadSavedBooks = async () => {
    try {
      const storedBooks = await AsyncStorage.getItem("savedBooks");
      setSavedBooks(storedBooks ? JSON.parse(storedBooks) : []);
    } catch (error) {
      console.error("Failed to load books from AsyncStorage:", error);
    }
  };

  const loadGlobalReadingTime = async () => {
    try {
      const storedTime = await AsyncStorage.getItem("GlobalReadingTime");
      setGlobalReadingTime(storedTime ? parseInt(storedTime, 10) : 0);
    } catch (error) {
      console.error("Failed to load global reading time:", error);
    }
  };

  const saveGlobalReadingTime = async () => {
    try {
      const updatedTime = globalReadingTime + readingTime;
      await AsyncStorage.setItem("GlobalReadingTime", updatedTime.toString());
      setGlobalReadingTime(updatedTime);
    } catch (error) {
      console.error("Failed to save global reading time:", error);
    }
  };

  const startReadingTimer = () => {
    if (timerId) return; 
    const timer = setInterval(() => {
      setReadingTime((prev) => prev + 1);
    }, 1000);
    setTimerId(timer);
  };

  const stopReadingTimer = async () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
    try {
      await saveGlobalReadingTime();
      Alert.alert(
        "Reading Paused",
        `You spent: ${Math.floor(readingTime / 60)}m ${readingTime % 60}s reading`
      );
      setReadingTime(0); 
    } catch (error) {
      console.error("Failed to stop reading timer:", error);
    }
  };

  const openPDF = async () => {
    setSelectedPDF(PdfURL);
    startReadingTimer();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSavedBooks();
    setRefreshing(false);
  };

  if (selectedPDF) {
    return (
      <View style={styles.pdfContainer}>
        <WebView source={{ uri: PdfURL }} style={styles.pdfViewer} />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            setSelectedPDF(null);
            stopReadingTimer();
          }}
        >
          <Text style={styles.closeButtonText}>Close PDF</Text>
        </TouchableOpacity>
      </View>
    );
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
          <TouchableOpacity style={styles.bookCard} onPress={openPDF}>
            {item.cover ? (
              <Image source={{ uri: item.cover }} style={styles.bookCover} />
            ) : (
              <Text>No Cover Available</Text>
            )}
            <Text style={styles.bookTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
    backgroundColor: "#000"
  },
  pdfViewer: {
    flex: 1,
    marginTop:45
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
});
