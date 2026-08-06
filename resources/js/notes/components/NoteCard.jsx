import { useDeleteNoteMutation } from '../notesApi';

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
            <button onClick={handleDelete} disabled={isLoading} className="text-red-500 text-sm">
                {isLoading ? 'Deleting...' : 'Delete'}
            </button>
        </div>
    );
}
