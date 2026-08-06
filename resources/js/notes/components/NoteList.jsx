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
        <ul>
            {data?.map((note) => (
                <li key={note.id}>
                    <NoteCard note={note} />
                </li>
            ))}
        </ul>
    );
}
