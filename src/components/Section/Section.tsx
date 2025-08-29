import type { FC, PropsWithChildren } from 'react';
import styles from './Section.module.css';

type Props = PropsWithChildren;

export const Section: FC<Props> = props => (
    <section className={styles.section} {...props} />
);
