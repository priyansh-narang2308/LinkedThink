import Output from "@/components/home/Output";
import UserInput from "@/components/home/UserInput";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { BioProvider } from "@/context/BioContext";
import { ChevronRight, Star } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-full px-4 py-8 mx-auto max-w-7xl sm:px-6 md:px-8 lg:px-12">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center w-full space-y-4 mb-8 text-center">
        <Link href="https://github.com/priyansh-narang2308" target="_blank">
          <div className="inline-block">
            <AnimatedGradientText
              speed={2}
              colorFrom="#45fa87"
              colorTo="#035664"
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-tight px-3 py-1.5 sm:px-4 sm:py-2 mt-10 sm:mt-16 md:mt-20 rounded-full border-2 transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:border-[#06b6d4]"
            >
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 fill-amber-400" />
              <hr className="mx-1 h-3 sm:h-4 w-[2px] bg-gray-300" />
              Star on Github
              <ChevronRight className="text-black ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedGradientText>
          </div>
        </Link>

        <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-center w-full lg:w-[90%] uppercase mx-auto py-2 sm:py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Crafting bios faster than you can say Twitter! 🏎️
        </h1>

        <p className="text-base sm:text-lg bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-transparent bg-clip-text max-w-xl mx-auto">
          Answer with ease, and we&apos;ll write a bio that&apos;s sure to please.
        </p>
      </div>

      {/* Main Content Section */}
      <BioProvider>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
          <div className="w-full">
            <UserInput />
          </div>
          <div className="w-full">
            <Output />
          </div>
        </div>
      </BioProvider>
    </div>
  );
}