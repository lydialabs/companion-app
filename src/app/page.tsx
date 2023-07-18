import Navbar from "@/components/Navbar";
import { AIWaifuSection } from '@/components/AIWaifuSection'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />
      <AIWaifuSection />
    </main>
  );
}
