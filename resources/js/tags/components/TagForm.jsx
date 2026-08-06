import { useState } from 'react';
import { useCreateTagMutation } from '../tagsApi';

export default function TagForm() {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const [createTag, { isLoading }] = useCreateTagMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) return;
        setError('');

        try {
            await createTag({ name }).unwrap();
            setName('');
        } catch (err) {
            setError(err?.data?.data?.name?.[0] ?? err?.data?.message ?? 'Erreur lors de la création du tag.');
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">Add a tag</h2>

            <form onSubmit={handleSubmit} className="space-y-2">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="New tag name"
                    className="border rounded px-3 py-1 text-sm w-full"
                />
                <button type="submit" disabled={isLoading} className="bg-blue-500 text-white px-4 py-2">
                    {isLoading ? 'Adding...' : 'Add Tag'}
                </button>
            </form>

            {error && <div className="text-red-500 text-xs">{error}</div>}
        </div>
    );
}
