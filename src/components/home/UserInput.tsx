"use client"


import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import MetaIcon from "../icons/Meta"
import { Slider } from "../ui/slider"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { Info, Loader2 } from "lucide-react"
import { Textarea } from "../ui/textarea"
import { Switch } from "../ui/switch"
import { Button } from "../ui/button"
import { generateBio } from "../../app/actions"
import { useContext } from "react"
import { BioContext } from "@/context/BioContext"


const formSchema = z.object({
    model: z.string().min(1, "Model is requried!").max(50),
    temperature: z.number().min(0, "Temperature must be atleast 0!").max(2, "Temperature must be atmost 2!"),
    content: z.string().min(50, "Content should atlease be having 50 characters!").max(500, "Content should not exceed 500 characters!"),
    type: z.enum(["personal", "brand"], {
        errorMap: () => ({ message: "Type is required!" })
    }),
    tone: z.enum(["proffessional", "casual", "sarcastic", "funny", "passionate", "thoughtful"], {
        errorMap: () => ({ message: "Tone is required!" })
    }),
    emojis: z.boolean()

})

const UserInput = () => {

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            model: "llama3-8b-8192",
            temperature: 1,
            content: "",
            type: "personal",
            tone: "proffessional",
            emojis: false
        },
    })

    const { setOutput, setLoading, loading } = useContext(BioContext)

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // console.log(values)
        setLoading(true)

        const userIpnputValues = `
        User Input : ${values.content},
        Bio Tone: ${values.tone}
        Bio Type: ${values.type}
        Add Emojis: ${values.emojis}
        `

        try {
            const { data } = await generateBio(userIpnputValues, values.temperature, values.model)
            // console.log(data)
            setOutput(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div className='relative flex flex-col items-start gap-8 ml-40'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full items-start gap-6">
                    <fieldset className="grid gap-6 rounded-[8px] border p-4 bg-background/10 backdrop-blur-2xl">
                        <legend className="-ml-1 px-1 text-sm font-bold">Settings</legend>
                        <div className="grid gap-3 cursor-pointer">
                            <FormField
                                control={form.control}
                                name="model"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="mt-2">Model</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a model" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="llama3-8b-8192">
                                                        <div className="flex items-center gap-3 text-muted-foreground">
                                                            <MetaIcon className="size-5" />
                                                            <div>
                                                                <p>
                                                                    <span className="text-foreground font-bold mr-2">LLaMA 3</span> 8B
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="llama-3.1-8b-instant">
                                                        <div className="flex items-center gap-3 text-muted-foreground">
                                                            <MetaIcon className="size-5" />
                                                            <div>
                                                                <p>
                                                                    <span className="text-foreground font-bold mr-2">LLaMA 3.1</span> 8b-instant
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="llama3-70b-8192">
                                                        <div className="flex items-center gap-3 text-muted-foreground">
                                                            <MetaIcon className="size-5" />
                                                            <div>
                                                                <p>
                                                                    <span className="text-foreground font-bold mr-2">LLaMA 3</span> 70B
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                        </div>


                        <div className="grid gap-3 cursor-pointer">
                            <FormField
                                control={form.control}
                                name="temperature"
                                render={({ field: { value, onChange } }) => (
                                    <FormItem >
                                        <FormLabel className=" flex items-center justify-between pb-2" ><span className="flex items-center justify-center" >Creativity

                                            <Tooltip>
                                                <TooltipTrigger> <Info className="w-4 h-4 ml-1 cursor-pointer" />  </TooltipTrigger>
                                                <TooltipContent sideOffset={25} collisionPadding={20} className="max-w-sm" >
                                                    <p>
                                                        A higher setting produces more creative and surprising bios, while a lower setting sticks to more predictable and conventional styles.
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </span>
                                            <span> {value} </span>
                                        </FormLabel>
                                        <FormControl>
                                            <Slider defaultValue={[1]} min={0} max={2} step={0.1} onValueChange={(val) => onChange(val[0])} />

                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                    </fieldset>


                    {/* input */}

                    <fieldset className="grid gap-6 rounded-[8px] border p-4 bg-background/10 backdrop-blur-2xl">
                        <legend className="-ml-1 px-1 text-sm font-bold">User Input</legend>

                        <div className="grid gap-3">

                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className=" flex items-center justify-between pb-2" >About Yourself
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Add you old twitter bio o write few sentences about youtself" {...field} className="min-h-[10rem]" />

                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>



                        <div className="grid grid-cols-2 gap-3">

                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className="" >Type
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="personal">
                                                    Personal

                                                </SelectItem>

                                                <SelectItem value="brand">
                                                    Brand
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="tone"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className="" >Tone
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a tone" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent >
                                                <SelectItem value="proffessional">Proffessional</SelectItem>
                                                <SelectItem value="casual">Casual</SelectItem>
                                                <SelectItem value="sarcastic">Sarcastic</SelectItem>
                                                <SelectItem value="funny">Funny</SelectItem>
                                                <SelectItem value="passionate">Passionate</SelectItem>
                                                <SelectItem value="thoughtful">Thoughtful</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                        </div>


                        <div className="grid gap-3">

                            <FormField
                                control={form.control}
                                name="emojis"
                                render={({ field }) => (
                                    <FormItem className="flex items-center" >
                                        <FormLabel className="text-sm mr-4" >Add Emojis
                                        </FormLabel>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} className="!my-0" />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                        </div>

                    </fieldset>

                    <Button className="rounded cursor-pointer mb-20" disabled={loading} type="submit">
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            "Generate"
                        )}
                    </Button>


                </form>
            </Form>
        </div>
    )
}

export default UserInput