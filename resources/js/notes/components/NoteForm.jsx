import { useState } from 'react';
import { useCreateNoteMutation } from '../notesApi';
import { useGetTagsQuery } from '../../tags/tagsApi';

export default function NoteForm() {
    const [text, setText] = useState('');
    const [tagId, setTagId] = useState('');

    const { data: tags } = useGetTagsQuery();
    const [createNote, { isLoading }] = useCreateNoteMutation();

    const handleSubmit = async () => {
        if (!text || !tagId) return;
        try{
            await createNote({ text, tag_id: Number(tagId) }).unwrap();
            setText('');
            setTagId('');
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la création de la note.");
        }

    };

    return (
        <div>
            <select value={tagId} onChange={(e) => setTagId(e.target.value)}>
                <option value="">Select a tag</option>
                {tags?.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                        {tag.name}
                    </option>
                ))}
            </select>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your note..."
            />
            <button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Note'}
            </button>
        </div>
    );
}
