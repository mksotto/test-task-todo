import type { TTask } from '@/types/types.ts';
import { useCallback, useState } from 'react';
import { Flex, Input, Section, Task } from '@/components';
import { Button } from '@/components/Button/Button.tsx';
import { Segmented } from '@/components/Segmented/Segmented.tsx';
import { useTasks } from '@/providers/useTasks.tsx';
import styles from './App.module.css';

const filteringOptions = [
    {
        value: 'all',
        label: 'All Tasks'
    },
    {
        value: 'uncompleted',
        label: 'Active'
    },
    {
        value: 'completed',
        label: 'Completed'
    }
] as const;

type TFiltering = typeof filteringOptions[number]['value'];

export const App = () => {
    const { tasks, add, removeCompleted } = useTasks();
    const [value, setValue] = useState('');
    const [filtering, setFiltering] = useState<TFiltering>('all');

    const filterByCurrentTab = useCallback((allTasks: TTask[]) => {
        switch (filtering) {
            case 'all':
                return allTasks;
            case 'completed':
                return allTasks.filter(task => task.completed);
            case 'uncompleted':
                return allTasks.filter(task => !task.completed);
        }
    }, [filtering]);

    return (
        <Flex justify="center" align="center" className={styles.app}>
            <Section>
                <h1 className={styles.title}>Todos</h1>
                <Flex gap={8}>
                    <Input
                        placeholder="Add new task"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <Button
                        onClick={() => {
                            if (!value.trim())
                                return;
                            add(value);
                            setValue('');
                        }}
                    >
                        Add
                    </Button>
                </Flex>
                <ul className={styles.tasks}>
                    {filterByCurrentTab(tasks).map(task => (
                        <Task key={task.id} task={task} />
                    ))}
                </ul>

                <Flex justify="between" align="center" gap={16}>
                    <div>
                        {tasks.filter(t => !t.completed).length}
                        {' '}
                        items left
                    </div>
                    <Segmented
                        items={filteringOptions}
                        value={filtering}
                        onChange={setFiltering}
                    />
                    <Button variant="ghost" onClick={removeCompleted}>
                        Clear completed
                    </Button>
                </Flex>
            </Section>
        </Flex>
    );
};
