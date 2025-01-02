import { clearUserFromStorage } from "@/redux/userDetailsSlice";
import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";


const Header = () => {
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const toggleLogoutMenu = () => {
    setIsLogoutVisible(!isLogoutVisible);
  };

  const handleLogout = () => {
    dispatch(clearUserFromStorage());
    navigation.navigate("Login");
    console.log("User logged out");
    setIsLogoutVisible(false);
  };

  return (
    <View style={styles.header}>
      {/* Header */}

      <View style={styles.firstHeader} >
        <Image
          source={require("../../assets/images/eco-logo.png")}
          style={{ width: 48, height: 48 }}
        />
      </View>

      <View style={styles.secondHeader}>
        <Image
          source={require("../../assets/images/eco-notification.png")}
          style={{ width: 22, height: 24 }}
        />
        <TouchableOpacity onPress={toggleLogoutMenu}>
          <Image
            source={require("../../assets/images/eco-profile.png")}
            style={{ width: 36, height: 36 }}
          />
        </TouchableOpacity>
      </View>

      {/* Logout Menu */}
      <Modal
        transparent={true}
        visible={isLogoutVisible}
        animationType="fade"
        onRequestClose={() => setIsLogoutVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.logoutMenu}>
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutButton}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsLogoutVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    padding: 3,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  secondHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutMenu: {
    width: 200,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButton: {
    padding: 10,
    width: "100%",
    backgroundColor: "#2880E4",
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  logoutText: {
    color: "white",
    fontSize: 18,
  },
  cancelButton: {
    padding: 10,
    width: "100%",
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignItems: "center",
  },
  cancelText: {
    color: "#333",
    fontSize: 18,
  },
});

export default Header;
