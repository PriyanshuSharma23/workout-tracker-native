import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  useColorScheme,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import GoogleButton from "@/components/GoogleButton";

export default function SignUpScreen() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme() ?? "dark";
  const colors = Colors[colorScheme ?? "dark"];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.replace("/");
    }, 1500);
  };

  const theme = Colors[colorScheme];

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.background,
        flex: 1,
      }}
    >
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: colors.background }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={[styles.title, { color: colors.text }]}>
                Create Account
              </Text>
              <Text style={[styles.subtitle, { color: colors.icon }]}>
                Start your fitness journey today
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Full Name
                </Text>
                <View
                  style={[
                    styles.inputWrapper,
                    { backgroundColor: colors.cardBackground },
                  ]}
                >
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={colors.icon}
                  />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Enter your full name"
                    placeholderTextColor={colors.icon}
                    value={formData.name}
                    onChangeText={(value) => handleInputChange("name", value)}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Email
                </Text>
                <View
                  style={[
                    styles.inputWrapper,
                    { backgroundColor: colors.cardBackground },
                  ]}
                >
                  <Ionicons name="mail-outline" size={20} color={colors.icon} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Enter your email"
                    placeholderTextColor={colors.icon}
                    value={formData.email}
                    onChangeText={(value) => handleInputChange("email", value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Password
                </Text>
                <View
                  style={[
                    styles.inputWrapper,
                    { backgroundColor: colors.cardBackground },
                  ]}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={colors.icon}
                  />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Create a password"
                    placeholderTextColor={colors.icon}
                    value={formData.password}
                    onChangeText={(value) =>
                      handleInputChange("password", value)
                    }
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color={colors.icon}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: colors.text }]}>
                  Confirm Password
                </Text>
                <View
                  style={[
                    styles.inputWrapper,
                    { backgroundColor: colors.cardBackground },
                  ]}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={colors.icon}
                  />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Confirm your password"
                    placeholderTextColor={colors.icon}
                    value={formData.confirmPassword}
                    onChangeText={(value) =>
                      handleInputChange("confirmPassword", value)
                    }
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={
                        showConfirmPassword ? "eye-outline" : "eye-off-outline"
                      }
                      size={20}
                      color={colors.icon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Sign Up Button */}
            <View style={{ gap: 4, marginBottom: 24 }}>
              <TouchableOpacity
                style={[styles.signInButton, { backgroundColor: colors.tint }]}
                onPress={handleSignUp}
                disabled={loading}
              >
                {loading ? (
                  <Text
                    style={[styles.buttonText, { color: colors.background }]}
                  >
                    Creating Account...
                  </Text>
                ) : (
                  <Text
                    style={[styles.buttonText, { color: colors.background }]}
                  >
                    Create Account
                  </Text>
                )}
              </TouchableOpacity>
              <GoogleButton onPress={() => console.log("Google Sign Up")} />
            </View>

            {/* Sign In Link */}
            <View style={styles.signUpContainer}>
              <Text style={[styles.signUpText, { color: colors.icon }]}>
                Already have an account?{" "}
              </Text>
              <Link href="/(auth)/sign-in" asChild>
                <TouchableOpacity>
                  <Text style={[styles.signUpLink, { color: colors.tint }]}>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  form: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  eyeIcon: {
    padding: 4,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "500",
  },
  signInButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    fontSize: 14,
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: "600",
  },
});
