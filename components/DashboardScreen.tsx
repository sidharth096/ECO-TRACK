import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "./ui/Header";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Make sure to import your RootState type

const DashboardScreen: React.FC = () => {
  // Get values from Redux state
  const { averageWater, averageElectricity } = useSelector(
    (state: RootState) => state.user
  );
  console.log("averageWater", averageWater, "averageElectricity", averageElectricity);
  

  return (
    <LinearGradient colors={["#ffffff", "#ffffff"]} style={styles.container}>
      {/* <ScrollView contentContainerStyle={styles.scrollContent}> */}
        {/*Header */}
        <Header />

        <View style={styles.headerTextContainer}>
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

          
            {/* <TouchableOpacity style={styles.btnDetails} onPress={() => {}}>
              <Text style={styles.btnText}>Details</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.imageButonContainer}>
            <Text style={styles.current_value}>
              {averageElectricity || 0}{" "}
              <Text style={styles.current_value_kwhText}>KWh</Text>
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
            {/* <TouchableOpacity style={styles.btnDetails} onPress={() => {}}>
              <Text style={styles.btnText}>Details</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.imageButonContainer}>
            <Text style={styles.water_value}>
              {averageWater || 0}{" "}
              <Text style={styles.water_value_LiterText}>Liter</Text>
            </Text>
            <Image
              source={require("../assets/images/eco-water_drop.png")}
              style={styles.waterDopIcon}
            />
          </View>
        </View>

        {/* Promotion Section */}
        <View style={styles.card_promotion}>
          <View style={styles.promotionContainer}>
            <Text style={styles.promotion_Text_Heading}>
              Ready to Monitor Your Home's Efficiency?
            </Text>
            <Text style={styles.promotion_Text}>
              Install Ecotrack IoT Devices and Unlock Real-Time Insights into
              Your Water and Electricity Usage!
            </Text>
          </View>
          <View style={styles.centerAligned}>
            <TouchableOpacity
              style={styles.booknow_btn_container}
              onPress={() => {}}
            >
              <Text style={styles.btnText}>Book Now  ></Text>
            </TouchableOpacity>
          </View>
        </View>
      {/* </ScrollView> */}

      {/* Bottom Navigation */}
      {/* <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={require("../assets/images/eco-water.png")}
            style={styles.waterIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.btnText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={require("../assets/images/eco-electric.png")}
            style={styles.electicIcon}
          />
        </TouchableOpacity>
      </View> */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24, 
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 100, // Space for bottom navigation
  },
  headerTextContainer: {
    textAlign: "left",
    marginTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Nunito Sans",
    color: "#000000",
  },
  card_water: {
    backgroundColor: "#E2ECFF",
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    height: 202,
  },
  card_current: {
    backgroundColor: "#E2ECFF",
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    height: 202,
  },
  card_promotion: {
    backgroundColor: "#2880E4",
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    height: 195,
  },
  iconContainer: {
    width: 60,
    height: 60,
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
    width: 120,
    height: 112,
  },
  waterDopIcon: {
    width: 112,
    height: 84,
  },
  current_value: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#071E62",
  },
  current_value_kwhText: {
    fontSize: 15,
    color: "#071E62 ",
    fontWeight:"medium"
  },
  water_value: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#071E62",
  },
  water_value_LiterText: {
    fontSize: 15,
    color: "#071E62",
    fontWeight:"medium"
  },
  promotion_Text_Heading: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  promotion_Text: {
    fontSize: 12,
    color: "#FFFFFF",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
  },
  imageButonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  promotionContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    gap: 10,
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
    fontSize: 13,
    fontWeight: "bold",
  },
  booknow_btn_container: {
    backgroundColor: "#071E62",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  centerAligned: {
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: 'flex-end',
  },
});

export default DashboardScreen;
