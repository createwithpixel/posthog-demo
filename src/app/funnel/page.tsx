'use client'

// import { usePostHog } from "posthog-js/react"
import { useState } from "react"
import { steps } from "./steps"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { usePostHog } from "posthog-js/react"
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"

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

    const clickBack = () => {
        if (step - 1 < 0) {
            return
        }
        setStep(step - 1)
    }
        return (
        <div className=" py-5 px-5 flex flex-col items-center pt-[10vh] h-screen pb-20">
            <div className="flex flex-col justify-end items-center w-full h-1/3 relative">
                <Image src={steps[step].imageSrc} alt="PostHog" width={300} height={200} className="mb-8" />
            </div>
            <Progress
                value={(step + 1) / steps.length * 100}
                className="w-full mt-5 mb-8 "
            />
            <h1 className="text-xl font-bold mb-2 mt-5 text-center">{steps[step].title}</h1>
            <p className=" text-center text-gray-500 mb-10">{steps[step].description}</p>
            {
                step < steps.length - 1 && (
                <Button
                    className="bg-[#1D4AFF] w-full py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={clickNext}
                >
                    {steps[step].buttonText}
                </Button>
                )
            }
            <Button
                variant="outline"
                className="w-full py-6 disabled:opacity-50 disabled:cursor-not-allowed mt-3"
                onClick={clickBack}
                disabled={step === 0}
            >
                Back
            </Button>
        </div>
    )
}