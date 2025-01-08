import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BookOpen,House, Cable, CircleHelp, Flame, Github, Mail, Star, X } from 'lucide-react';
import useMainStore from '@/store/mainStore';

export const Route = createFileRoute('/_authenticated/support')({
  component: RouteComponent,
})

const collections = [
  {
    title: "Getting Started",
    link: "https://buug-doc.netlify.app/",
    amh: "እንደ መጀመር",
    icon: <Cable />,
    desc: "Learn how to set up and get started with Buug. Explore the basics and kickstart your productivity journey.",
  },
  {
    title: "Introduction",
    link: "https://buug-doc.netlify.app/intro",
    amh: "መግቢያ",
    icon: <Star />,
    desc: "An overview of Buug's features and benefits. Understand how this app revolutionizes productivity.",
  },
  {
    title: "What's new?",
    link: "https://buug-doc.netlify.app/new",
    amh: "ምን አዲስ ነገር አለ",
    icon: <Flame />,
    desc: "Discover the latest updates and features in Buug. Stay up-to-date with improvements and new functionalities.",
  },
  {
    title: "Installation",
    link: "https://buug-doc.netlify.app/installation",
    amh: "መጫን",
    icon: <House />,
    desc: "Step-by-step instructions to install Buug. Set up the app quickly on your device.",
  },
  {
    title: "Markdown",
    link: "https://buug-doc.netlify.app/Markdown",
    amh: "ማርክዶውን",
    icon: <BookOpen />,
    desc: "A comprehensive guide to Markdown. Learn syntax and tips to create rich, formatted notes.",
  },
  {
    title: "F.A.Q",
    link: "https://buug-doc.netlify.app/faq",
    amh: "የሚጠየቁ ጥያቄዎች",
    icon: <CircleHelp />,
    desc: "Answers to frequently asked questions about Buug. Find solutions to common issues and queries.",
  },
];


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
                
              <a href={coll.link} target="_blank">

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
              </a>

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
           <a href="https://github.com/wesenseged/buug" target="_blank"><Github size={40} className='hover:scale-105'/></a>
        </div>
     </div>
    </section>
     </div>
  )
}
