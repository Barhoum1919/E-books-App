import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SettingsScreen = () => {
  const [isNotificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isOnlineEnabled, setOnlineEnabled] = useState(false);
  const [isLessDataEnabled, setLessDataEnabled] = useState(false);
  const [isRestrictAdsEnabled, setRestrictAdsEnabled] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const toggleNotifications = () => setNotificationsEnabled(!isNotificationsEnabled);
  const toggleOnline = () => setOnlineEnabled(!isOnlineEnabled);
  const toggleLessData = () => setLessDataEnabled(!isLessDataEnabled);
  const toggleRestrictAds = () => setRestrictAdsEnabled(!isRestrictAdsEnabled);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <View style={styles.settingRow}>
        <Text style={styles.label}>Enable Notifications</Text>
        <Switch value={isNotificationsEnabled} onValueChange={toggleNotifications} />
      </View>
      <View style={styles.settingRow}>
        <Text style={styles.label}>Online Status</Text>
        <Switch value={isOnlineEnabled} onValueChange={toggleOnline} />
      </View>
      <View style={styles.settingRow}>
        <Text style={styles.label}>Use Less Cellular Data</Text>
        <Switch value={isLessDataEnabled} onValueChange={toggleLessData} />
      </View>
      <View style={styles.settingRow}>
        <Text style={styles.label}>Restrict Ads</Text>
        <Switch value={isRestrictAdsEnabled} onValueChange={toggleRestrictAds} />
      </View>
      <View style={styles.languageRow}>
        <Text style={styles.label}>Language</Text>
        <Picker
          selectedValue={selectedLanguage}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Spanish" value="es" />
          <Picker.Item label="French" value="fr" />
          <Picker.Item label="German" value="de" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#161622", padding: 20 },
  heading: { alignSelf: "center", marginTop: 80, fontSize: 24, color: "white", fontWeight: 'bold', marginBottom: 40 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  languageRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 },
  label: { color: "white", fontSize: 16 },
  picker: { height: 40, flex: 1, color: "white", backgroundColor: "#282828" },
});

export default SettingsScreen;
