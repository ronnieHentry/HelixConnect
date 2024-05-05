import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import PaymentForm from "./src/components/PaymentForm/PaymentForm";

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <PaymentForm />
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
