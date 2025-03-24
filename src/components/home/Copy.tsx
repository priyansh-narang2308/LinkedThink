"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'

const Copy = ({ text }: { text: string }) => {

    const [label, setLabel] = useState("copy")

    const copytoClip = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
        } catch (error) {
            console.error("Failed to Copy text!", error)
        }
    }

    const handleClick = () => {
        copytoClip(text)
        setLabel("copied!")
    }

    return (
        <div>
            <Button onClick={handleClick}  variant={"outline"} className='text-sm text-muted-foreground bg-background my-0 h-auto  rounded-none border border-primary/20 border-t-0 rounded-b-lg hover:bg-primary hover:text-primary-foreground pb-0.5 pt-0' >
                {label}
            </Button>
        </div>

    )
}

export default Copy