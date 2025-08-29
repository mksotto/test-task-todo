import type { TTask } from '@/types/types.ts';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { TasksProvider, useTasks } from '@/providers/useTasks.tsx';

const mockTask: TTask = {
    id: '1',
    title: 'foo bar',
    completed: false
};

const mockTask2: TTask = {
    id: '2',
    title: 'bar foo',
    completed: true
};

const customRenderHook = () =>
    renderHook(useTasks, { wrapper: TasksProvider });

describe('useTasks', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should update tasks manually', () => {
        const { result } = customRenderHook();

        expect(result.current.tasks).toStrictEqual([]);

        act(() => result.current.setTasks([mockTask]));

        expect(result.current.tasks).toStrictEqual([mockTask]);

        act(() => result.current.setTasks((prev) => {
            return prev.map((t) => {
                if (t.id === mockTask.id) {
                    return ({
                        ...mockTask,
                        completed: true
                    });
                }
                else {
                    return t;
                }
            });
        }));

        expect(result.current.tasks).toStrictEqual([{ ...mockTask, completed: true }]);
    });

    it('should add new task', () => {
        const newTask: TTask['title'] = 'hello world';

        const { result } = customRenderHook();

        expect(result.current.tasks).toStrictEqual([]);

        act(() => result.current.add(newTask));

        expect(result.current.tasks[0].title).toBe('hello world');
        expect(result.current.tasks[0].completed).toBe(false);
        expect(result.current.tasks[0].id).toBeTypeOf('string');
    });

    it('should remove task', () => {
        const { result } = customRenderHook();

        expect(result.current.tasks).toStrictEqual([]);

        act(() => result.current.setTasks([mockTask]));

        expect(result.current.tasks).toStrictEqual([mockTask]);

        act(() => result.current.remove(mockTask));

        expect(result.current.tasks).toStrictEqual([]);
    });

    it('should remove completed tasks', () => {
        const { result } = customRenderHook();

        expect(result.current.tasks).toStrictEqual([]);

        act(() => result.current.setTasks([mockTask2, mockTask]));

        expect(result.current.tasks).toStrictEqual([mockTask2, mockTask]);

        act(() => result.current.removeCompleted());

        expect(result.current.tasks).toStrictEqual([mockTask]);
    });
});
