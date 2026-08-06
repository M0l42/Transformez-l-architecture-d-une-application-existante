import { createRoot } from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './shared/store';
import NoteList from './notes/components/NoteList';
import NoteForm from './notes/components/NoteForm';
import TagForm from './tags/components/TagForm';
import LoginForm from './auth/components/LoginForm';
import { logout, selectCurrentUser, selectIsAuthenticated } from './auth/authSlice';
import { useLogoutMutation } from './auth/authApi';

function App() {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const [logoutRequest] = useLogoutMutation();

    if (!isAuthenticated) {
        return <LoginForm />;
    }

    const handleLogout = async () => {
        try {
            await logoutRequest().unwrap();
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(logout());
        }
    };

    return (
        <div>
            <div className="flex justify-end items-center gap-4 mb-4">
                {user && <span>Connecté en tant que {user.name}</span>}
                <button onClick={handleLogout}>Se déconnecter</button>
            </div>
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
