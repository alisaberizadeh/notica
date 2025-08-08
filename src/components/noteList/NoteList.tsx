"use client"
import React, { useContext, useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import Note from '../note/Note'
import { INote } from '@/types/Types';
import { NoteContext } from '@/contexts/NoteContext';

function NoteList() {
    const {notes} = useContext(NoteContext)

    return (
        <div className="col-span-1 min-h-full shadow-2xl  px-10 py-10 overflow-y-scroll">
            <p className="text-4xl mb-3  text-black ">Notes</p>
            <div className="flex mb-5">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                    <CiSearch className="text-lg" />
                </span>
                <input type="text" className="rounded-none rounded-e-lg bg-white border text-gray-900  block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 outline-0 " placeholder="Search..." />
            </div>
            {notes.length <= 0 ? "There are no notes..." : notes.map((item:INote , index:number)=> (
                <Note key={index} title={item.title} note={item.note} color={item.color} date={item.date} id={item.id} password={item.password} />
            ))}

        </div>
    )
}

export default NoteList