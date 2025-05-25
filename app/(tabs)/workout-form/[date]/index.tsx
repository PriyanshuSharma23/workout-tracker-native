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

type DateString = string;

type Set = {
  reps: number;
  weight: number;
};

type DropSet = Set[];

type Exercise = {
  name: string;
  sets: DropSet[];
};

type Workout = {
  date: DateString;
  name: string;
  bodyWeight: number;
  exercises: Exercise[];
};

const WorkoutForm = () => {
  const colorScheme = useColorScheme() ?? "dark";
  const theme = Colors[colorScheme];

  const { date } = useLocalSearchParams();
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [exercises, setExercises] = useState<
    { name: string; sets: { reps: number; weight: number }[][] }[]
  >([]);

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

  const renderActionButton = (
    text: string,
    onPress: () => void,
    style?: any,
  ) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.actionButton, { borderColor: theme.border }, style]}
    >
      <Text style={[styles.actionButtonText, { color: theme.text }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );

  const renderDeleteButton = (onPress: () => void) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.deleteButton, { backgroundColor: "#FF4444" }]}
    >
      <Text style={[styles.deleteButtonText, { color: "#FFFFFF" }]}>×</Text>
    </TouchableOpacity>
  );

  const expandedDate = () => {
    const d = new Date(date as string);
    d.setHours(0, 0, 0, 0);
    // return 25 May 2025
    return `${d.getDate()} ${Months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerDate, { color: theme.text }]}>
            Workout
          </Text>
          <Text style={[styles.headerTitle, { color: theme.icon }]}>
            {expandedDate()}
          </Text>
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
            {/* Exercise Header */}
            <View style={styles.exerciseHeader}>
              <View style={styles.exerciseInputContainer}>
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
              </View>
              {renderDeleteButton(() => deleteExercise(exIdx))}
            </View>

            {/* Sets */}
            {exercise.sets.map((dropSet, dropIdx) => (
              <View key={dropIdx} style={styles.setContainer}>
                <View style={styles.setHeader}>
                  <Text style={[styles.setLabel, { color: theme.text }]}>
                    Set {dropIdx + 1}
                    {dropSet.length > 1 && (
                      <Text style={{ color: theme.icon }}> (Drop Set)</Text>
                    )}
                  </Text>
                  <View style={styles.setActions}>
                    {renderActionButton("Duplicate", () =>
                      duplicateSet(exIdx, dropIdx),
                    )}
                    {exercise.sets.length > 1 &&
                      renderDeleteButton(() => deleteSet(exIdx, dropIdx))}
                  </View>
                </View>

                {dropSet.map((set, setIdx) => (
                  <View key={setIdx} style={styles.dropSetRow}>
                    <View style={styles.setInputs}>
                      <View style={styles.inputWithLabel}>
                        <Text
                          style={[styles.inputLabel, { color: theme.icon }]}
                        >
                          Reps
                        </Text>
                        <TextInput
                          style={[
                            styles.setInput,
                            {
                              borderColor: theme.border,
                              color: theme.text,
                              backgroundColor: theme.background,
                            },
                          ]}
                          keyboardType="numeric"
                          placeholder="0"
                          placeholderTextColor={theme.icon}
                          value={set.reps === 0 ? "" : String(set.reps)}
                          onChangeText={(val) =>
                            updateSet(exIdx, dropIdx, setIdx, "reps", val)
                          }
                        />
                      </View>
                      <View style={styles.inputWithLabel}>
                        <Text
                          style={[styles.inputLabel, { color: theme.icon }]}
                        >
                          Weight
                        </Text>
                        <TextInput
                          style={[
                            styles.setInput,
                            {
                              borderColor: theme.border,
                              color: theme.text,
                              backgroundColor: theme.background,
                            },
                          ]}
                          keyboardType="numeric"
                          placeholder="0"
                          placeholderTextColor={theme.icon}
                          value={set.weight === 0 ? "" : String(set.weight)}
                          onChangeText={(val) =>
                            updateSet(exIdx, dropIdx, setIdx, "weight", val)
                          }
                        />
                      </View>
                    </View>
                    {dropSet.length > 1 && (
                      <TouchableOpacity
                        onPress={() => deleteDropSet(exIdx, dropIdx, setIdx)}
                        style={styles.smallDeleteButton}
                      >
                        <Text style={styles.smallDeleteButtonText}>×</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}

                {/* Add Drop Set Button */}
                <TouchableOpacity
                  onPress={() => addDropSet(exIdx, dropIdx)}
                  style={[
                    styles.addDropSetButton,
                    { borderColor: theme.border },
                  ]}
                >
                  <Text style={[styles.addDropSetText, { color: theme.icon }]}>
                    + Add Drop Set
                  </Text>
                </TouchableOpacity>
              </View>
            ))}

            {/* Add Set Button */}
            <TouchableOpacity
              onPress={() => addSet(exIdx)}
              style={[
                styles.addSetButton,
                { backgroundColor: theme.highlight },
              ]}
            >
              <Text
                style={[
                  styles.addSetButtonText,
                  { color: colorScheme === "dark" ? "#000" : "#000" },
                ]}
              >
                + Add Set
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
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  exerciseInputContainer: {
    flex: 1,
    marginRight: 12,
  },
  exerciseNameInput: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    fontWeight: "600",
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  setContainer: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(128, 128, 128, 0.2)",
  },
  setHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  setLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  setActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: "500",
  },
  dropSetRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  setInputs: {
    flexDirection: "row",
    flex: 1,
    gap: 12,
  },
  inputWithLabel: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
  },
  setInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlign: "center",
  },
  smallDeleteButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FF4444",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  smallDeleteButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  addDropSetButton: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 8,
  },
  addDropSetText: {
    fontSize: 14,
    fontWeight: "500",
  },
  addSetButton: {
    padding: 14,
    alignItems: "center",
    borderRadius: 12,
    marginTop: 8,
  },
  addSetButtonText: {
    fontWeight: "600",
    fontSize: 16,
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
