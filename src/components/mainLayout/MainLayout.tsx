"use client"
import { NoteProvider } from '@/contexts/NoteContext'
import React from 'react'

function MainLayout(props: { children: React.ReactNode }) {
    return (
            <NoteProvider>
                {props.children}
            </NoteProvider>
    )
}

export default MainLayout