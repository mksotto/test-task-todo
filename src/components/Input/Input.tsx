import type { ComponentProps, FC } from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';

type Props = {
    block?: boolean;
    error?: boolean;
} & Pick<ComponentProps<'input'>, 'type'
| 'placeholder'
| 'value'
| 'onChange'
| 'name'
| 'disabled'
| 'min'
| 'max'>;

export const Input: FC<Props> = ({ block, error, type, disabled, ...props }) => (
    <input
        type={type || 'text'}
        disabled={disabled}
        aria-disabled={disabled}
        className={clsx(styles.input, block && styles.block, error && styles.error)}
        {...props}
    />
);
