import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        {
          backgroundColor: "#FF9C01", 
          borderRadius: 15,
          minHeight: 62,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          opacity: isLoading ? 0.5 : 1,
        },
        containerStyles,
      ]}
      disabled={isLoading}
    >
      <Text
        style={[
          {
            color: "#FFFFFF", // Example primary color
            fontWeight: "600", // Semi-bold equivalent
            fontSize: 18,
          },
          textStyles,
        ]}
      >
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#FFFFFF"
          size="small"
          style={{ marginLeft: 8 }}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
