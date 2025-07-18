"use client"
import { NoteContext } from '@/contexts/NoteContext'
import { INote } from '@/types/Types'
import React, { useContext, useRef, useState } from 'react'
import { CiCircleCheck, CiCircleRemove, CiEdit, CiLock, CiPickerHalf, CiRead, CiTrash } from 'react-icons/ci'
import { FaCheese, FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'


function Note(props: INote) {
    const [read, setread] = useState<boolean>(false)
    const [edit, setedit] = useState<boolean>(false)
    const [lock, setlock] = useState<boolean>(props.password === "" ? false : true)
    const lockPasswordRef = useRef<HTMLInputElement>(null)
    const [error, seterror] = useState("")
    const titleRef = useRef<HTMLInputElement>(null)
    const noteRef = useRef<HTMLTextAreaElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const { notes , update ,remove} = useContext(NoteContext)

    const [color, setcolor] = useState<string>(props.color)
    const handleLock = () => {
        if (lockPasswordRef.current?.value == props.password) {
            setlock(false)
        }
        else {
            seterror("The password is incorrect !!!")
        }
    }


    const handleSave = () => {
        const title = titleRef.current!.value
        const note = noteRef.current!.value
        const password = passwordRef.current!.value
        const id = props.id
        const updatedData = notes.map((item: any) =>
            item.id === id
                ? {
                    ...item,
                    title,
                    note,
                    color,
                    password
                }
                : item
        );
        update(updatedData)
        setedit(false)
    }

    const handleDelete = (id:number) => {
        remove(id)
        
    }

    return (
        <div className={`w-full px-5 py-3 ${props.color} rounded-md cursor-pointer mb-2 flex items-center justify-between `}>
            <span className='flex items-center'>{props.password != "" ? <CiLock className='mr-1' /> : ""} {props.title}</span>
            <div className='flex'>
                <p onClick={()=>handleDelete(props.id)} className='w-8 h-8  flex items-center justify-center text-xl ml-2 	 hover:text-red-600'><CiTrash /></p>
                <p onClick={() => setedit(true)} className='w-8 h-8  flex items-center justify-center  text-xl ml-2 hover:text-green-600'><CiEdit /></p>
                <p onClick={() => setread(true)} className='w-8 h-8  flex items-center justify-center text-xl  ml-2  hover:text-blue-600'><CiRead /></p>
            </div>

            {read && (
                <div className='w-full h-screen absolute bg-white left-0 top-0 flex flex-col items-center justify-center '>
                    {lock && (
                        <div className='w-2/6'>
                            <p className="text-gray-500 mb-3 flex items-center"><CiLock className='mr-1' />  Enter the password : </p>
                            <p className="text-red-700 mb-3 flex items-center justify-center ">  {error} </p>
                            <input type="password" ref={lockPasswordRef} name="password" className=" w-full border border-gray-200 py-1 px-5 outline-0 rounded-lg text-lg mb-5" />
                            <button onClick={handleLock} className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 mb-2 py-2 cursor-pointer rounded-md">
                                Open
                            </button>
                            <button onClick={() => setread(false)} className="w-full text-white bg-gray-400   mb-2 py-2 cursor-pointer rounded-md">
                                Back
                            </button>
                        </div>
                    )}
                    {!lock && (
                        <div className='w-2/6'>
                            Note :
                            <p className={`text-justify leading-[2]  ${props.color}   border border-gray-300 p-10 rounded-lg mt-2 mb-5`}>
                                {props.note}
                            </p>
                            <button onClick={() => setread(false)} className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 mb-2 py-2 cursor-pointer rounded-md">
                                Back
                            </button>
                        </div>
                    )}
                </div>
            )}
            {edit && (
                <div className='w-full h-screen absolute bg-white left-0 top-0 flex flex-col items-center justify-center '>
                    {lock && (
                        <div className='w-2/6'>
                            <p className="text-gray-500 mb-3 flex items-center"><CiLock className='mr-1' />  Enter the password : </p>
                            <p className="text-red-700 mb-3 flex items-center justify-center ">  {error} </p>
                            <input type="password" ref={lockPasswordRef} name="password" className=" w-full border border-gray-200 py-1 px-5 outline-0 rounded-lg text-lg mb-5" />
                            <button onClick={handleLock} className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 mb-2 py-2 cursor-pointer rounded-md">
                                Open
                            </button>
                            <button onClick={() => setedit(false)} className="w-full text-white bg-gray-400   mb-2 py-2 cursor-pointer rounded-md">
                                Back
                            </button>
                        </div>
                    )}
                    {!lock && (
                        <div className='w-2/6'>
                            <form>
                                <p className="text-4xl mb-10">"{props.title}" Update</p>

                                <p className="text-gray-500 mb-3 flex items-center"> Title : </p>
                                <input
                                    type="text"
                                    name="title"
                                    ref={titleRef}
                                    defaultValue={props.title}
                                    className="w-full border border-gray-200 py-1 px-5 outline-0 rounded-lg text-lg mb-5"
                                />

                                <p className="text-gray-500 mb-3 flex items-center"> Note : </p>
                                <textarea
                                    name="text"
                                    ref={noteRef}
                                    className="w-full h-44 border border-gray-200 py-2 px-5 outline-0 text-lg rounded-lg mb-5 resize-none"
                                    defaultValue={props.note}
                                ></textarea>

                                <p className="text-gray-500 mb-3 flex items-center">
                                    <CiPickerHalf className="mr-1" />
                                    Please select the color :
                                </p>

                                <div className="grid grid-cols-6 gap-5 h-7 mb-6">
                                    <div onClick={() => setcolor("bg-red-100")} className="col-span-1 bg-red-100 rounded-md cursor-pointer flex items-center justify-center">{color === "bg-red-100"  ? <CiCircleCheck /> : ""}</div>
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
                                    defaultValue={props.password}
                                    className="w-full border border-gray-200 py-1 px-5 outline-0 rounded-lg text-lg mb-6"
                                />

                                <button
                                    onClick={handleSave}
                                    type="button"
                                    className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 mb-2 py-2 cursor-pointer rounded-md"
                                >
                                    Update
                                </button>
                                <button onClick={() => setedit(false)} className="w-full text-white bg-gray-400   mb-2 py-2 cursor-pointer rounded-md">
                                    Back
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Note