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
  SafeAreaView,
} from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import GoogleButton from "@/components/GoogleButton";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme() ?? "dark";
  const colors = Colors[colorScheme ?? "dark"];

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
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
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>
              Welcome back
            </Text>
            <Text style={[styles.subtitle, { color: colors.icon }]}>
              Sign in to continue your fitness journey
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>Email</Text>
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
                  value={email}
                  onChangeText={setEmail}
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
                  placeholder="Enter your password"
                  placeholderTextColor={colors.icon}
                  value={password}
                  onChangeText={setPassword}
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

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={[styles.forgotPasswordText, { color: colors.tint }]}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <View style={{ gap: 4, marginBottom: 24 }}>
            <TouchableOpacity
              style={[styles.signInButton, { backgroundColor: colors.tint }]}
              onPress={handleSignIn}
              disabled={loading}
            >
              {loading ? (
                <Text style={[styles.buttonText, { color: colors.background }]}>
                  Signing in...
                </Text>
              ) : (
                <Text style={[styles.buttonText, { color: colors.background }]}>
                  Sign In
                </Text>
              )}
            </TouchableOpacity>

            <GoogleButton onPress={() => console.log("Google Sign In")} />
          </View>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={[styles.signUpText, { color: colors.icon }]}>
              Don't have an account?{" "}
            </Text>
            <Link href="/(auth)/sign-up" asChild>
              <TouchableOpacity>
                <Text style={[styles.signUpLink, { color: colors.tint }]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
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
