"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [questions, setQuestions] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      loadDashboardData();
    }
  }, [session]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [questionsRes, friendsRes, requestsRes] = await Promise.all([
        fetch("/api/questions"),
        fetch("/api/friends"),
        fetch("/api/friends/requests"),
      ]);

      if (questionsRes.ok) {
        const data = await questionsRes.json();
        setQuestions(data.questions);
      }

      if (friendsRes.ok) {
        const data = await friendsRes.json();
        setFriends(data.friends);
      }

      if (requestsRes.ok) {
        const data = await requestsRes.json();
        setFriendRequests(data.requests);
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await fetch(`/api/users/search?q=${query}`);
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data.users);
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleSendFriendRequest = async (userId: string) => {
    try {
      const res = await fetch("/api/friends/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiverId: userId }),
      });

      if (res.ok) {
        setSearchQuery("");
        setSearchResults([]);
        alert("Friend request sent!");
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    try {
      const res = await fetch(`/api/friends/requests/${requestId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "accept" }),
      });

      if (res.ok) {
        loadDashboardData();
      }
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleQuestionProgress = async (
    questionId: string,
    solved: boolean,
    codeApproach?: string
  ) => {
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId,
          solved,
          codeApproach,
        }),
      });

      if (res.ok) {
        loadDashboardData();
      }
    } catch (error) {
      console.error("Error updating question progress:", error);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  const solvedCount = questions.filter(
    (q: any) => q.userProgress?.solved
  ).length;
  const totalCount = questions.length;
  const progressPercentage =
    totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            DSA Practice
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">{session?.user?.name}</span>
            <button
              onClick={() => {
                import("next-auth/react").then(({ signOut }) =>
                  signOut({ callbackUrl: "/" })
                );
              }}
              className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white hover:bg-slate-700 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-purple-500/20 pb-4">
          {["overview", "questions", "friends", "leaderboard"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-semibold capitalize transition ${
                activeTab === tab
                  ? "text-purple-400 border-b-2 border-purple-400"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Questions Solved</p>
                    <p className="text-3xl font-bold text-white mt-2">
                      {solvedCount}
                    </p>
                  </div>
                  <div className="text-4xl">📊</div>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Progress</p>
                    <p className="text-3xl font-bold text-white mt-2">
                      {progressPercentage}%
                    </p>
                  </div>
                  <div className="text-4xl">🎯</div>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Friends</p>
                    <p className="text-3xl font-bold text-white mt-2">
                      {friends.length}
                    </p>
                  </div>
                  <div className="text-4xl">👥</div>
                </div>
              </div>
            </div>

            {/* Pending Friend Requests */}
            {friendRequests.length > 0 && (
              <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Friend Requests ({friendRequests.length})
                </h3>
                <div className="space-y-3">
                  {friendRequests.map((request: any) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
                    >
                      <div>
                        <p className="text-white font-semibold">
                          {request.sender.name}
                        </p>
                        <p className="text-slate-400 text-sm">
                          {request.sender.email}
                        </p>
                      </div>
                      <button
                        onClick={() => handleAcceptRequest(request.id)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                      >
                        Accept
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Questions */}
            <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Recent Questions
              </h3>
              <div className="space-y-3">
                {questions.slice(0, 5).map((question: any) => (
                  <div
                    key={question.id}
                    className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition"
                  >
                    <div className="flex-1">
                      <p className="text-white font-semibold">
                        {question.title}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            question.difficulty === "Easy"
                              ? "bg-green-500/20 text-green-400"
                              : question.difficulty === "Medium"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {question.difficulty}
                        </span>
                        <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400">
                          {question.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {question.userProgress?.solved && (
                        <span className="text-green-400">✓ Solved</span>
                      )}
                      <a
                        href={question.leetcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition text-sm"
                      >
                        View
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Questions Tab */}
        {activeTab === "questions" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              {questions.map((question: any) => (
                <div
                  key={question.id}
                  className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-4 hover:border-purple-500/50 transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-white font-semibold flex-1 text-sm">
                      {question.title}
                    </h4>
                    {question.userProgress?.solved && (
                      <span className="text-green-400 ml-2">✓</span>
                    )}
                  </div>
                  <div className="flex gap-2 mb-4">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        question.difficulty === "Easy"
                          ? "bg-green-500/20 text-green-400"
                          : question.difficulty === "Medium"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {question.difficulty}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <a
                      href={question.leetcodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white text-center rounded text-sm transition"
                    >
                      Solve
                    </a>
                    <button
                      onClick={() =>
                        handleQuestionProgress(question.id, true)
                      }
                      className={`w-full py-2 px-3 rounded text-sm transition ${
                        question.userProgress?.solved
                          ? "bg-green-600 text-white"
                          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      {question.userProgress?.solved
                        ? "✓ Solved"
                        : "Mark Solved"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Friends Tab */}
        {activeTab === "friends" && (
          <div className="space-y-8">
            {/* Search Friends */}
            <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Add Friends
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition"
                />
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-purple-500/20 rounded-lg overflow-hidden z-10">
                    {searchResults.map((user: any) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 hover:bg-slate-700/50 transition"
                      >
                        <div>
                          <p className="text-white font-semibold">{user.name}</p>
                          <p className="text-slate-400 text-sm">{user.email}</p>
                        </div>
                        <button
                          onClick={() => handleSendFriendRequest(user.id)}
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition text-sm"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Friends List */}
            <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                My Friends ({friends.length})
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {friends.map((friend: any) => (
                  <div
                    key={friend.id}
                    className="p-4 bg-slate-700/30 rounded-lg"
                  >
                    <p className="text-white font-semibold">{friend.name}</p>
                    <p className="text-slate-400 text-sm">{friend.email}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <div className="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">
              Leaderboard
            </h3>
            <div className="space-y-3">
              {[...friends, { id: (session?.user as any)?.id, name: "You (Current User)", email: "" }]
                .map((friend: any, index) => (
                  <div
                    key={friend.id}
                    className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-purple-400 w-8">
                        #{index + 1}
                      </span>
                      <div>
                        <p className="text-white font-semibold">
                          {friend.name}
                        </p>
                        <p className="text-slate-400 text-sm">
                          {Math.floor(Math.random() * 100)} questions solved
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-lg">
                        {Math.floor(Math.random() * 100)}%
                      </p>
                      <p className="text-slate-400 text-xs">Progress</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
