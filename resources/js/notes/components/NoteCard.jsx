import { useDeleteNoteMutation } from '../notesApi';
import TrashIcon from '../../shared/icons/TrashIcon';

export default function NoteCard({ note }) {
    const [deleteNote, { isLoading }] = useDeleteNoteMutation();

    const handleDelete = async () => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
            try {
                await deleteNote(note.id).unwrap();
            } catch (error) {
                console.error('Erreur lors de la suppression de la note :', error);
                alert('Erreur lors de la suppression de la note.');
            }
        }
    };

    return (
        <div className="border p-3 flex justify-between items-start">
            <div>
                <p>{note.text}</p>
                <small className="text-gray-500">Tag: {note.tag?.name ?? '—'}</small>
            </div>
            <button
                onClick={handleDelete}
                disabled={isLoading}
                className="inline-flex items-center gap-1 border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 text-sm px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-950 disabled:opacity-50"
            >
                <TrashIcon className="w-4 h-4" />
                {isLoading ? 'Deleting...' : 'Delete'}
            </button>
        </div>
    );
}
