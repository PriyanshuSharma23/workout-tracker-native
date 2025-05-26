import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  ScrollView,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Months, WeekDays } from "@/constants/WeekDays";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Exercise } from "@/types/workout";
import { ThemedText } from "@/components/ThemedText";

const WorkoutForm = () => {
  const colorScheme = useColorScheme() ?? "dark";
  const theme = Colors[colorScheme];

  const oppositeColorScheme = colorScheme === "dark" ? "light" : "dark";
  const oppositeTheme = Colors[oppositeColorScheme];

  const router = useRouter();

  const { date } = useLocalSearchParams();
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const addExercise = () => {
    setExercises((prev) => [
      ...prev,
      { name: "", sets: [[{ reps: 0, weight: 0 }]] },
    ]);
  };

  const deleteExercise = (exIdx: number) => {
    Alert.alert(
      "Delete Exercise",
      "Are you sure you want to delete this exercise?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const newExercises = exercises.filter(
              (_, index) => index !== exIdx,
            );
            setExercises(newExercises);
          },
        },
      ],
    );
  };

  const updateExercise = (index: number, field: string, value: any) => {
    const newExercises = [...exercises];
    (newExercises[index] as any)[field] = value;
    setExercises(newExercises);
  };

  const addSet = (exIdx: number) => {
    const newExercises = [...exercises];
    newExercises[exIdx].sets.push([{ reps: 0, weight: 0 }]);
    setExercises(newExercises);
  };

  const deleteSet = (exIdx: number, dropIdx: number) => {
    const newExercises = [...exercises];
    newExercises[exIdx].sets = newExercises[exIdx].sets.filter(
      (_, index) => index !== dropIdx,
    );
    setExercises(newExercises);
  };

  const duplicateSet = (exIdx: number, dropIdx: number) => {
    const newExercises = [...exercises];
    const setToDuplicate = [...newExercises[exIdx].sets[dropIdx]];
    newExercises[exIdx].sets.splice(dropIdx + 1, 0, setToDuplicate);
    setExercises(newExercises);
  };

  const addDropSet = (exIdx: number, dropIdx: number) => {
    const newExercises = [...exercises];
    newExercises[exIdx].sets[dropIdx].push({ reps: 0, weight: 0 });
    setExercises(newExercises);
  };

  const deleteDropSet = (exIdx: number, dropIdx: number, setIdx: number) => {
    const newExercises = [...exercises];
    if (newExercises[exIdx].sets[dropIdx].length > 1) {
      newExercises[exIdx].sets[dropIdx] = newExercises[exIdx].sets[
        dropIdx
      ].filter((_, index) => index !== setIdx);
      setExercises(newExercises);
    }
  };

  const updateSet = (
    exIdx: number,
    dropIdx: number,
    setIdx: number,
    field: "reps" | "weight",
    value: string,
  ) => {
    const newExercises = [...exercises];
    const set = newExercises[exIdx].sets[dropIdx][setIdx];
    set[field] = parseInt(value) || 0;
    setExercises(newExercises);
  };

  const renderIconButton = (
    icon: string,
    onPress: () => void,
    style?: any,
    textStyle?: any,
  ) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.iconButton, { borderColor: theme.border }, style]}
    >
      <Text style={[styles.iconButtonText, { color: theme.text }, textStyle]}>
        {icon}
      </Text>
    </TouchableOpacity>
  );

  const renderDeleteButton = (onPress: () => void, small = false) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        small ? styles.smallDeleteButton : styles.deleteButton,
        { backgroundColor: "#FF4444" },
      ]}
    >
      <Text
        style={[
          small ? styles.smallDeleteButtonText : styles.deleteButtonText,
          { color: "#FFFFFF" },
        ]}
      >
        ×
      </Text>
    </TouchableOpacity>
  );

  const expandedDate = () => {
    const d = new Date(date as string);
    d.setHours(0, 0, 0, 0);
    return `${d.getDate()} ${Months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const isDateBeforeToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dateObj = new Date(date as string);
    dateObj.setHours(0, 0, 0, 0);

    return today.getTime() > dateObj.getTime();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerDate, { color: theme.text }]}>
            Workout
          </Text>
          <Text style={[styles.headerTitle, { color: theme.icon }]}>
            {expandedDate()}
          </Text>

          {isDateBeforeToday() && (
            <TouchableOpacity
              style={{
                marginTop: 20,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: theme.tint,
                paddingVertical: 6,
                paddingHorizontal: 16,
                borderRadius: 12, // pill shape
                gap: 4, // space between icon and text
              }}
            >
              <MaterialIcons
                name="copy-all"
                size={20}
                color={oppositeTheme.text}
              />
              <ThemedText
                lightColor={theme.text}
                darkColor={oppositeTheme.text}
                style={{
                  fontSize: 14,
                }}
              >
                Copy to today
              </ThemedText>
            </TouchableOpacity>
          )}
        </View>

        {/* Workout Info Section */}
        <View
          style={[styles.section, { backgroundColor: theme.cardBackground }]}
        >
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Workout Details
          </Text>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>
              Workout Name
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: theme.border,
                  color: theme.text,
                  backgroundColor: theme.background,
                },
              ]}
              value={name}
              onChangeText={setName}
              placeholder="E.g., Push Day"
              placeholderTextColor={theme.icon}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>
              Body Weight (lbs)
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: theme.border,
                  color: theme.text,
                  backgroundColor: theme.background,
                },
              ]}
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              placeholder="E.g., 180"
              placeholderTextColor={theme.icon}
            />
          </View>
        </View>

        {/* Exercises Section */}
        <View style={styles.exercisesHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Exercises
          </Text>
          <TouchableOpacity
            onPress={addExercise}
            style={[styles.addExerciseButton, { backgroundColor: theme.tint }]}
          >
            <Text
              style={[
                styles.addExerciseButtonText,
                { color: colorScheme === "dark" ? "#000" : "#fff" },
              ]}
            >
              + Add Exercise
            </Text>
          </TouchableOpacity>
        </View>

        {exercises.map((exercise, exIdx) => (
          <View
            key={exIdx}
            style={[
              styles.exerciseCard,
              { backgroundColor: theme.cardBackground },
            ]}
          >
            {/* Exercise Header - More Compact */}
            <View style={styles.exerciseHeader}>
              <TextInput
                style={[
                  styles.exerciseNameInput,
                  {
                    borderColor: theme.border,
                    color: theme.text,
                    backgroundColor: theme.background,
                  },
                ]}
                value={exercise.name}
                onChangeText={(val) => updateExercise(exIdx, "name", val)}
                placeholder="Exercise Name"
                placeholderTextColor={theme.icon}
              />
              {renderDeleteButton(() => deleteExercise(exIdx))}
            </View>

            {/* Compact Sets */}
            {exercise.sets.map((dropSet, dropIdx) => (
              <View key={dropIdx} style={styles.compactSetContainer}>
                {/* Set Header with Icons */}
                <View style={styles.compactSetHeader}>
                  <Text style={[styles.compactSetLabel, { color: theme.text }]}>
                    Set {dropIdx + 1}
                    {dropSet.length > 1 && (
                      <Text style={{ color: theme.icon, fontSize: 12 }}>
                        {" "}
                        ⬇
                      </Text>
                    )}
                  </Text>
                  <View style={styles.compactSetActions}>
                    {renderIconButton("+ Drop set", () =>
                      addDropSet(exIdx, dropIdx),
                    )}
                    {renderIconButton("📋 Copy set", () =>
                      duplicateSet(exIdx, dropIdx),
                    )}
                    {exercise.sets.length > 1 &&
                      renderDeleteButton(() => deleteSet(exIdx, dropIdx), true)}
                  </View>
                </View>

                {/* Drop Set Rows */}
                {dropSet.map((set, setIdx) => (
                  <View key={setIdx} style={styles.compactDropSetRow}>
                    <View style={styles.compactSetInput}>
                      <Text
                        style={[
                          styles.compactInputLabel,
                          { color: theme.icon },
                        ]}
                      >
                        🔢
                      </Text>
                      <TextInput
                        style={[
                          styles.compactInput,
                          {
                            borderColor: theme.border,
                            color: theme.text,
                            backgroundColor: theme.background,
                          },
                        ]}
                        keyboardType="numeric"
                        placeholder="Add reps"
                        placeholderTextColor={theme.icon}
                        value={set.reps === 0 ? "" : String(set.reps)}
                        onChangeText={(val) =>
                          updateSet(exIdx, dropIdx, setIdx, "reps", val)
                        }
                      />
                    </View>

                    <Text style={[styles.separator, { color: theme.icon }]}>
                      ×
                    </Text>

                    <View style={styles.compactSetInput}>
                      <Text
                        style={[
                          styles.compactInputLabel,
                          { color: theme.icon },
                        ]}
                      >
                        🏋️
                      </Text>
                      <TextInput
                        style={[
                          styles.compactInput,
                          {
                            borderColor: theme.border,
                            color: theme.text,
                            backgroundColor: theme.background,
                          },
                        ]}
                        keyboardType="numeric"
                        placeholder="Add weight"
                        placeholderTextColor={theme.icon}
                        value={set.weight === 0 ? "" : String(set.weight)}
                        onChangeText={(val) =>
                          updateSet(exIdx, dropIdx, setIdx, "weight", val)
                        }
                      />
                    </View>

                    {dropSet.length > 1 && (
                      <TouchableOpacity
                        onPress={() => deleteDropSet(exIdx, dropIdx, setIdx)}
                        style={styles.miniDeleteButton}
                      >
                        <Text style={styles.miniDeleteButtonText}>×</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}

                {/* Compact Add Drop Set */}
                {/* <TouchableOpacity */}
                {/*   onPress={() => addDropSet(exIdx, dropIdx)} */}
                {/*   style={[ */}
                {/*     styles.compactAddDropSetButton, */}
                {/*     { borderColor: theme.border }, */}
                {/*   ]} */}
                {/* > */}
                {/*   <Text */}
                {/*     style={[ */}
                {/*       styles.compactAddDropSetText, */}
                {/*       { color: theme.icon }, */}
                {/*     ]} */}
                {/*   > */}
                {/*     + Drop */}
                {/*   </Text> */}
                {/* </TouchableOpacity> */}
              </View>
            ))}

            {/* Compact Add Set Button */}
            <TouchableOpacity
              onPress={() => addSet(exIdx)}
              style={[
                styles.compactAddSetButton,
                { backgroundColor: theme.highlight },
              ]}
            >
              <Text
                style={[
                  styles.compactAddSetButtonText,
                  { color: colorScheme === "dark" ? "#000" : "#000" },
                ]}
              >
                + Set
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        {exercises.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyStateText, { color: theme.icon }]}>
              No exercises added yet
            </Text>
            <Text style={[styles.emptyStateSubtext, { color: theme.icon }]}>
              Tap "Add Exercise" to get started
            </Text>
          </View>
        )}

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: theme.tint }]}
        >
          <Text
            style={[
              styles.saveButtonText,
              { color: colorScheme === "dark" ? "#000" : "#fff" },
            ]}
          >
            Save Workout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerDate: {
    fontSize: 16,
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 16,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  exercisesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  addExerciseButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addExerciseButtonText: {
    fontWeight: "600",
    fontSize: 14,
  },
  exerciseCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  exerciseNameInput: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  // New compact styles
  compactSetContainer: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(128, 128, 128, 0.1)",
  },
  compactSetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  compactSetLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  compactSetActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  iconButton: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  iconButtonText: {
    fontSize: 12,
    fontWeight: "500",
  },
  compactDropSetRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  compactSetInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  compactInputLabel: {
    fontSize: 14,
    width: 20,
  },
  compactInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    textAlign: "center",
  },
  separator: {
    fontSize: 14,
    fontWeight: "bold",
  },
  smallDeleteButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  smallDeleteButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  miniDeleteButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FF4444",
    justifyContent: "center",
    alignItems: "center",
  },
  miniDeleteButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  compactAddDropSetButton: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 6,
    padding: 6,
    alignItems: "center",
    marginTop: 4,
  },
  compactAddDropSetText: {
    fontSize: 12,
    fontWeight: "500",
  },
  compactAddSetButton: {
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 4,
  },
  compactAddSetButtonText: {
    fontWeight: "600",
    fontSize: 14,
  },
  emptyState: {
    alignItems: "center",
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
  },
  saveButton: {
    padding: 18,
    alignItems: "center",
    borderRadius: 16,
    marginTop: 24,
    marginBottom: 40,
  },
  saveButtonText: {
    fontWeight: "700",
    fontSize: 18,
  },
});

export default WorkoutForm;
