import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "./components/CustomButtons";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Corrected the source path for the Image */}
      <ScrollView contentContainerStyle={{
        height:'100%'
      }}>
        <View style={styles.img}>
      <Image 
        source={require("../assets/images/book_icon.png")} 
        style={styles.logo} 
        
      />
      </View>
      <Text style={styles.title}><View >
            <Text style={styles.Description} >
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text style={styles.name}>E-Books App </Text>
            </Text>
</View></Text>
      
      <CustomButton title={"Let's Get Started "} handlePress={()=> {router.push('/(auth)/sign-up')}}  textStyles={undefined} isLoading={undefined}></CustomButton>
      </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161622",
  },
  logo: {
    
    width: 150, 
    height: 150,
    marginBottom: 50,
    marginTop:150,
    justifyContent:'center',
    alignItems: "center",
   

   
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#8C4540",
    alignItems: "center",
  },
  link: {
    fontSize: 18,
    color: "#8C4540",
    textDecorationLine: "none",
    marginLeft:30
  },
  name:{
    color:"#FF9C01",
  },
  Description:{
    color:'white',
    marginBottom:100,
    fontSize:25
  },
  img:{
    
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      
     
  }
});
