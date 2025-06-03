/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Image from "next/image"
import { usePostHog } from "posthog-js/react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Dashboard() {
    const [showButton, setShowButton] = useState<boolean>(false)
    const posthog = usePostHog()
    const router = useRouter()

    useEffect(() => {
        posthog.onFeatureFlags(() => {
            const start = posthog.isFeatureEnabled('show-start-button')
            setShowButton(start ?? false)
        })

        const interval = setInterval(() => {
            posthog.reloadFeatureFlags()
            console.log('Reloading feature flags')
        }, 1000)

        return () => clearInterval(interval)
    }, [])

  return (
    <div className=" py-5 px-5 flex flex-col items-center justify-center h-screen pb-20">
        <Image src={showButton ? "/explaining-hog.svg": "stopsign.svg"} alt="PostHog" width={300} height={100} />
        <h1 className="text-xl font-bold mb-2 mt-5 text-center">{ showButton ? 'Feature Flags in Action' : 'No action here just yet'}</h1>
        <p className=" text-gray-500 mb-10">{ showButton ? "Update your UI without deploying" : 'Pay attention! I am watching you'}</p>
        <div className="flex flex-col items-center w-full">
        <div className="h-12 flex flex-col w-full">
            {
                showButton && (
                    <Button
                        className="bg-[#1D4AFF] w-full py-6"
                        onClick={() => {
                            console.log('clicked')
                            router.push('/funnel')
                        }}
                    >
                        You can click me now
                    </Button>
                )
            }

        </div>
      </div>
    </div>
  )
}