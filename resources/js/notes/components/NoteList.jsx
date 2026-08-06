import { useGetNotesQuery } from '../notesApi';
import NoteCard from "./NoteCard.jsx";

export default function NoteList() {
    const { data, isLoading, isError } = useGetNotesQuery();

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (isError) {
        return <div>Erreur lors du chargement des notes.</div>;
    }

    return (
        <div className="space-y-4">
            {data?.map((note) => (
                <NoteCard key={note.id} note={note} />
            ))}
        </div>
    );
}
