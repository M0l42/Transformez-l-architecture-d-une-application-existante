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
        <div className="note-card">
            <p>{note.text}</p>
            <button onClick={handleDelete} disabled={isLoading}>
                {isLoading ? 'Suppression...' : 'Supprimer'}
            </button>
        </div>
    );
}
