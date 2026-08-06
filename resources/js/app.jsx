import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { store } from './shared/store';
import NoteList from './notes/components/NoteList';
import NoteForm from './notes/components/NoteForm';
import TagForm from './tags/components/TagForm';
import LoginForm from './auth/components/LoginForm';
import { selectIsAuthenticated, setCredentials } from './auth/authSlice';

function App() {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (!isAuthenticated) {
        return <LoginForm />;
    }

    return (
        <>
            <div className="mt-6 p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900">
                <div className="space-y-4">
                    <NoteForm />
                    <hr />
                    <h2 className="text-xl font-bold">Your Notes</h2>
                    <NoteList />
                </div>
            </div>

            <div className="mt-6 p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900">
                <TagForm />
            </div>
        </>
    );
}

let root = null;

function mountApp() {
    const container = document.getElementById('app');
    if (!container) return;

    const bootstrapToken = container.dataset.token;
    if (bootstrapToken) {
        store.dispatch(setCredentials({ token: bootstrapToken, user: null }));
    }

    if (root) {
        root.unmount();
    }

    root = createRoot(container);
    root.render(
        <Provider store={store}>
            <App />
        </Provider>
    );
}

// wire:navigate swaps #app for a fresh DOM node without re-running this
// module script, so the mount has to be re-triggered on every Livewire
// client-side navigation (this event also fires on the initial page load).
mountApp();
document.addEventListener('livewire:navigated', mountApp);
