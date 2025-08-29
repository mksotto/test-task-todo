import type { ComponentProps, FC } from 'react';
import { motion } from 'motion/react';
import styles from './Button.module.css';

type Props = {
    variant?: 'primary' | 'ghost';
} & Pick<ComponentProps<'button'>, 'onClick' | 'type' | 'disabled' | 'children'>;

export const Button: FC<Props> = ({ type, variant = 'primary', ...props }) => (
    <motion.button
        initial={{ scale: 1 }}
        whileTap={{
            scale: 0.9,
            boxShadow: '0 0 16px #676767'
        }}
        data-variant={variant}
        type={type || 'button'}
        className={styles.button}
        {...props}
    />
);
