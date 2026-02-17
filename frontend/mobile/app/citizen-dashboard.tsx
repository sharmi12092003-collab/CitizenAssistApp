import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function CitizenDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Citizen Dashboard</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.welcome}>Welcome, Citizen 👋</Text>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>View Complaints</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>Submit Complaint</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f8" },

  header: {
    backgroundColor: "#007bff",
    padding: 20,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  content: {
    flex: 1,
    padding: 20,
  },
  welcome: {
    fontSize: 18,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
  },

  logoutBtn: {
    backgroundColor: "red",
    padding: 15,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
