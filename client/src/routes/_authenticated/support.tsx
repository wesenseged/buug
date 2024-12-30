import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BookOpen, Cable, CircleHelp, Flame, Mail, Send, Star, X } from 'lucide-react';
import useMainStore from '@/store/mainStore';

export const Route = createFileRoute('/_authenticated/support')({
  component: RouteComponent,
})

const collections = [
  {
    title: "Getting Started",
    amh: "እንደ መጀመር",
    icon: <Cable />,
    desc: "Start off on the right foot!",
  },

  {
    title: "Introduction",
    amh: "መግቢያ",
    icon: <Star />,
    desc: "",
  },
  {
    title: "What's new?",
    amh:"ምን አዲስ ነገር አለ",
    icon: <Flame />,
    desc: "",
  },
  {
    title: "Guide",
    amh:"መመሪያ",
    icon: <BookOpen />,
    desc: "",
  },
  {
    title: "F.A.Q",
    amh: "የሚጠየቁ ጥያቄዎች",
    icon: <CircleHelp />,
    desc: "All you can eat sef-sevre problem solving",
  },
]

function RouteComponent() {
  const mainStore = useMainStore()
  return (
    <div className='w-full h-screen space-y-4 flex flex-col justify-center'>
     <h1 className='text-5xl '>{mainStore.toggleLanguage ? "Need help? We've got your back":"እርዳታ ይፈልጋሉ? እኛ እንረዳዎታለን"} </h1>
     <p className='text-2xl text-gray-500'>{mainStore.toggleLanguage ? "Perhaps you can find the answers in our collections":"ምናልባት መልሱን በእኛ ስብስቦች ውስጥ ማግኘት ይችላሉ።"}</p>
     <section className='flex flex-row justify-between mx-10'>
     <div>
        {
          collections.map((coll,index) => {
            return (
              <div className='grid '>
                
            <Card key={index} className="w-96 my-5">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardDescription className="text-xl">
                {mainStore.toggleLanguage ? coll.title:coll.amh}
                </CardDescription>
                <div>
                {coll.icon}
                </div>
              </CardHeader>
              <CardFooter className="flex flex-col items-start">
                <p className="text-sm text-zinc-500">{coll.desc}</p>
              </CardFooter>
            </Card>

              </div>

            )
          })
        }
     </div>
     <div className='flex flex-col space-y-5'>
      
        <h1 className='text-xl'>{mainStore.toggleLanguage?"Other ways to find help:":"እርዳታ ለማግኘት ሌሎች መንገዶች፡-"}</h1>
        <div className='flex space-x-5'>
           <a href="https://x.com/wesenseged_" target='_blank'><X size={40} className='hover:scale-105'/></a>
           <Mail size={40} className='hover:scale-105'/>
           <a href="https://t.me/@aeven0" target="_blank"><Send size={40} className='hover:scale-105'/></a>
        </div>
     </div>
    </section>
     </div>
  )
}
