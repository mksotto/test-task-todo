import type { ComponentProps, CSSProperties, FC } from 'react';
import clsx from 'clsx';
import styles from './Flex.module.css';

type Props = ComponentProps<'div'> & {
    inline?: boolean;
    vertical?: boolean;
    gap?: CSSProperties['gap'];
    justify?: 'start' | 'center' | 'end' | 'around' | 'between' | 'evenly';
    align?: 'start' | 'center' | 'end' | 'baseline';
    flex?: CSSProperties['flex'];
    wrap?: boolean;
};

export const Flex: FC<Props> = ({ inline, vertical, justify, align, flex, wrap, gap, style, className, ...props }) => (
    <div
        style={{ gap, flex, ...style }}
        className={clsx(
            inline ? styles['inline-flex'] : styles.flex,
            vertical && styles.vertical,
            justify && styles[`justify-${justify}`],
            align && styles[`align-${align}`],
            wrap && styles.wrap,
            className
        )}
        {...props}
    />
);
