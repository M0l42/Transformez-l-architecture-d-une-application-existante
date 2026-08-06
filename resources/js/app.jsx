import { createRoot } from 'react-dom/client';

function App() {
    return <div>React app</div>;
}

const container = document.getElementById('app');

if (container) {
    createRoot(container).render(<App />);
}
