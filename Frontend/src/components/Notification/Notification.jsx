import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Notification = ({ type, message }) => {
  const messageStyles = type === 'error' ? styles.errorText : styles.successText;

  return (
    <View style={styles.container}>
      <Text style={messageStyles}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: 'stretch',
  },
  errorText: {
    color: '#ff0000', // Red text color for error messages
    backgroundColor: '#ffcccc', // Light red background color for error messages
    fontSize: 16,
    textAlign: 'center',
  },
  successText: {
    color: '#008000', // Green text color for success messages
    backgroundColor: '#ccffcc', // Light green background color for success messages
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Notification;
