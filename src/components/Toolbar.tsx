import { Link, useNavigate } from "react-router-dom";
import { IPost } from "../model/IPost";

interface IToolbar {
    onEdit: () => void;
    onDelete: () => void;
    
    }

export default function Toolbar ({onEdit, onDelete} : IToolbar) {

 


    const handleEdit = (event : any) => {
        event.preventDefault();
        onEdit();
        
    };

        const handleDelete = (event : any) => {
        event.preventDefault();
        onDelete();
    
    };


    return (
        <div className="flex gap-2">
         <button onClick={handleEdit} className="p-1 text-white text-center w-20 bg-blue-500 rounded-md hover:bg-blue-300">Edit</button>
         <button onClick={handleDelete} className="p-1 text-white text-center w-20 bg-red-500 rounded-md hover:bg-red-300">Delete</button>
        </div>

    )
}
 