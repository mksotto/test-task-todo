import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import type { TTask } from '@/types/types';
import { createContext, use, useCallback, useMemo, useState } from 'react';
import { LOCAL_STORAGE_KEY } from '@/constants/constants';
import { generateId } from '@/utils/generateId';

type TTasksContext = {
    tasks: TTask[];
    setTasks: Dispatch<SetStateAction<TTask[]>>;
    add: (title: TTask['title']) => void;
    toggleCompleted: (task: TTask, completed: boolean) => void;
    remove: (task: TTask) => void;
    removeCompleted: VoidFunction;
};

const TasksContext = createContext<TTasksContext | null>(null);

const useTasks = () => {
    const context = use(TasksContext);
    if (!context) {
        throw new Error('useTasks must be used within a TasksProvider');
    }

    return context;
};

const TasksProvider = ({ children }: PropsWithChildren) => {
    const [tasks, setTasks] = useState<TTask[]>(() => (
        localStorage.getItem(LOCAL_STORAGE_KEY)
            ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) as string) as TTask[]
            : []
    ));

    const updateTasks = useCallback((updater: SetStateAction<TTask[]>) => {
        setTasks((prev) => {
            const newValue = typeof updater === 'function' ? updater(prev) : updater;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue));
            return newValue;
        });
    }, []);

    const add: TTasksContext['add'] = useCallback((title) => {
        const id = generateId();
        updateTasks(prev => [...prev, { title, completed: false, id }]);
    }, [updateTasks]);

    const toggleCompleted: TTasksContext['toggleCompleted'] = useCallback((task, value) => {
        updateTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: value } : t));
    }, [updateTasks]);

    const remove: TTasksContext['remove'] = useCallback((task) => {
        updateTasks(prev => prev.filter(t => t.id !== task.id));
    }, [updateTasks]);

    const removeCompleted: TTasksContext['removeCompleted'] = useCallback(() => {
        updateTasks(prev => prev.filter(t => !t.completed));
    }, [updateTasks]);

    const value = useMemo(() => ({
        tasks,
        setTasks: updateTasks,
        add,
        toggleCompleted,
        remove,
        removeCompleted
    }), [tasks, updateTasks, add, toggleCompleted, remove, removeCompleted]);

    return <TasksContext value={value}>{children}</TasksContext>;
};

export { TasksProvider, useTasks };
