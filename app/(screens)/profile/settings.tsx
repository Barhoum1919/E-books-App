import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const SettingsScreen = () => {
  const [isNotificationsEnabled, setNotificationsEnabled] = useState(false);

  const toggleNotifications = () => setNotificationsEnabled(!isNotificationsEnabled);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <View style={styles.settingRow}>
        <Text style={styles.label}>Enable Notifications</Text>
        <Switch value={isNotificationsEnabled} onValueChange={toggleNotifications} />
      </View>
      <View style={styles.settingRow}>
        <Text style={styles.label}>Light Mode</Text>
        <Switch value={false} onValueChange={() => alert('Light Mode is not Preferred')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1,backgroundColor: "#161622", padding: 20 },
  heading: {alignSelf: "center", marginTop:80,fontSize: 24, color:"white",fontWeight: 'bold', marginBottom: 40 },
  settingRow: { color:"white",flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  label: {color:"white", fontSize: 16 },
});

export default SettingsScreen;
