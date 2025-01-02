import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Header from "./ui/Header";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { saveUserToStorage, setUserDetails } from "@/redux/userDetailsSlice";

interface Member {
  name: string;
  age: string;
}

interface Device {
  device: string;
  quantity: string;
  watts: string;
}

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [familyMembers, setFamilyMembers] = useState<Member[]>([{ name: "", age: "" }]);
  const [devices, setDevices] = useState<Device[]>([
    { device: "", quantity: "", watts: "" },
  ]);
  const [rationCard, setRationCard] = useState<string>("APL"); // Default to APL
  const [availableDevices, setAvailableDevices] = useState<string[]>([]);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch(
          "https://b8f2-111-92-110-205.ngrok-free.app/user/fetchAllDevices"
        );
        const data = await response.json();
        if (response.ok) {
          setAvailableDevices(data.devices);
        } else {
          Alert.alert("Error", "Failed to fetch devices");
        }
      } catch (error: any) {
        console.error("Fetch devices error:", error);
        Alert.alert("Error", error.message || "Network request failed.");
      }
    };

    fetchDevices();
  }, []);

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in email and password.");
      return;
    }

    if (
      familyMembers.some((member) => !member.name || !member.age) ||
      devices.some(
        (device) => !device.device || !device.quantity || !device.watts
      )
    ) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    const payload = {
      email,
      password,
      familyMembers,
      devices,
      rationCard, // Include APL/BPL selection
    };

    try {
      const response = await fetch(
        "https://b8f2-111-92-110-205.ngrok-free.app/user/register",
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
      console.log("========================",data);
  
      if (response.ok) {
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

        dispatch(setUserDetails(userData));
        dispatch(saveUserToStorage(userData));

        Alert.alert("Success", data?.message || "Registration successful!");
        navigation.navigate("Dashboard");
      } else {
        Alert.alert("Error", data?.message || "Registration failed.");
      }
    } catch (error: any) {
      console.error("Fetch error:", error);
      Alert.alert("Error", error.message || "Network request failed.");
    }
  };

  const addMember = () => {
    setFamilyMembers([...familyMembers, { name: "", age: "" }]);
  };

  const removeMember = (index: number) => {
    const updatedMembers = familyMembers.filter((_, i) => i !== index);
    setFamilyMembers(updatedMembers);
  };

  const addDevice = () => {
    setDevices([...devices, { device: "", quantity: "", watts: "" }]);
  };

  const removeDevice = (index: number) => {
    const updatedDevices = devices.filter((_, i) => i !== index);
    setDevices(updatedDevices);
  };

  return (
    <ScrollView style={styles.container}>
      <Header />
      <Text style={styles.title}>Register Your Home</Text>

      {/* Email and Password Section */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* APL/BPL Selection */}
      <Text style={styles.sectionTitle}>Ration Card Type</Text>
      <Picker
        selectedValue={rationCard}
        style={styles.picker}
        onValueChange={(itemValue) => setRationCard(itemValue)}
      >
        <Picker.Item label="APL (Above Poverty Line)" value="APL" />
        <Picker.Item label="BPL (Below Poverty Line)" value="BPL" />
      </Picker>

      {/* Members Section */}
      <Text style={styles.sectionTitle}>Home Members</Text>
      {familyMembers.map((member, index) => (
        <View key={index} style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={`Member ${index + 1} Name`}
            value={member.name}
            onChangeText={(text) => {
              const updatedMembers = [...familyMembers];
              updatedMembers[index].name = text;
              setFamilyMembers(updatedMembers);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder={`Member ${index + 1} Age`}
            keyboardType="numeric"
            value={member.age}
            onChangeText={(text) => {
              const updatedMembers = [...familyMembers];
              updatedMembers[index].age = text;
              setFamilyMembers(updatedMembers);
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
            selectedValue={device.device}
            style={styles.picker}
            onValueChange={(itemValue) => {
              const updatedDevices = [...devices];
              updatedDevices[index].device = itemValue;
              setDevices(updatedDevices);
            }}
          >
            <Picker.Item label="Select Device" value="" />
            {availableDevices.map((device, i) => (
              <Picker.Item key={i} label={device.name} value={device._id} />
            ))}
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

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBF3FA",
    padding: 24,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 20,
    textAlign: "left",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600", // Changed from 'medium' to '600' for better emphasis
    color: "#373A40",
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
    borderColor: "#686D76",
    marginBottom: 15,
    shadowColor: "#000", // Added shadow for a subtle card effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15, // Increased padding for better text visibility
    marginBottom: 10,
    fontSize: 16,
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  picker: {
    height: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    borderRadius: 10, // Added border radius for better consistency
  },
  addButton: {
    backgroundColor: "#5780FA",
    paddingVertical: 12, // Changed to 'paddingVertical' for consistency
    borderRadius: 10,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  removeButton: {
    padding: 10, // Adjusted padding to align with the input fields
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#5780FA",
    alignItems: "center",
    marginTop: 5,
    height: 48,
    justifyContent: "center",
  },
  removeButtonText: {
    color: "#5780FA",
    fontWeight: "bold",
    fontSize: 16,
  },
  submitButton: {
    marginTop: 30,
    marginBottom: 50,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#5780FA",
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#5780FA",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default RegisterScreen;
