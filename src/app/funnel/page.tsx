'use client'

// import { usePostHog } from "posthog-js/react"
import { useState } from "react"
import { steps } from "./steps"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { usePostHog } from "posthog-js/react"
import { toast } from "sonner"

export default function Funnel() {
    const posthog = usePostHog()

    const [step, setStep] = useState(0)

    const clickNext = () => {
        posthog.capture(steps[step].eventId)
        console.log('clicked', steps[step].eventId)
        if (step + 1 >= steps.length) {
            toast.success('You have completed the funnel')
            return
        }
        setStep(step + 1)
    }

    return (
        <div className=" py-5 px-5 flex flex-col items-center justify-center h-screen pb-20">
            <Image src={steps[step].imageSrc} alt="PostHog" width={300} height={200} />
            <h1 className="text-xl font-bold mb-2 mt-5 text-center">{steps[step].title}</h1>
            <p className=" text-center text-gray-500 mb-10">{steps[step].description}</p>
            <Button
                className="bg-[#1D4AFF] w-full py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={clickNext}
            >
                {steps[step].buttonText}
            </Button>
        </div>
    )
}