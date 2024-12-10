import React from 'react';
import { Slot, Stack } from 'expo-router'; // This is where sub-routes are rendered

const ItemsLayout = () => {
  return (
    <Stack>
      
     <Stack.Screen name='author' options={{
      headerShown: false
     }}/>
    
     <Stack.Screen name='edit-profile' options={{
      headerShown: false
     }}/>
     <Stack.Screen name='fav' options={{
      headerShown: false
     }}/>
     <Stack.Screen name='settings' options={{
      headerShown: false
     }}/>
    </Stack>
  );
};

export default ItemsLayout;
