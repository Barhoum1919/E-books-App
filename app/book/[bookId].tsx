import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from 'react-native-webview';

const Book = () => {
  const { bookId } = useLocalSearchParams();
  const [book, setBook] = useState<any | null>(null);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showIframe, setShowIframe] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string>(""); // Selected text from the WebView
  const [highlightedText, setHighlightedText] = useState<string[]>([]); // Store highlighted texts
  const [notes, setNotes] = useState<string[]>([]); // Notes to save the highlighted text
  const webviewRef = useRef(null);

  // Fetch book details on mount
  useEffect(() => {
    if (bookId) {
      fetchBookDetails(bookId);
    }
  }, [bookId]);

  // JavaScript to capture selected text and highlight it in the WebView
  const injectJavaScriptToCaptureAndHighlightSelection = `
    function highlightText() {
      const selection = window.getSelection();
      if (selection.toString()) {
        const span = document.createElement('span');
        span.style.backgroundColor = 'yellow';
        span.textContent = selection.toString();
        selection.deleteFromDocument();
        selection.getRangeAt(0).insertNode(span);
        return selection.toString();  // Return selected text for saving
      }
      return null;
    }
    highlightText();
  `;

  // Handle message from WebView (highlighted text)
  const onMessage = (event: any) => {
    const highlighted = event.nativeEvent.data;
    if (highlighted) {
      setHighlightedText(prev => [...prev, highlighted]);
      setSelectedText(highlighted);
    }
  };

  // Save the selected highlighted text to notes
  const saveToNotes = () => {
    if (selectedText) {
      setNotes(prevNotes => [...prevNotes, selectedText]);
      setSelectedText(""); // Clear selected text after saving
    }
  };

  // Fetch book details from Google Books API
  const fetchBookDetails = async (id: string | string[]) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
      const bookData = response.data.volumeInfo;
      setBook(bookData);

      const epubLink = response.data.accessInfo?.epub?.downloadLink;
      const pdfLink = response.data.accessInfo?.pdf?.downloadLink;
      setDownloadLink(epubLink || pdfLink || null);
    } catch (error) {
      console.error("Error fetching book details:", error);
      Alert.alert("Error", "Failed to load book details.");
    } finally {
      setLoading(false);
    }
  };

  // Handle the download button press
  const handleDownload = () => {
    if (downloadLink) {
      setShowIframe(true);
    } else {
      Alert.alert("No download link", "No download link is available for this book.");
    }
  };

  // Close the iframe (WebView)
  const handleCloseIframe = () => {
    setShowIframe(false);
  };

  // Render loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF9C01" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Render error if book is not found
  if (!book) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Book not found!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Book details or WebView */}
      {!showIframe ? (
        <>
          <Image source={{ uri: book.imageLinks?.thumbnail }} style={styles.coverImage} />
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>Author: {book.authors ? book.authors.join(", ") : "Unknown"}</Text>
          <Text style={styles.publishedDate}>Published: {book.publishedDate}</Text>
          <Text style={styles.description}>{book.description}</Text>

          <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
            <Text style={styles.downloadButtonText}>Download Book</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.iframeContainer}>
          <WebView
            javaScriptEnabled={true}
            injectedJavaScript={injectJavaScriptToCaptureAndHighlightSelection}
            onMessage={onMessage}
            source={{ uri: downloadLink || '' }}
            style={styles.webviewStyle}
            onError={() => Alert.alert("Error", "Failed to load the content.")}
            startInLoadingState
          />
          <TouchableOpacity onPress={handleCloseIframe} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Save highlighted text as notes */}
      {selectedText && (
        <View style={styles.selectedTextContainer}>
          <Text style={styles.selectedText}>Selected Text: {selectedText}</Text>
          <TouchableOpacity style={styles.saveButton} onPress={saveToNotes}>
            <Text style={styles.saveButtonText}>Save to Notes</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Render notes */}
      <View>
        {notes.map((note, index) => (
          <Text key={index} style={styles.noteText}>{note}</Text>
        ))}
      </View>
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
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    textAlign: "center",
  },
  author: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  publishedDate: {
    fontSize: 16,
    marginBottom: 10,
    color: "white",
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
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
  iframeContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    position: "relative",
  },
  webviewStyle: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 18,
    right: 20,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  downloadButton: {
    backgroundColor: "#FF9C01",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  downloadButtonText: {
    fontSize: 16,
    color: "white",
  },
  selectedTextContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  noteText: {
    fontSize: 14,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 5,
  },
});

export default Book;
