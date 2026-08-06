import { useState } from 'react';
import { useLoginMutation } from '../authApi';

// Not reachable from normal navigation right now: /login still goes through
// the Livewire Volt page, because the sidebar and the dashboard route are
// gated behind a real Laravel session, which this token-only API login
// doesn't create. This stays mounted as the fallback #app renders if it
// ever loads without a bootstrapped token, and as groundwork for moving
// /login to React once the session/token bridging story is worked out.
export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [login, { isLoading }] = useLoginMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login({ email, password }).unwrap();
        } catch (err) {
            setError(err?.data?.message || 'Identifiants invalides.');
        }
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
            <div className="w-full max-w-sm p-4 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900">
                <div className="flex w-full flex-col text-center mb-6">
                    <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">
                        Connexion à votre compte
                    </h1>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        Entrez votre email et votre mot de passe pour vous connecter
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Adresse email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoFocus
                            autoComplete="email"
                            placeholder="email@example.com"
                            className="w-full border rounded-md px-3 py-2 text-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            placeholder="Mot de passe"
                            className="w-full border rounded-md px-3 py-2 text-sm"
                        />
                    </div>

                    {error && <div className="text-red-600 text-sm text-center">{error}</div>}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-md px-4 py-2 text-sm font-medium"
                    >
                        {isLoading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>
            </div>
        </div>
    );
}
