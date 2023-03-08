import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Head from "next/head";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [yt, setYt] = useState("");
  const [generatedTLDR, setGeneratedTLDR] = useState<any>("");

  const generateTLDR = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("i need python lmao cause im lazy", {
      method: "POST",
      body: JSON.stringify({
        yt,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = res.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedTLDR(chunkValue);
    }
    setLoading(false);
  }
  return (
    <>
      <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen bg-salmon">
        <main className='flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20'>
          <div className='shadow-[0_20px_50px_rgba(250,_128,_114,_0.7)] p-8 w-full bg-[#000] bg-opacity-30 rounded-lg flex flex-col items-center justify-start font-karla'>
            <h1 className='text-4xl md:text-6xl font-bold text-slate-900'>
              Youtube TLDR
            </h1>
            <p className='mt-3 text-lg md:text-2xl text-slate-600 text-black'>
              A simple tool to summarize YouTube videos.
            </p>
            <div className='max-w-xl w-full mt-10'>
              <input 
                value={yt}
                className='px-3 py-4 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-lg border-0 shadow outline-none focus:outline-none focus:ring w-full' 
                type="text" 
                placeholder='https://youtube.com/watch'
              />
              <div className='mt-3'>
                <button
                  type='button'
                  className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 w-full md:w-auto'
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
          <ResizablePanel>
            <AnimatePresence mode="wait">
              <motion.div className="space-y-6 my-6 md:my-10 max-w-xl w-full">
                {generatedTLDR && (
                  <>
                    <div>
                      <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mx-auto">
                        Summary
                      </h2>
                    </div>
                    <div className="space-y-4 flex flex-col items-center justify-center">
                      <p className="text-lg md:text-xl">{generatedTLDR}</p>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </ResizablePanel>
        </main>
      </div>
    </>
  )  
}