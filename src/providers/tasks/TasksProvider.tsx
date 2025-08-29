import type { PropsWithChildren, SetStateAction } from 'react';
import type { TTasksContext } from '@/providers/tasks/useTasks';
import type { TTask } from '@/types/types';
import { useCallback, useMemo, useState } from 'react';
import { LOCAL_STORAGE_KEY } from '@/constants/constants';
import { TasksContext } from '@/providers/tasks/useTasks';
import { generateId } from '@/utils/generateId';

export const TasksProvider = ({ children }: PropsWithChildren) => {
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
