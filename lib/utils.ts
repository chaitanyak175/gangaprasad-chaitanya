import { hash } from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export const DSA_QUESTIONS = [
  {
    id: "1",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    leetcodeUrl:
      "https://leetcode.com/problems/two-sum/",
    topicTags: ["Array", "Hash Table"],
  },
  {
    id: "2",
    title: "Add Two Numbers",
    difficulty: "Medium",
    category: "Linked List",
    leetcodeUrl:
      "https://leetcode.com/problems/add-two-numbers/",
    topicTags: ["Linked List", "Math"],
  },
  {
    id: "3",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "String",
    leetcodeUrl:
      "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    topicTags: ["String", "Sliding Window"],
  },
  {
    id: "4",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Array",
    leetcodeUrl:
      "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    topicTags: ["Array", "Binary Search"],
  },
  {
    id: "5",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    category: "String",
    leetcodeUrl:
      "https://leetcode.com/problems/longest-palindromic-substring/",
    topicTags: ["String", "Dynamic Programming"],
  },
  // Add more questions as needed
];

export const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: "bg-green-500/20 text-green-400 border border-green-500/30",
  Medium: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  Hard: "bg-red-500/20 text-red-400 border border-red-500/30",
};

export const CATEGORY_COLORS: Record<string, string> = {
  Array: "bg-blue-500/20 text-blue-400",
  LinkedList: "bg-purple-500/20 text-purple-400",
  String: "bg-pink-500/20 text-pink-400",
  Tree: "bg-green-500/20 text-green-400",
  Graph: "bg-orange-500/20 text-orange-400",
  "Dynamic Programming": "bg-cyan-500/20 text-cyan-400",
  "Hash Table": "bg-indigo-500/20 text-indigo-400",
  "Sliding Window": "bg-teal-500/20 text-teal-400",
};
