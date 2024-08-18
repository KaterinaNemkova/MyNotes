import { useEffect, useState } from 'react'
import CreateNoteForm from './Components/CreateNoteForm'
import EditNoteModal from './Components/EditNoteModal'
import Filters from './Components/Filters'
import Note from './Components/Note'
import { fetchNotes , createNote, deleteNote, updateNote} from './Services/notes'


function App() {

  const [notes,setNotes]=useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  const [filter,setFilter]=useState({
    search:"",
    sortItem:"date",
    sortOrder:"desc",
  });


  useEffect(()=>{
    const fetchData = async()=>{
      let notes = await fetchNotes(filter);
      setNotes(notes);
    };
      
      fetchData();
  },[filter] )

  const onCreate= async (note)=>{
    await createNote(note);
    let notes = await fetchNotes(filter);
    setNotes(notes);
  }

  const handleDelete=async (noteId)=>{
    
      await deleteNote(noteId); 
      const updatedNotes = await fetchNotes(filter);
      setNotes(updatedNotes); 

  }
  const handleEdit = (note) => {
    setCurrentNote(note);
    setModalOpen(true);
  };

  const onEditSave = async (updatedNote) => {
    await updateNote(currentNote.id, updatedNote);
    const updatedNotes = await fetchNotes(filter);
    setNotes(updatedNotes);
    setModalOpen(false);
    setCurrentNote(null);
  };


  return (
    <section className="p-8 flex flex-row justify-start items-start gap-12">
      <div className="flex flex-col w-1/3 gap-10">
        <CreateNoteForm onCreate={onCreate}/>
        <Filters filter={filter} setFilter={setFilter}/>
      </div>

      <ul className="flex flex-col gap-5 w-1/2">
        {notes.map((n)=>(
          <li key={n.id}>
            <Note 
              title={n.title} 
              description={n.description} 
              createdAt={n.createdAt}
              onDelete={()=>handleDelete(n.id)}
              onEdit={()=>handleEdit(n)}
            />
          </li>
        ))}
      </ul>
      {currentNote && (
        <EditNoteModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          note={currentNote}
          onSave={onEditSave}
        />
      )}
    </section>
    )
}


export default App
