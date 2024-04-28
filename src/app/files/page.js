"use client"
import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js';

const supabase = createClient("https://xdssseipyhntvxsezgcu.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhkc3NzZWlweWhudHZ4c2V6Z2N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQyODc1ODgsImV4cCI6MjAyOTg2MzU4OH0.c94jSEf7BGUf7m5OkH0MMh4Ci-yap0FJ7ZwPDFua6hE")

function Files() {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [downloadURL, setDownloadURL] = useState(null);
    const [loading, setLoading] = useState(false)
    const [activeType, setActiveType] = useState("content")
    const [list, setlist] = useState([])

    const [name, setName] = useState("")
    const [content, setContent] = useState("")

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        } else {
            setError('Please select a file');
        }
    };

    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault();            
        }
        setError(null);
        try {
            if (file || name) {
                setLoading(true)
                const { data, error } = await supabase
                    .storage
                    .from('test')
                    .upload(activeType === "files" ? `public/${file.name}` : name, activeType === "files" ? file : content, {
                        cacheControl: '3600',
                        upsert: false
                    })  
                console.log(data, 'DATAAA')
                const path = data.path
                const urlDataResp = await supabase.storage.from("test").getPublicUrl(path)
                setDownloadURL(urlDataResp?.data?.publicUrl)
                setLoading(false)
            } else {
                setError('Please select a file');
            }
        } catch (err) {
            setLoading(false)
            console.error('Error uploading file', err);
            setError(err.message);
        }
    };

    return (
        <div className='w-6/12'>
            <div role="tablist" class="tabs tabs-boxed w-2/4 mx-auto m-5">
                <a role="content" class={`tab ${activeType === "content" ? "tab-active" : ""}`} onClick={() => setActiveType("content")}>Content</a>
                <a role="files" class={`tab ${activeType === "files" ? "tab-active" : ""}`} onClick={() => setActiveType("files")}>Files</a>
            </div>

            {activeType === "files" && (
                <>
                    <div className='w-full flex flex-row justify-center'>
                        <form onSubmit={handleSubmit} className='flex flex-col'>
                            <input type="file" className="file-input w-full max-w-xs" onChange={handleChange} />
                            <button className='btn btn-primary m-4' type="submit">
                                Upload {loading && <span className="loading loading-spinner loading-md"></span>}
                            </button>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                    {downloadURL && (
                        <div>
                            <p><a target='_blank' href={downloadURL}>{downloadURL}</a></p>
                        </div>
                    )}
                </>
            )}

            {activeType === "content" && (
                <div className='w-full flex flex-col gap-3'>
                    <input onChange={(e)=> setName(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    <textarea onChange={(e) => setContent(e.target.value)} className="textarea textarea-bordered w-full max-h-96" placeholder="Bio"></textarea>
                    <button onClick={handleSubmit} className="btn btn-primary">
                        Push {loading && <span className="loading loading-spinner loading-md"></span>}
                    </button>

                    {downloadURL && (
                        <div>
                            <p><a target='_blank' href={downloadURL}>{downloadURL}</a></p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Files