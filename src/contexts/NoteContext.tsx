"use client";

import { INote } from "@/types/Types";
import React, { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

interface INoteContext {
  notes: INote[];
  save: (title: string, note: string, password: string, color: string) => void;
  update: (data: INote[]) => void
  remove: (id: number) => void
}

export const NoteContext = createContext({} as INoteContext);

export function NoteProvider({ children }: { children: React.ReactNode }) {
  const [notes, setnotes] = useState<INote[]>([]);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setnotes(JSON.parse(savedNotes));
    }
  }, []);

  const save = (title: string, note: string, password: string, color: string) => {
    const date = new Date();

    const data: INote = {
      id: notes.length + 1,
      title,
      note,
      color,
      password,
      date: date.toISOString().split("T")[0],
    };

    const updateNotes = [...notes, data];
    localStorage.setItem("notes", JSON.stringify(updateNotes));
    setnotes(updateNotes);

    Swal.fire({
      title: "Success!",
      text: "New note saved.",
      icon: "success",
      confirmButtonText: "Ok",
    });
  };

  const update = (data: INote[]) => {
    localStorage.setItem("notes", JSON.stringify(data));
    setnotes(data);

    Swal.fire({
      title: "Success!",
      text: "Updated.",
      icon: "success",
      confirmButtonText: "Ok",
    });
  }

  const remove = (id: number) => {
    const filteredData = notes.filter((item: any) => item.id !== id);
    localStorage.setItem("notes", JSON.stringify(filteredData));
    setnotes(filteredData);

    Swal.fire({
      title: "Success!",
      text: "Deleted.",
      icon: "success",
      confirmButtonText: "Ok",
    });
  }

  return <NoteContext.Provider value={{ notes, save, update, remove }}>{children}</NoteContext.Provider>;
}
