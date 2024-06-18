import { User } from '@prisma/client';
import classNames from 'classnames/bind';
import Image from 'next/image';
import crownSvg from '../../../public/images/crown.svg';
import { UserAvatar } from '../UserAvatar';
import styles from './Level.module.css';

const cx = classNames.bind(styles);

interface IProps {
  level: number;
  players?: User[];
}

export function Level({ players, level }: IProps) {
  return players?.length ? (
    <div className={cx(styles.base, `level-${level}`)}>
      {players.map(({ name, id }) => (
        <div key={id} className={cx(styles.player)}>
          <UserAvatar name={name} size="xlarge">
            {level === 1 ? (
              <>
                <Image
                  src={crownSvg}
                  alt="1e plaats"
                  className={cx(styles.crown)}
                />
                <div className={cx(styles.border)} />
              </>
            ) : null}
            <div className={cx(styles.place)}>
              <span>{level}</span>
            </div>
          </UserAvatar>
          <span className={cx(styles.name)}>{name}</span>
        </div>
      ))}
    </div>
  ) : null;
}
