import type { ComponentProps, FC, ReactNode } from 'react';
import { Flex } from '@/components';
import styles from './Checkbox.module.css';

type Props = {
    title?: ReactNode;
} & Pick<ComponentProps<'input'>, 'checked' | 'onChange' | 'disabled'>;

export const Checkbox: FC<Props> = ({ title, disabled, checked, onChange }) => {
    const checkbox
        = (
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className={styles.checkbox}
            />
        );

    if (!title)
        return checkbox;

    return (
        <Flex gap={12} align="center">
            {checkbox}
            {title}
        </Flex>
    );
};
