export const dummyUsers = [
  { id: "1", username: "alice", email: "alice@example.com" },
  { id: "2", username: "bob", email: "bob@example.com" },
  { id: "3", username: "charlie", email: "charlie@example.com" },
]

export const dummyLessons = [
  { id: 1, topic: "queues", subtopic: "basic", title: "Introduction to Queues", order_index: 1 },
  { id: 2, topic: "queues", subtopic: "circular", title: "Circular Queues", order_index: 2 },
  { id: 3, topic: "queues", subtopic: "deque", title: "Double-Ended Queues", order_index: 3 },
  { id: 4, topic: "recursion", subtopic: "basic", title: "Recursion Basics", order_index: 1 },
  { id: 5, topic: "recursion", subtopic: "advanced", title: "Advanced Recursion", order_index: 2 },
]

export const dummyUserProgress = [
  { id: 1, userId: "1", lessonId: 1, completed: true, score: 90 },
  { id: 2, userId: "1", lessonId: 2, completed: true, score: 85 },
  { id: 3, userId: "2", lessonId: 1, completed: true, score: 95 },
  { id: 4, userId: "3", lessonId: 1, completed: true, score: 80 },
  { id: 5, userId: "3", lessonId: 2, completed: false, score: 0 },
]

export const dummyQuizAttempts = [
  { id: 1, userId: "1", topic: "queues", score: 90 },
  { id: 2, userId: "1", topic: "recursion", score: 85 },
  { id: 3, userId: "2", topic: "queues", score: 95 },
  { id: 4, userId: "3", topic: "queues", score: 80 },
  { id: 5, userId: "3", topic: "recursion", score: 75 },
]

export const dummyLeaderboard = [
  { username: "alice", queues_score: 90, recursion_score: 85, total_score: 175 },
  { username: "bob", queues_score: 95, recursion_score: 0, total_score: 95 },
  { username: "charlie", queues_score: 80, recursion_score: 75, total_score: 155 },
]

