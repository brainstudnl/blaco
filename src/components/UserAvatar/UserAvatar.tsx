import classNames from 'classnames/bind';
import Image from 'next/image';
import { PropsWithChildren, useState } from 'react';
import { getAvatarUrl } from '@blaco/utils/getAvatarUrl';
import styles from './UserAvatar.module.css';

const cx = classNames.bind(styles);

interface IProps {
  name: string;
  size?: TSize;
}

type TSize = 'small' | 'medium' | 'large' | 'xlarge';

const SIZES: Record<TSize, number> = {
  small: 25,
  medium: 50,
  large: 75,
  xlarge: 100,
};

export function UserAvatar({
  name,
  size = 'medium',
  children,
}: PropsWithChildren<IProps>) {
  const url = getAvatarUrl(name);
  const fallback = getAvatarUrl('unnamed');
  const [src, setSrc] = useState(url);
  const width = SIZES[size];
  const height = SIZES[size];

  function handleOnError() {
    setSrc(fallback);
  }

  return (
    <div className={cx(styles.base, 'avatar__base')} style={{ width, height }}>
      <Image
        className={cx('avatar__image')}
        src={src}
        onError={handleOnError}
        alt={`Avatar of ${name}`}
        width={width}
        height={height}
      />
      {children}
    </div>
  );
}
