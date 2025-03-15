import React from "react";

interface DeleteConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
 
}

function DeleteConfirmation({ isOpen, onClose, onDelete }: DeleteConfirmationProps ){
  if (!isOpen) return null; // Prevents rendering when closed

  return (
   <>
  <div className="fixed inset-0 flex items-center justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg ">
        <h2 className="text-lg font-semibold">Are you sure you want to delete post?</h2>
        <div className="flex justify-center gap-8 mt-4">
          <button 
           onClick={onClose}
             className="w-20 p-2 bg-gray-300 rounded-lg hover:bg-green-400"
          >
            Cancel
          </button>
          <button 
            onClick={onDelete} 
            className="w-20   bg-red-600 text-white rounded-lg hover:bg-green-400"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
   </>
  );
};

export default DeleteConfirmation;