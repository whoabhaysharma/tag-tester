"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

function Template({ children }) {
    const [active, setActive] = useState(false)
    const router = useRouter()

    return (
        <div className='w-full h-dvh flex flex-col'>
            <div className='w-full'>
                <div class="navbar bg-base-100">
                    <div class="flex-none">
                        <button class="btn btn-square btn-ghost" onClick={() => setActive(!active)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>
                    </div>
                    <div class="flex-1">
                        <a onClick={()=> router.push("/", {scroll : false})} class="btn btn-ghost text-xl">Pf Tester</a>
                    </div>
                </div>
            </div>
            <div className='flex flex-1'>
                <div className={active ? "block" : "hidden"}>
                    <ul className="menu bg-base-200 w-56 rounded-box">
                        <li>
                            <a onClick={() => {
                                router.push("/", {scroll : false})
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                Home
                            </a>
                        </li>
                        <li>
                            <a onClick={() => {
                                router.push('/files', { scroll: false })
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Storage
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='flex flex-1 justify-center'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Template