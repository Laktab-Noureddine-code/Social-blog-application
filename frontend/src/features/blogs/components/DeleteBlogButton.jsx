/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { deleteBlog } from '@/Redux/blogInteractionsSlice';
import api from '@/lib/api';

function DeleteBlogButton({ blog }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = async () => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce blog ?')) return;

        setIsDeleting(true);
        try {
            await api.delete(`/api/blogs/${blog.id}`);
            dispatch(deleteBlog(blog.id));
            // console.log('Blog supprimé avec succès');
            
        } catch (error) {
            console.error(error.response?.data?.message || 'Erreur lors de la suppression');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-800 transition-colors"
            title="Supprimer le blog"
        >
            <FaTrash className={isDeleting ? 'animate-pulse' : ''} />
        </button>
    );
}

export default DeleteBlogButton;