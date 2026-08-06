import { useState } from 'react';
import { useCreateNoteMutation } from '../notesApi';
import { useGetTagsQuery } from '../../tags/tagsApi';

export default function NoteForm() {
    const [text, setText] = useState('');
    const [tagId, setTagId] = useState('');

    const { data: tags } = useGetTagsQuery();
    const [createNote, { isLoading }] = useCreateNoteMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text || !tagId) return;
        try {
            await createNote({ text, tag_id: Number(tagId) }).unwrap();
            setText('');
            setTagId('');
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la création de la note.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your note..."
                className="w-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white p-2"
            />

            <select
                value={tagId}
                onChange={(e) => setTagId(e.target.value)}
                className="w-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white p-2"
            >
                <option value="">-- Select Tag --</option>
                {tags?.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                        {tag.name}
                    </option>
                ))}
            </select>

            <button type="submit" disabled={isLoading} className="bg-blue-500 text-white px-4 py-2">
                {isLoading ? 'Adding...' : 'Add Note'}
            </button>
        </form>
    );
}
