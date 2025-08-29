import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/App/App';
import { TasksProvider } from '@/providers/useTasks.tsx';
import '@/index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <TasksProvider>
            <App />
        </TasksProvider>
    </StrictMode>
);
