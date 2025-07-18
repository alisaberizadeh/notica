import NewNote from "@/components/newNote/NewNote"
import Note from "@/components/note/Note";
import NoteList from "@/components/noteList/NoteList";
import { CiSearch } from "react-icons/ci";

export default function Home() {
  return (

    <div className="h-screen w-4/5 m-auto  grid grid-cols-2 gap-5">



      <NewNote />

      <NoteList />

    </div>
  );
}
