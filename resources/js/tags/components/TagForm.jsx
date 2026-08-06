import { useState } from 'react';
import { useCreateTagMutation } from '../tagsApi';

export default function TagForm() {
    const [name, setName] = useState('');

    const [createTag, { isLoading }] = useCreateTagMutation();

    const handleSubmit = async () => {
        if (!name) return;
        try {
            await createTag({ name }).unwrap();
            setName('');
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la création du tag.");
        }
    };

    return (
        <div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom du tag..."
            />
            <button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? 'Création...' : 'Créer le tag'}
            </button>
        </div>
    );
}
