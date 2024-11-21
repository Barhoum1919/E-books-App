import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen name="home" options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={24} />
                ),
                headerShown:false
        }} />
        {/* Categories Tab */}
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="apps" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />

      {/* Saved Tab */}
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bookmark" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
{/* Profile Tab */}
<Tabs.Screen
  name="profile"
  options={{
    title: 'Profile',
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="account" color={color} size={size} />
    ),
    headerShown: false
  }}
/>
        

      </Tabs>
    </>
  )
}

export default TabsLayout