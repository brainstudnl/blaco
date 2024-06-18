import { Avatar, AvatarProps } from 'primereact/avatar';
import { PropsWithChildren } from 'react';
import { getAvatarUrl } from '@blaco/utils/getAvatarUrl';

interface IProps {
  name: string;
  size?: AvatarProps['size'];
}

export function UserAvatar({
  name,
  size,
  children,
}: PropsWithChildren<IProps>) {
  const url = getAvatarUrl(name);
  const fallback = getAvatarUrl('Unnamed');
  const label = name.slice(0, 1);

  return (
    <Avatar
      label={label}
      image={url}
      imageFallback={fallback}
      shape="circle"
      size={size}
    >
      {children}
    </Avatar>
  );
}
