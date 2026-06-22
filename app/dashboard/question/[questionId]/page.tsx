"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function QuestionDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const questionId = params.questionId as string;

  const [question, setQuestion] = useState<any>(null);
  const [friendsProgress, setFriendsProgress] = useState<any[]>([]);
  const [codeApproach, setCodeApproach] = useState("");
  const [notes, setNotes] = useState("");
  const [solved, setSolved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user && questionId) {
      loadQuestionData();
    }
  }, [session, questionId]);

  const loadQuestionData = async () => {
    try {
      setLoading(true);
      const [questionsRes, progressRes] = await Promise.all([
        fetch("/api/questions"),
        fetch(`/api/questions/${questionId}/friends-progress`),
      ]);

      if (questionsRes.ok) {
        const data = await questionsRes.json();
        const q = data.questions.find(
          (q: any) => q.id === questionId
        );
        setQuestion(q);
        if (q?.userProgress) {
          setSolved(q.userProgress.solved);
          setCodeApproach(q.userProgress.codeApproach || "");
          setNotes(q.userProgress.notes || "");
        }
      }

      if (progressRes.ok) {
        const data = await progressRes.json();
        setFriendsProgress(data.friendsProgress);
      }
    } catch (error) {
      console.error("Error loading question data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProgress = async () => {
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId,
          solved,
          codeApproach,
          notes,
        }),
      });

      if (res.ok) {
        alert("Progress saved!");
        loadQuestionData();
      }
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <p className="text-white">Question not found</p>
      </div>
    );
  }

  const solvedFriends = friendsProgress.filter(
    (fp) => fp.progress?.solved
  );
  const unsolvedFriends = friendsProgress.filter(
    (fp) => !fp.progress?.solved
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            DSA Practice
          </Link>
          <Link
            href="/dashboard?tab=questions"
            className="px-4 py-2 text-slate-300 hover:text-white transition"
          >
            ← Back to Questions
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Question Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Question Header */}
            <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {question.title}
                  </h1>
                  <div className="flex gap-2">
                    <span
                      className={`px-3 py-1 rounded text-sm font-semibold ${
                        question.difficulty === "Easy"
                          ? "bg-green-500/20 text-green-400"
                          : question.difficulty === "Medium"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {question.difficulty}
                    </span>
                    <span className="px-3 py-1 rounded text-sm font-semibold bg-blue-500/20 text-blue-400">
                      {question.category}
                    </span>
                  </div>
                </div>
                {solved && (
                  <span className="text-green-400 text-xl font-bold">✓</span>
                )}
              </div>

              {question.topicTags && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {question.topicTags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded bg-slate-700/50 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <a
                href={question.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
              >
                Solve on LeetCode →
              </a>
            </div>

            {/* Your Progress */}
            <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Your Progress</h2>

              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={solved}
                    onChange={(e) => setSolved(e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-purple-500"
                  />
                  <span className="text-white font-semibold">
                    Mark as Solved
                  </span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Your Approach / Code
                  </label>
                  <textarea
                    value={codeApproach}
                    onChange={(e) => setCodeApproach(e.target.value)}
                    placeholder="Paste your solution or explain your approach..."
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition font-mono text-sm h-40"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any notes about this problem..."
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition h-24"
                  />
                </div>

                <button
                  onClick={handleSaveProgress}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
                >
                  Save Progress
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Friends Progress */}
          <div className="space-y-6">
            {/* Friends Who Solved */}
            {solvedFriends.length > 0 && (
              <div className="bg-slate-800/50 border border-green-500/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-green-400 mb-4">
                  ✓ Solved by Friends ({solvedFriends.length})
                </h3>
                <div className="space-y-3">
                  {solvedFriends.map((fp) => (
                    <div
                      key={fp.friend.id}
                      className="p-3 bg-green-500/10 rounded-lg border border-green-500/20"
                    >
                      <p className="text-white font-semibold">{fp.friend.name}</p>
                      {fp.progress?.codeApproach && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-sm text-green-400 hover:text-green-300">
                            View their approach
                          </summary>
                          <pre className="mt-2 p-2 bg-slate-700/50 rounded text-xs text-slate-300 overflow-auto max-h-40">
                            {fp.progress.codeApproach}
                          </pre>
                        </details>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Friends Yet to Solve */}
            {unsolvedFriends.length > 0 && (
              <div className="bg-slate-800/50 border border-yellow-500/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-yellow-400 mb-4">
                  ⏳ Yet to Solve ({unsolvedFriends.length})
                </h3>
                <div className="space-y-2">
                  {unsolvedFriends.map((fp) => (
                    <div
                      key={fp.friend.id}
                      className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20"
                    >
                      <p className="text-white font-semibold">{fp.friend.name}</p>
                      <p className="text-xs text-yellow-400 mt-1">
                        Remind them to solve this question
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Difficulty</span>
                  <span className="text-white font-semibold">
                    {question.difficulty}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Category</span>
                  <span className="text-white font-semibold">
                    {question.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Friends Solved</span>
                  <span className="text-white font-semibold">
                    {solvedFriends.length} / {friendsProgress.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
