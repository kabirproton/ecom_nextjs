import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Newsletter() {
  return (
    <section className="bg-primary-800 text-white py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/placeholder.svg?height=200&width=200"
          alt="Pattern"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
      </div>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold mb-2">BE A PART OF BIBA FAMILY</h3>
          <p className="text-sm text-primary-100">Keep yourself updated with style tips & more</p>
        </div>
        <div className="flex w-full md:w-auto max-w-md">
          <Input
            type="email"
            placeholder="Enter email"
            className="flex-1 bg-white/20 border-none text-white placeholder:text-primary-100 focus:ring-0 focus:border-primary-500 rounded-r-none"
          />
          <Button className="bg-white text-primary-800 hover:bg-gray-100 rounded-l-none px-6 py-2">SUBSCRIBE</Button>
        </div>
      </div>
    </section>
  )
}
