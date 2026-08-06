import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './shared/store';
import NoteList from './notes/components/NoteList';
import NoteForm from './notes/components/NoteForm';
import TagForm from './tags/components/TagForm';

function App() {
    return (
        <div>
            <TagForm />
            <NoteForm />
            <NoteList />
        </div>
    );
}

const container = document.getElementById('app');

if (container) {
    createRoot(container).render(
        <Provider store={store}>
            <App />
        </Provider>
    );
}
