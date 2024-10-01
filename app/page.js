import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl">ZenStudio</h1>
      <Button>Join Waitlist</Button>
      <UserButton/>
    </div>
  );
}
