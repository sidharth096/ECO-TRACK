import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>(''); // Explicit type declaration
  const [password, setPassword] = useState<string>('');

  const handleLogin = (): void => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please enter both email and password.');
    } else {
      Alert.alert('Success', `Welcome, ${email}!`);
      // Add navigation or API calls here
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} color="#DC5F00" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#373A40',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderColor: '#686D76',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonContainer: {
    width: '80%',
    marginTop: 10,
  },
});
