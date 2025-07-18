"use client"
import { NoteContext } from '@/contexts/NoteContext'
import { INote } from '@/types/Types'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { CiCircleCheck, CiLock, CiPickerHalf } from 'react-icons/ci'
import Swal from 'sweetalert2'

function NewNote() {
  const titleRef = useRef<HTMLInputElement>(null)
  const noteRef = useRef<HTMLTextAreaElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const [color, setcolor] = useState<string>("")
  const { notes, save } = useContext(NoteContext)

  const handleSave = () => {
    const title = titleRef.current!.value
    const note = noteRef.current!.value
    const password = passwordRef.current!.value
    save(title, note, password, color)
    if (titleRef.current) titleRef.current.value = "";
    if (noteRef.current) noteRef.current.value = "";
    if (passwordRef.current) passwordRef.current.value = "";
    setcolor("");





  }

  return (
    <div className="col-span-1 min-h-full shadow-2xl px-10 pt-10">
      <form>
        <p className="text-4xl mb-10">New Note</p>

        <p className="text-gray-500 mb-3 flex items-center"> Title : </p>
        <input
          type="text"
          name="title"
          ref={titleRef}
          className="w-full border border-gray-200 py-1 px-5 outline-0 rounded-lg text-lg mb-5"
        />

        <p className="text-gray-500 mb-3 flex items-center"> Note : </p>
        <textarea
          name="text"
          ref={noteRef}
          className="w-full h-52 border border-gray-200 py-2 px-5 outline-0 text-lg rounded-lg mb-5 resize-none"
        ></textarea>

        <p className="text-gray-500 mb-3 flex items-center">
          <CiPickerHalf className="mr-1" />
          Please select the color :
        </p>

        <div className="grid grid-cols-6 gap-5 h-7 mb-6">
          <div onClick={() => setcolor("bg-red-100")} className="col-span-1 bg-red-100 rounded-md cursor-pointer flex items-center justify-center">{color === "bg-red-100" ? <CiCircleCheck /> : ""}</div>
          <div onClick={() => setcolor("bg-green-100")} className="col-span-1 bg-green-100 rounded-md cursor-pointer flex items-center justify-center">{color === "bg-green-100" ? <CiCircleCheck /> : ""}</div>
          <div onClick={() => setcolor("bg-blue-100")} className="col-span-1 bg-blue-100 rounded-md cursor-pointer flex items-center justify-center">{color === "bg-blue-100" ? <CiCircleCheck /> : ""}</div>
          <div onClick={() => setcolor("bg-fuchsia-100")} className="col-span-1 bg-fuchsia-100 rounded-md cursor-pointer flex items-center justify-center">{color === "bg-fuchsia-100" ? <CiCircleCheck /> : ""}</div>
          <div onClick={() => setcolor("bg-gray-200")} className="col-span-1 bg-gray-200 rounded-md cursor-pointer flex items-center justify-center">{color === "bg-gray-200" ? <CiCircleCheck /> : ""}</div>
          <div onClick={() => setcolor("bg-white")} className="col-span-1 bg-white border border-gray-200 rounded-md cursor-pointer flex items-center justify-center">{color === "bg-white" ? <CiCircleCheck /> : ""}</div>
        </div>

        <p className="text-gray-500 mb-3 flex items-center">
          <CiLock className="mr-1" />
          Is this note locked ? Enter the password :
        </p>

        <input
          type="password"
          name="password"
          ref={passwordRef}
          className="w-full border border-gray-200 py-1 px-5 outline-0 rounded-lg text-lg mb-6"
        />

        <button
          type="button"
          onClick={handleSave}
          className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 mb-2 py-2 cursor-pointer rounded-md"
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default NewNote
