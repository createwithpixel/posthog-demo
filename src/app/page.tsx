import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/identify");

  return (
    <div className=" py-5 px-5 flex flex-col items-center justify-center h-screen pb-20">
      <Image src="/experiment-hog.svg" alt="PostHog" width={300} height={100} />
      <h1 className="text-xl font-bold mb-2 mt-5">Let&apos;s explore PostHog together</h1>
      <p className=" text-gray-500 mb-10">Type your name to get started</p>
      <div className="flex flex-col items-center w-full">
        <Input type="text" placeholder="Your name" className="w-full mb-5 p-2 border border-gray-300 rounded-md" />
        <Button className="bg-[#1D4AFF] w-full py-6">Start</Button>
      </div>
    </div>
  );
}
