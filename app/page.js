import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      {/* App Title */}
      <h1 className="text-5xl font-bold mb-4">ZenStudio</h1>
      
      {/* Tagline */}
      <p className="text-lg font-semibold text-gray-700 mb-4">Create, Edit, and Share High-Quality Short Videos</p>

      {/* Product Description */}
      <p className="text-gray-600 max-w-md mb-8">
        ZenStudio is an intuitive platform designed for content creators and businesses to create stunning short videos with ease. Whether you're building brand awareness, sharing stories, or marketing your products, ZenStudio simplifies your video production workflow.
      </p>

      {/* Sign Up and Sign In Buttons */}
      <div className="flex gap-4">
        <Link href="/sign-up">
          <Button>Sign Up</Button>
        </Link>
        <Link href="/sign-in">
          <Button variant="outline">Sign In</Button>
        </Link>
      </div>

      {/* Clerk's User Button (for signed-in users) */}
      <div className="mt-8">
        <UserButton />
      </div>
    </div>
  );
}
