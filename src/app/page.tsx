import { AIWaifuSection } from '@/components/AIWaifuSection'
import { auth } from "@clerk/nextjs";


export default function Home() {
  const { userId } = auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <AIWaifuSection userId={userId}/>
    </main>
  );
}
