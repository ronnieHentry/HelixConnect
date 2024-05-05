import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button, RadioButton } from "react-native-paper";
import { MONTHS, getYears } from "../../../utils/constants";
import Dropdown from "../Dropdown";

const PaymentForm = () => {
  const [admissionNo, setAdmissionNo] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(getYears()[1]);
  const [planType, setPlanType] = useState("standard");
  const [amount, setAmount] = useState("");

  const handleMonthChange = (selectedItem, index) => {
    setSelectedMonth(selectedItem.value);
  };

  const handleYearChange = (selectedItem, index) => {
    setSelectedYear(selectedItem.value);
  };

  const handleSubmit = () => {
    // Handle form submission (e.g., send acknowledgment)
    console.log("Form submitted");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="Admission Number"
        value={admissionNo}
        onChangeText={setAdmissionNo}
      />
      <View style={styles.radioContainer}>
        <RadioButton.Group
          onValueChange={(newValue) => setPlanType(newValue)}
          value={planType}
        >
          <View style={styles.radioButton}>
            <RadioButton.Item
              label="Standard"
              value="standard"
              color="#3f51b5"
              labelStyle={styles.radioLabel}
            />
          </View>
          <View style={styles.radioButton}>
            <RadioButton.Item
              label="Cardio"
              value="cardio"
              color="#3f51b5"
              labelStyle={styles.radioLabel}
            />
          </View>
        </RadioButton.Group>
      </View>
      <Dropdown
        items={MONTHS}
        selectedValue={selectedMonth}
        onValueChange={handleMonthChange}
        placeholder={{ label: "Select Month", value: null }}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
      />
      <Dropdown
        items={getYears()}
        selectedValue={selectedYear}
        onValueChange={handleYearChange}
        placeholder={{ label: "Select Year", value: null }}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
      />
      <TextInput
        style={styles.input}
        label="Amount Paid"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Button
        style={styles.button}
        mode="contained"
        onPress={handleSubmit}
        labelStyle={styles.buttonLabel}
      >
        Send Acknowledgment
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginBottom: 15,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  radioButton: {
    marginRight: 20,
  },
  radioLabel: {
    fontSize: 16,
  },
  dropdown: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    marginTop: 20,
  },
  buttonLabel: {
    fontSize: 16,
  },
});

export default PaymentForm;
