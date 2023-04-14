'use client';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [barcodeVal, setBarcodeVal] = useState("jspdfbarcode123")
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          API: &nbsp;
          <a href="/api/barcode?value=jspdfbarcode" target='_blank'><code className="font-mono font-bold">/api/barcode?value=jspdfbarcode</code></a>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 flex flex-col justify-center items-center gap-5">
        <h1 className='text-2xl'>JSPDF-BARCODE SERVER-SIDE EXAMPLE</h1>
        <label htmlFor="barcodeval">Barcode value: </label>
        <input className='text-black px-2' id='barcodeval' value={barcodeVal} onChange={e => setBarcodeVal(e.target.value)} />
        <a href={`/api/barcode?value=${barcodeVal}`} target='_blank'>
          <button className='border border-b-2 border-white px-3 py-2 rounded-md'>
            Generate Barcode
          </button>
        </a>
        <div className='flex gap-3'>
          <a href="https://www.npmjs.com/package/jspdf-barcode" target='_blank'>NPM</a>
          <a href="https://github.com/castrix/jspdf-barcode" target='_blank'>GITHUB</a>
        </div>
      </div>
    </main>
  )
}
