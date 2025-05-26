import { Workout } from "@/types/workout";

export const workouts: Workout[] = [
  {
    date: "2025-05-26",
    name: "Chest Day",
    bodyWeight: 75,
    exercises: [
      {
        name: "Barbell Bench Press",
        sets: [
          [{ reps: 8, weight: 60 }],
          [{ reps: 6, weight: 55 }],
          [{ reps: 6, weight: 50 }],
        ],
      },
      {
        name: "Overhead Press",
        sets: [
          [
            { reps: 10, weight: 30 },
            { reps: 8, weight: 25 },
          ],
          [{ reps: 10, weight: 30 }],
          [{ reps: 10, weight: 30 }],
        ],
      },
      {
        name: "Tricep Pushdown",
        sets: [[{ reps: 12, weight: 20 }], [{ reps: 10, weight: 15 }]],
      },
    ],
  },
  {
    date: "2025-05-20",
    name: "Push Day",
    bodyWeight: 75,
    exercises: [
      {
        name: "Barbell Bench Press",
        sets: [
          [{ reps: 8, weight: 60 }],
          [{ reps: 6, weight: 55 }],
          [{ reps: 6, weight: 50 }],
        ],
      },
      {
        name: "Overhead Press",
        sets: [
          [
            { reps: 10, weight: 30 },
            { reps: 8, weight: 25 },
          ],
          [{ reps: 10, weight: 30 }],
          [{ reps: 10, weight: 30 }],
        ],
      },
      {
        name: "Tricep Pushdown",
        sets: [[{ reps: 12, weight: 20 }], [{ reps: 10, weight: 15 }]],
      },
    ],
  },
  {
    date: "2025-05-22",
    name: "Pull Day",
    bodyWeight: 75,
    exercises: [
      {
        name: "Barbell Row",
        sets: [[{ reps: 10, weight: 50 }], [{ reps: 8, weight: 45 }]],
      },
      {
        name: "Lat Pulldown",
        sets: [[{ reps: 12, weight: 40 }], [{ reps: 10, weight: 35 }]],
      },
      {
        name: "Barbell Curl",
        sets: [[{ reps: 10, weight: 20 }], [{ reps: 8, weight: 15 }]],
      },
    ],
  },
  {
    date: "2025-05-24",
    name: "Leg Day",
    bodyWeight: 75,
    exercises: [
      {
        name: "Back Squat",
        sets: [
          [{ reps: 8, weight: 80 }],
          [{ reps: 6, weight: 75 }],
          [{ reps: 6, weight: 70 }],
        ],
      },
      {
        name: "Leg Press",
        sets: [[{ reps: 12, weight: 100 }], [{ reps: 10, weight: 90 }]],
      },
      {
        name: "Calf Raise",
        sets: [[{ reps: 15, weight: 40 }], [{ reps: 12, weight: 35 }]],
      },
    ],
  },
  {
    date: "2024-05-24",
    name: "Leg Day",
    bodyWeight: 75,
    exercises: [
      {
        name: "Back Squat",
        sets: [
          [{ reps: 8, weight: 80 }],
          [{ reps: 6, weight: 75 }],
          [{ reps: 6, weight: 70 }],
        ],
      },
      {
        name: "Leg Press",
        sets: [[{ reps: 12, weight: 100 }], [{ reps: 10, weight: 90 }]],
      },
      {
        name: "Calf Raise",
        sets: [[{ reps: 15, weight: 40 }], [{ reps: 12, weight: 35 }]],
      },
    ],
  },
];
