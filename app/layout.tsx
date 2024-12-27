import "./globals.css";
import { Inter } from "next/font/google";
import { ThirdwebProvider } from "thirdweb/react";
import { ConnectToCandy } from "@/components/connect";
import { ScoreProvider } from "@/lib/context/score";
// import { Candy } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Candy Crush Style Game",
  description: "A fun match-3 game with social features",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gradient-to-br from-purple-500 to-pink-500 min-h-screen`}
      >
        <ThirdwebProvider>
          <ScoreProvider>
            <div className="min-h-screen flex flex-col">
              <div className="bg-white bg-opacity-10 backdrop-blur-md text-white p-4 shadow-lg">
                <div className="container mx-auto flex items-center justify-end">
                  <ConnectToCandy />
                </div>
              </div>
              <main className="flex-grow container mx-auto py-8">
                {children}
              </main>
              <footer className="bg-white bg-opacity-10 backdrop-blur-md text-white p-4">
                <div className="container mx-auto text-center">
                  <p>
                    &copy; 2023 Candy Crush Style Game. All rights reserved.
                  </p>
                </div>
              </footer>
            </div>
          </ScoreProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
