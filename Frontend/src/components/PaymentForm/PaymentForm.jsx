import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button, RadioButton } from "react-native-paper";
import { MONTHS, getYears } from "../../../utils/constants";
import Dropdown from "../Dropdown/Dropdown";
import Notification from "../Notification/Notification";

const PaymentForm = () => {
  const [admissionNo, setAdmissionNo] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(getYears()[1]);
  const [planType, setPlanType] = useState("standard");
  const [amount, setAmount] = useState("");
  const [invalidFields, setInvalidFields] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleMonthChange = (selectedItem) => {
    setSelectedMonth(selectedItem);
  };

  const handleYearChange = (selectedItem) => {
    setSelectedYear(selectedItem);
  };

  const handleSubmit = () => {
    if (
      !admissionNo ||
      !selectedMonth ||
      !selectedYear ||
      !planType ||
      !amount
    ) {
      setInvalidFields(true);
      setNotificationMessage("Please enter all details");
      setShowNotification(true);
    } else {
      setInvalidFields(false);
      setNotificationMessage("Acknowledgement sent successfully!");
      setShowNotification(true);
      console.log(admissionNo, selectedMonth, selectedYear, planType, amount);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="Admission Number"
        value={admissionNo}
        onChangeText={setAdmissionNo}
        keyboardType="numeric"
      />
      <View>
        <RadioButton.Group
          onValueChange={(newValue) => setPlanType(newValue)}
          value={planType}
          style={styles.radioContainer}
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
      {showNotification && (
        <Notification
          type={invalidFields ? "error" : "success"}
          message={notificationMessage}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "90%",
    width: "90%",
    padding: 10,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginBottom: 15,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
