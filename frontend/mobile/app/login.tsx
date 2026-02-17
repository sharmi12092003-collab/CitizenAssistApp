import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "citizen">("citizen");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Enter all fields");
      return;
    }

    try {
      const response = await fetch("http://192.168.0.8:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 🔥 Role check here
        if (data.role !== role) {
          Alert.alert("Error", "Selected role is incorrect");
          return;
        }

        if (data.role === "admin") {
          router.replace("/admin-dashboard");
        } else {
          router.replace("/citizen-dashboard");
        }
      } else {
        Alert.alert("Login Failed", data.message);
      }
    } catch (error) {
      Alert.alert("Error", "Network error");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* 🔥 Role Selection */}
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            role === "citizen" && styles.activeRole,
          ]}
          onPress={() => setRole("citizen")}
        >
          <Text style={styles.roleText}>Citizen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleButton,
            role === "admin" && styles.activeRole,
          ]}
          onPress={() => setRole("admin")}
        >
          <Text style={styles.roleText}>Admin</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.link}>New Citizen? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, textAlign: "center", marginBottom: 30 },
  input: {
    backgroundColor: "#eee",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  roleButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    backgroundColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
  },
  activeRole: {
    backgroundColor: "#007bff",
  },
  roleText: {
    color: "#fff",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  link: { marginTop: 20, textAlign: "center", color: "blue" },
});
