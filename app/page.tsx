"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-purple-500/20 bg-slate-900/50 backdrop-blur-xl">
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          DSA Practice
        </div>
        <div className="flex gap-4">
          <Link
            href="/auth/signin"
            className="px-6 py-2 text-slate-300 hover:text-white transition"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Master{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                DSA Together
              </span>
            </h1>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              Practice data structures and algorithms with your friends. Track progress, share approaches, and solve questions together on a unified platform.
            </p>
            <div className="flex gap-4">
              <Link
                href="/auth/signup"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
              >
                Start Free
              </Link>
              <Link
                href="#features"
                className="px-8 py-3 border border-purple-500/50 text-purple-400 rounded-lg hover:bg-purple-500/10 transition font-semibold"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-3xl"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-slate-400">Today's Target</p>
                    <p className="text-lg font-semibold text-white">2 Questions</p>
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    75%
                  </div>
                </div>
                <div className="h-32 bg-slate-700/30 rounded-lg flex items-center justify-center">
                  <p className="text-slate-400">Progress Chart</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="mt-32">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Friend Collaboration",
                description: "Add friends and solve questions together",
                icon: "👥",
              },
              {
                title: "Progress Tracking",
                description: "Monitor your DSA learning journey with detailed analytics",
                icon: "📊",
              },
              {
                title: "Code Sharing",
                description: "Share your approach and learn from friends' solutions",
                icon: "💾",
              },
              {
                title: "Leaderboard",
                description: "See who's solving questions consistently",
                icon: "🏆",
              },
              {
                title: "Daily Goals",
                description: "Set and track your daily DSA practice targets",
                icon: "🎯",
              },
              {
                title: "LeetCode Integration",
                description: "Direct links to LeetCode problems",
                icon: "🔗",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 bg-slate-800/50 border border-purple-500/20 rounded-xl hover:border-purple-500/50 transition"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to level up your DSA skills?
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              Join thousands of developers practicing algorithms together
            </p>
            <Link
              href="/auth/signup"
              className="inline-block px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition font-semibold text-lg"
            >
              Create Your Account
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 bg-slate-900/50 backdrop-blur-xl mt-32 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400">
          <p>&copy; 2024 DSA Practice. Built for developers.</p>
        </div>
      </footer>
    </div>
  );
}
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
