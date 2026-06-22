import { prisma } from "@/lib/prisma";

// Fetch questions from GitHub DSA Bootcamp repo
const DSA_QUESTIONS_FROM_GITHUB = [
  {
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    leetcodeUrl: "https://leetcode.com/problems/two-sum/",
    topicTags: ["Array", "Hash Table"],
    description: "Find two numbers that add up to a target sum",
  },
  {
    title: "Add Two Numbers",
    difficulty: "Medium",
    category: "Linked List",
    leetcodeUrl: "https://leetcode.com/problems/add-two-numbers/",
    topicTags: ["Linked List", "Math"],
    description: "Add two numbers represented as linked lists",
  },
  {
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "String",
    leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    topicTags: ["String", "Sliding Window"],
    description: "Find the longest substring without repeating characters",
  },
  {
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Array",
    leetcodeUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    topicTags: ["Array", "Binary Search"],
    description: "Find median of two sorted arrays",
  },
  {
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    category: "String",
    leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-substring/",
    topicTags: ["String", "Dynamic Programming"],
    description: "Find the longest palindromic substring",
  },
  {
    title: "ZigZag Conversion",
    difficulty: "Medium",
    category: "String",
    leetcodeUrl: "https://leetcode.com/problems/zigzag-conversion/",
    topicTags: ["String"],
    description: "Convert string to zigzag pattern",
  },
  {
    title: "Reverse Integer",
    difficulty: "Medium",
    category: "Math",
    leetcodeUrl: "https://leetcode.com/problems/reverse-integer/",
    topicTags: ["Math"],
    description: "Reverse an integer",
  },
  {
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    category: "String",
    leetcodeUrl: "https://leetcode.com/problems/string-to-integer-atoi/",
    topicTags: ["String"],
    description: "Convert string to integer",
  },
  {
    title: "Palindrome Number",
    difficulty: "Easy",
    category: "Math",
    leetcodeUrl: "https://leetcode.com/problems/palindrome-number/",
    topicTags: ["Math"],
    description: "Check if a number is palindrome",
  },
  {
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Array",
    leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/",
    topicTags: ["Array", "Two Pointers"],
    description: "Find two lines that form a container with maximum area",
  },
  {
    title: "3Sum",
    difficulty: "Medium",
    category: "Array",
    leetcodeUrl: "https://leetcode.com/problems/3sum/",
    topicTags: ["Array", "Two Pointers"],
    description: "Find all unique triplets that sum to zero",
  },
  {
    title: "Remove Nth Node From End of List",
    difficulty: "Medium",
    category: "Linked List",
    leetcodeUrl: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    topicTags: ["Linked List"],
    description: "Remove the nth node from the end of a list",
  },
  {
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/",
    topicTags: ["Stack", "String"],
    description: "Check if parentheses are valid",
  },
  {
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked List",
    leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/",
    topicTags: ["Linked List"],
    description: "Merge two sorted linked lists",
  },
  {
    title: "Generate Parentheses",
    difficulty: "Medium",
    category: "Backtracking",
    leetcodeUrl: "https://leetcode.com/problems/generate-parentheses/",
    topicTags: ["Backtracking", "String"],
    description: "Generate all combinations of well-formed parentheses",
  },
  {
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    category: "Linked List",
    leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/",
    topicTags: ["Linked List", "Heap"],
    description: "Merge k sorted linked lists into one sorted list",
  },
  {
    title: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    category: "Array",
    leetcodeUrl: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
    topicTags: ["Array"],
    description: "Remove duplicates from sorted array",
  },
  {
    title: "Remove Element",
    difficulty: "Easy",
    category: "Array",
    leetcodeUrl: "https://leetcode.com/problems/remove-element/",
    topicTags: ["Array"],
    description: "Remove all instances of a value from array",
  },
  {
    title: "First Missing Positive",
    difficulty: "Hard",
    category: "Array",
    leetcodeUrl: "https://leetcode.com/problems/first-missing-positive/",
    topicTags: ["Array"],
    description: "Find first missing positive integer",
  },
  {
    title: "Longest Valid Parentheses",
    difficulty: "Hard",
    category: "String",
    leetcodeUrl: "https://leetcode.com/problems/longest-valid-parentheses/",
    topicTags: ["String", "Dynamic Programming"],
    description: "Find longest valid parentheses substring",
  },
];

async function seedQuestions() {
  try {
    console.log("Seeding questions database...");

    // Clear existing questions (optional)
    // await prisma.question.deleteMany({});

    // Insert questions
    for (const question of DSA_QUESTIONS_FROM_GITHUB) {
      const existing = await prisma.question.findFirst({
        where: { title: question.title },
      });

      if (!existing) {
        await prisma.question.create({
          data: {
            title: question.title,
            difficulty: question.difficulty,
            category: question.category,
            leetcodeUrl: question.leetcodeUrl,
            topicTags: question.topicTags,
            description: question.description,
          },
        });
        console.log(`✓ Added: ${question.title}`);
      }
    }

    console.log("✅ Seeding complete!");
  } catch (error) {
    console.error("Error seeding questions:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run seed if this file is executed directly
if (require.main === module) {
  seedQuestions();
}

export default seedQuestions;
