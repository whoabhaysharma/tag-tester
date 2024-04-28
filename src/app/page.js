"use client"
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { tagType } from "./tagTester/page";

export default function Home() {
  const [tag, setTag] = useState("")
  const [selectedType, setSelectedtype] = useState(tagType.NORMAL)
  const [dim, setDim] = useState({width : 300, height : 250})
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])
  
  function dimensionUpdateHandler(value = 0, type) {
    const parsedValue = parseInt(value)
    if (parsedValue < 0) return
    setDim(prev => {
      return {
        ...prev,
        [type] : value
      }
    })
  }

  return (
    <>
      <div className="flex gap-5 flex-col">
        <div className="flex gap-5 flex-row">
          <input
            ref={inputRef}
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="text-black bg-slate-200 px-5 py-2 rounded-md"
          />

          <select
            value={selectedType}
            onChange={e => setSelectedtype(e.target.value)}
            className="px-4 py-1 rounded-md appearance-none"
          >
            <option value={tagType.NORMAL}>Normal</option>
            <option value={tagType.IFRAME}>Iframe</option>
            <option value={tagType.ONE_CROSS_ONE}>One X One</option>
          </select>

          <Link href={`/tagTester?tag=${tag}&type=${selectedType}&h=${dim.height}&w=${dim.width}`} target="_blank">
            <button
              className="bg-slate-400 px-5 py-2 rounded-md w-full"
            >Test</button>
          </Link>
        </div>
        {selectedType === tagType.IFRAME && (
          <div className="flex flex-row gap-2">
            <input
              placeholder="Width"
              type="number"
              value={dim.width}
              onChange={e => dimensionUpdateHandler(e.target.value, "width")}
              className="text-black bg-slate-200 px-5 py-2 rounded-md"
            >
            </input>
            <input
              placeholder="Height"
              type="number"
              value={dim.height}
              onChange={e => dimensionUpdateHandler(e.target.value, "height")}
              className="text-black bg-slate-200 px-5 py-2 rounded-md"
            >
            </input>
          </div>
        )}
      </div>
    </>
  );
}