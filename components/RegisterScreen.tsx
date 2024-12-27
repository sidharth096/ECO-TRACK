import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Member {
  name: string;
  age: string;
}

interface Device {
  type: string;
  quantity: string;
  watts: string;
}

const RegisterScreen: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([{ name: '', age: '' }]);
  const [devices, setDevices] = useState<Device[]>([{ type: '', quantity: '', watts: '' }]);

  const addMember = () => {
    setMembers([...members, { name: '', age: '' }]);
  };

  const removeMember = (index: number) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };

  const addDevice = () => {
    setDevices([...devices, { type: '', quantity: '', watts: '' }]);
  };

  const removeDevice = (index: number) => {
    const updatedDevices = devices.filter((_, i) => i !== index);
    setDevices(updatedDevices);
  };

  const handleRegister = () => {
    if (
      members.some((member) => !member.name || !member.age) ||
      devices.some((device) => !device.type || !device.quantity || !device.watts)
    ) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    Alert.alert('Success', 'Home registered successfully!');
    console.log({ members, devices }); // Replace with your API integration
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Register Your Home</Text>

      {/* Members Section */}
      <Text style={styles.sectionTitle}>Home Members</Text>
      {members.map((member, index) => (
        <View key={index} style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={`Member ${index + 1} Name`}
            value={member.name}
            onChangeText={(text) => {
              const updatedMembers = [...members];
              updatedMembers[index].name = text;
              setMembers(updatedMembers);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder={`Member ${index + 1} Age`}
            keyboardType="numeric"
            value={member.age}
            onChangeText={(text) => {
              const updatedMembers = [...members];
              updatedMembers[index].age = text;
              setMembers(updatedMembers);
            }}
          />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeMember(index)}
          >
            <Text style={styles.removeButtonText}>Remove Member</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addMember}>
        <Text style={styles.addButtonText}>+ Add Member</Text>
      </TouchableOpacity>

      {/* Devices Section */}
      <Text style={styles.sectionTitle}>Devices</Text>
      {devices.map((device, index) => (
        <View key={index} style={styles.card}>
          <Picker
            selectedValue={device.type}
            style={styles.picker}
            onValueChange={(itemValue) => {
              const updatedDevices = [...devices];
              updatedDevices[index].type = itemValue;
              setDevices(updatedDevices);
            }}
          >
            <Picker.Item label="Select Device" value="" />
            <Picker.Item label="TV" value="TV" />
            <Picker.Item label="Fridge" value="Fridge" />
            <Picker.Item label="Fan" value="Fan" />
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            keyboardType="numeric"
            value={device.quantity}
            onChangeText={(text) => {
              const updatedDevices = [...devices];
              updatedDevices[index].quantity = text;
              setDevices(updatedDevices);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Watts"
            keyboardType="numeric"
            value={device.watts}
            onChangeText={(text) => {
              const updatedDevices = [...devices];
              updatedDevices[index].watts = text;
              setDevices(updatedDevices);
            }}
          />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeDevice(index)}
          >
            <Text style={styles.removeButtonText}>Remove Device</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addDevice}>
        <Text style={styles.addButtonText}>+ Add Device</Text>
      </TouchableOpacity>

      {/* Register Button */}
      <View style={styles.registerButtonContainer}>
        <Button title="Register Home" onPress={handleRegister} color="#DC5F00" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#373A40',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#373A40',
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    borderColor: '#686D76',
    borderWidth: 1,
    marginBottom: 15,
  },
  input: {
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
    borderColor: '#686D76',
    borderWidth: 1,
  },
  picker: {
    height: 50,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#DC5F00',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: '#686D76',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  registerButtonContainer: {
    marginTop: 20,
  },
});

export default RegisterScreen;
