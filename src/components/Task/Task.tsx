import type { ChangeEventHandler, FC } from 'react';
import type { TTask } from '@/types/types.ts';
import { Button, Checkbox, Flex } from '@/components';
import { useTasks } from '@/providers/useTasks';
import styles from './Task.module.css';

type Props = {
    task: TTask;
};

export const Task: FC<Props> = ({ task }) => {
    const { setTasks, remove } = useTasks();
    const handleCompleteChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        setTasks((prev) => {
            return prev.map((t) => {
                if (t.id === task.id) {
                    return ({
                        ...task,
                        completed: target.checked
                    });
                }
                else {
                    return t;
                }
            });
        });
    };

    return (
        <li className={styles.task}>
            <Flex align="center" gap={8}>
                <Checkbox
                    checked={task.completed}
                    onChange={handleCompleteChange}
                />
                <div>{task.title}</div>
            </Flex>
            <Button variant="outlined" onClick={() => remove(task)}>X</Button>
        </li>
    );
};
