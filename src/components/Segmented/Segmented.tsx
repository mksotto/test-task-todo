import type { FC, ReactNode } from 'react';
import { motion } from 'motion/react';
import { useId } from 'react';
import styles from './Segmented.module.css';

export type TSegmentedItem = {
    label: ReactNode;
    value: string;
};

type Props<T extends TSegmentedItem> = {
    items: readonly T[];
    value: T['value'];
    onChange: (value: T['value']) => void;
};

type SegmentedItemProps = {
    item: TSegmentedItem;
    selected: boolean;
    onChange: VoidFunction;
};

const SegmentedItem: FC<SegmentedItemProps> = ({ item, selected, onChange }) => {
    const id = useId();
    return (
        <label htmlFor={id} className={styles.navItem}>
            <input
                type="radio"
                id={id}
                value={item.value}
                checked={selected}
                onChange={onChange}
                className={styles.radio}
            />
            {selected && (
                <motion.div
                    layoutId="segmentedShape"
                    transition={{ type: 'spring', duration: 0.5 }}
                    className={styles.shape}
                />
            )}
            <span className={styles.label}>{item.label}</span>
        </label>
    );
};

export const Segmented = <T extends TSegmentedItem>({ items, value, onChange }: Props<T>) => (
    <nav>
        {items.map(item => (
            <SegmentedItem
                key={item.value}
                item={item}
                selected={item.value === value}
                onChange={() => onChange(item.value)}
            />
        ))}
    </nav>
);
