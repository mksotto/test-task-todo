import type { FC } from 'react';
import type { TTask } from '@/types/types';
import { motion } from 'motion/react';
import { Button, Checkbox, Flex } from '@/components';
import { useTasks } from '@/providers/useTasks';
import styles from './Task.module.css';

type Props = {
    task: TTask;
};

export const Task: FC<Props> = ({ task }) => {
    const { remove, toggleCompleted } = useTasks();

    return (
        <motion.li
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={styles.task}
        >
            <Flex align="center" gap={8}>
                <Checkbox
                    checked={task.completed}
                    onChange={({ target }) => toggleCompleted(task, target.checked)}
                />
                <div>{task.title}</div>
            </Flex>
            <Button variant="ghost" onClick={() => remove(task)}>&#9747;</Button>
        </motion.li>
    );
};
