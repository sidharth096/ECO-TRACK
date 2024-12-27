import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

const DashboardScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Analysis</Text>
      </View>

      {/* Electricity Section */}
      <View style={styles.card_current}>
        <View style={styles.imageButonContainer}>
          <View style={styles.iconContainer}>
            <Image
              source={require("../assets/images/eco-electric.png")}
              style={styles.electicIcon}
            />
          </View>
          <TouchableOpacity style={styles.btnDetails} onPress={() => {}}>
            <Text style={styles.btnText}>Details</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageButonContainer}>
          <Text style={styles.current_value}>
            4153 <Text style={styles.current_value_kwhText}>KWh</Text>
          </Text>
          <Image
            source={require("../assets/images/eco-current_post.png")}
            style={styles.posticon}
          />
        </View>
      </View>

      {/* Water Section */}
      <View style={styles.card_water}>
        <View style={styles.imageButonContainer}>
          <View style={styles.iconContainer}>
            <Image
              source={require("../assets/images/eco-water.png")}
              style={styles.waterIcon}
            />
          </View>
          <TouchableOpacity style={styles.btnDetails} onPress={() => {}}>
            <Text style={styles.btnText}>Details</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageButonContainer}>
          <Text style={styles.water_value}>
            5230 <Text style={styles.water_value_LiterText}>Liter</Text>
          </Text>
          <Image
              source={require("../assets/images/eco-water_drop.png")}
              style={styles.waterDopIcon}
            />
        </View>
      </View>

      {/* History Section */}
      <View style={styles.historyCard}>
        <Text style={styles.historyTitle}>History</Text>
        <View style={styles.chartContainer}>
          {/* Add your chart component here */}
        </View>
        <Text style={styles.historyInfo}>$1250</Text>
        <Text style={styles.status}>Excellent</Text>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.btnDetails} onPress={() => {}}>
          <Text style={styles.btnText}>Water</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnDetails} onPress={() => {}}>
          <Text style={styles.btnText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnDetails} onPress={() => {}}>
          <Text style={styles.btnText}>Electricity</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F9",
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  header: {
    padding: 20,
    borderRadius: 10,
    textAlign: "left",
  },
  headerText: {
    fontSize: 25,
    fontFamily: "Nunito Sans",
    color: "#000000",
    textAlign: "left",
  },
  card_water: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    margin: 10,
    height: 220,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  card_current: {
    backgroundColor: "#2880E4",
    borderRadius: 15,
    padding: 20,
    height: 220,
    margin: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderColor: "#000000",
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  electicIcon: {
    width: 15,
    height: 24,
  },
  waterIcon: {
    width: 14,
    height: 22,
  },
  posticon: {
    width: 130,
    height: 125,
  },
  waterDopIcon: {
    width: 112,
    paddingTop: 99,
    height: 84,
  },
  current_value: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  current_value_kwhText: {
    fontSize: 15,
    color: "#FFFFFF",
  },
  water_value: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  water_value_LiterText: {
    fontSize: 15,
    color: "#4A90E2",
  },
  current_subText: {
    fontSize: 14,
    color: "#FFFFFF",
    marginVertical: 5,
  },
  water_subText: {
    fontSize: 14,
    color: "#A1A1A1",
    marginVertical: 5,
  },
  historyCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chartContainer: {
    height: 100,
    backgroundColor: "#E3E4E8",
    borderRadius: 10,
    marginBottom: 10,
  },
  historyInfo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  status: {
    fontSize: 16,
    color: "#2CDA77",
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#4A90E2",
    paddingVertical: 10,
  },
  imageButonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  btnDetails: {
    backgroundColor: "#071E62",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default DashboardScreen;
