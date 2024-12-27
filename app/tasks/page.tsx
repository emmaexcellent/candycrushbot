import Link from "next/link";
import { Twitter, MessageCircle, Share2 } from "lucide-react";

export default function Tasks() {
  return (
    <div className="flex flex-col items-center justify-center px-4">
      <h2 className="text-4xl font-bold mb-8 text-white text-center">Tasks</h2>
      <div className="space-y-6 w-full max-w-md">
        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-4 text-white flex items-center">
            <Twitter className="mr-2" />
            Twitter Task
          </h3>
          <p className="mb-4 text-white">
            Follow our Twitter account or retweet our latest post.
          </p>
          <a
            href="https://twitter.com/example"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors shadow-md"
          >
            Go to Twitter
          </a>
        </div>
        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-4 text-white flex items-center">
            <MessageCircle className="mr-2" />
            Telegram Task
          </h3>
          <p className="mb-4 text-white">
            Join our Telegram group for updates and discussions.
          </p>
          <a
            href="https://t.me/example"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full transition-colors shadow-md"
          >
            Join Telegram Group
          </a>
        </div>
        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-4 text-white flex items-center">
            <Share2 className="mr-2" />
            Referral Task
          </h3>
          <p className="mb-4 text-white">
            Share your unique referral code with friends.
          </p>
          <p className="font-mono bg-purple-700 text-white p-2 rounded text-center mb-4">
            ABC123
          </p>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-colors shadow-md">
            Copy Referral Code
          </button>
        </div>
      </div>
      <Link
        href="/"
        className="mt-8 bg-white text-purple-600 hover:bg-purple-100 font-bold py-2 px-4 rounded-full transition-colors shadow-md"
      >
        Back to Home
      </Link>
    </div>
  );
}
