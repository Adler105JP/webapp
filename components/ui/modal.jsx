import React from 'react'

export default function Modal({ isOpen, children }) {
    if (!isOpen) return null;  // Render nothing if the modal is closed
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-xl shadow-lg">
            {children}
        </div>
        </div>
    )
}
