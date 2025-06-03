'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";
import { usePostHog } from "posthog-js/react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from 'lucide-react';

export default function Identify() {
  const [isLoading, setIsLoading] = useState(false)
  
  const posthog = usePostHog()
  const nameRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const identifyUser = async () => {
    try {
      setIsLoading(true)
      const name = nameRef.current?.value
      if (!name) {
        toast.error("Please enter your name", {
          description: "Don't be shy, just type your name"
        })
      }
      posthog.identify(name, {
        name,
      })
      toast.success(`Welcome ${name}`, {
        description: "Let's get started"
      })
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/dashboard')
    }
    catch (error) {
      console.error(error)
      toast.error("Something went wrong", {
        description: "Demo gods are not on my side today"
      })
    }
    finally {
      setIsLoading(false)
    }
  }
  return (
    <div className=" py-5 px-5 flex flex-col items-center justify-center h-screen pb-20">
      <Image src="/experiment-hog.svg" alt="PostHog" width={300} height={100} />
      <h1 className="text-xl font-bold mb-2 mt-5">Let&apos;s explore PostHog together</h1>
      <p className=" text-gray-500 mb-10">Type your name to get started</p>
      <div className="flex flex-col items-center w-full">
        <Input
          type="text"
          placeholder="Your name"
          className="w-full mb-5 p-2 border border-gray-300 rounded-md bg-white"
          ref={nameRef}
        />
        <Button
          className="bg-[#1D4AFF] w-full py-6"
          onClick={identifyUser}
        >
          {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : 'Start'}
        </Button>
      </div>
    </div>
  );
}
