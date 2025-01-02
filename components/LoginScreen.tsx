import { setUserDetails } from '@/redux/userDetailsSlice';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Image
} from 'react-native';
import { useDispatch } from 'react-redux'; // Assuming you're using Redux


export const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch(); // Redux hook to dispatch actions

  const handleLogin = async (): Promise<void> => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch(
        "https://b8f2-111-92-110-205.ngrok-free.app/user/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Mapping the response to match your structure
        const userData = {
          email: data?.user?.email,
          id: data?.user?._id,
          rationCard: data?.user?.rationCard,
          members: data?.user.familyMembers.map((m: Member) => `${m.name} (${m.age})`),
          devices: data?.user.devices.map(
            (d: Device) => `${d.device} (${d.quantity})`
          ),
          averageWater: data?.usageAverage?.water,
          averageElectricity: data?.usageAverage?.electricity,
        };

        // Dispatching to Redux (storing in global state)
        dispatch(setUserDetails(userData));

        // Navigate to Dashboard
        navigation.navigate("Dashboard");
      } else {
        Alert.alert("Error", "Invalid email or password.");
      }
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message || 'Network request failed.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={require('../assets/images/eco-logo.png')}
          style={{ width: 48, height: 48 }}
        />
        <Text style={styles.topText}>Get Started</Text>
      </View>

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

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={styles.registerContainer}
      >
        <Text style={styles.registerText}>
          Don’t have an account yet?{' '}
          <Text style={styles.signUpText}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
  title: {
    fontSize: 20,
    fontWeight: '500', // Corrected to medium equivalent
    marginBottom: 20,
    marginTop: 70,
    alignSelf: 'flex-start',
    color: '#373A40',
    paddingLeft: 50,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#5780FA',
    height: 60,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  registerContainer: {
    marginTop: 15,
  },
  registerText: {
    color: '#000000',
    fontSize: 16,
  },
  signUpText: {
    color: '#5780FA', // Custom color for "Sign up"
    fontWeight: 'bold',
  },
  topContainer: {
    marginTop: 116,
    alignItems: 'center',
    marginBottom: 20,
  },
  topText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
  },
});

export default LoginScreen;
