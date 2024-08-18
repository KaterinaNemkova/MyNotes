import axios from "axios"

export const fetchNotes=async(filter)=>{
    try{
        var response=await axios.get("http://localhost:5173/Notes",{
            params:{
                search:filter?.search,
                sortItem:filter?.sortItem,
                sortOrder:filter?.sortOrder,
            },
        });
        return response.data.notes;
    }
    catch(e){
        console.error(e);
    }
    
    
}

export const createNote=async(note)=>{
    try{
        var response=await axios.post("http://localhost:5173/Notes",note);
        return response.status;
    }
    catch(e){
        console.error(e);
    }
    
    
}

export const deleteNote=async(id)=>{
    try{
        var response= await axios.delete(`http://localhost:5173/Notes/${id}`);
        return response.status;
    }
    catch(e){
        console.error(e);
    }

}

export const updateNote=async(id,note)=>{
    try{var response= await axios.put(`http://localhost:5173/Notes/${id}`,note);
    return response.status;

    }
    catch(e){
        console.error(e);
    }
}
