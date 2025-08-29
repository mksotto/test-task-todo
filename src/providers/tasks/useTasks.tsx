import type { Dispatch, SetStateAction } from 'react';
import type { TTask } from '@/types/types';
import { createContext, use } from 'react';

export type TTasksContext = {
    tasks: TTask[];
    setTasks: Dispatch<SetStateAction<TTask[]>>;
    add: (title: TTask['title']) => void;
    toggleCompleted: (task: TTask, completed: boolean) => void;
    remove: (task: TTask) => void;
    removeCompleted: VoidFunction;
};

export const TasksContext = createContext<TTasksContext | null>(null);

export const useTasks = () => {
    const context = use(TasksContext);
    if (!context) {
        throw new Error('useTasks must be used within a TasksProvider');
    }

    return context;
};
