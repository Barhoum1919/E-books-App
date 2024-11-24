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
      <Text style={styles.title}><View className="relative mt-5">
            <Text style={styles.Description} className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text style={styles.name}>E-Books App </Text>
            </Text>
</View></Text>
      
      <CustomButton title={'Lets Get Started '} handlePress={()=> {router.push('/(auth)/sign-up')}}  textStyles={undefined} isLoading={undefined}></CustomButton>
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
    fontSize: 24,
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
    marginBottom:100
  },
  img:{
    
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      
     
  }
});
