"use client";

import { useState } from "react";
import Link from "next/link";
import { Share2, Copy, Check } from "lucide-react";

export default function InviteFriends() {
  const [referralLink, setReferralLink] = useState(
    "https://example.com/ref/ABC123"
  );
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-8 text-white text-center flex items-center">
        <Share2 className="mr-2" />
        Invite Friends
      </h2>
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-8 w-full max-w-md">
        <p className="text-white mb-4">
          Share your unique referral link with friends and earn rewards!
        </p>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-grow p-2 border rounded-l bg-purple-700 text-white"
            onChange={(e) => setReferralLink(e.target.value)}
          />
          <button
            onClick={copyToClipboard}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-r transition-colors shadow-md flex items-center"
          >
            {copied ? <Check className="mr-1" /> : <Copy className="mr-1" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="text-sm text-yellow-300">
          You&apos;ll receive 100 points for each friend who signs up using your
          link!
        </p>
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
