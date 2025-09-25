import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
} from "react-native";

const { width: SCREEN_W } = Dimensions.get("window");

// array de imagens locais usando require
const imagensLocais = [
  require("./assets/0ec9843a19b31744e17cc1dd126161f6.jpg"),
  require("./assets/9fee55fe5559da752bd2851103b9f69b.jpg"),
  require("./assets/9068d39a1cc4173c33a69bd11a127fab.jpg"),
  require("./assets/9485d9554f2855826607af56a09a401c.jpg"),
  require("./assets/68627c938156308f5b57718e8b9d4e67.jpg"),
  require("./assets/c1c6ceaeb4845f7ae695f066a29730df.jpg"),
  require("./assets/d5a6383682ea996b48e8c82fbc0cddb1.jpg"),
  require("./assets/fa8e28964c40bb0d9b7e8ccf6a07a4b6.jpg"),

  // adicione quantas quiser
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [borderColor, setBorderColor] = useState("transparent");

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const trocarImagem = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      const next = (index + 1) % imagensLocais.length;
      setIndex(next);
      setBorderColor("transparent");
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handlePress = (gostei) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setBorderColor(gostei ? "#4CAF50" : "#E57373");

    setTimeout(() => {
      trocarImagem();
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.imageWrapper,
          {
            borderColor,
            transform: [{ scale: scaleAnim }],
            opacity: fadeAnim,
          },
        ]}
      >
        <Image
          source={imagensLocais[index]}
          style={styles.image}
        />
      </Animated.View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#FFAB91" }]}
          onPress={() => handlePress(true)}
        >
          <Text style={styles.btnText}>Gostei</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#FF8A65" }]}
          onPress={() => handlePress(false)}
        >
          <Text style={styles.btnText}>Não Gostei</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF3E0",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  imageWrapper: {
    width: SCREEN_W * 0.8,
    height: SCREEN_W * 0.8,
    borderWidth: 6,
    borderRadius: 20,
    overflow: "hidden",
    borderColor: "transparent",
    backgroundColor: "#FFF8E1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  btnText: {
    color: "#4E342E",
    fontSize: 18,
    fontWeight: "bold",
  },
});
