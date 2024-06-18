import classNames from 'classnames/bind';
import Head from 'next/head';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { PrimeReactContext } from 'primereact/api';
import { Button } from 'primereact/button';
import {
  Fragment,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import styles from './Layout.module.css';

const cx = classNames.bind(styles);

interface IProps extends PropsWithChildren<{}> {}

export function Layout({ children }: IProps) {
  const { changeTheme } = useContext(PrimeReactContext);
  const [theme, setTheme] = useState('dark');
  const router = useRouter();
  const currentPath = usePathname();

  function handleChangeTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    changeTheme?.(
      `lara-${theme}-purple`,
      `lara-${newTheme}-purple`,
      'theme-link',
    );

    setTheme(newTheme);
  }

  return (
    <Fragment>
      <nav className={cx(styles.nav)}>
        <div className={cx(styles.navInner)}>
          <div className={cx(styles.links)}>
            <Link href="/" className={currentPath === '/' ? 'active' : ''}>
              Leaderboard
            </Link>
            <Link
              href="/matches"
              className={currentPath === '/matches' ? 'active' : ''}
            >
              Gespeeld
            </Link>
          </div>
          <Button
            label="Wedstrijd registreren"
            size="small"
            onClick={() => router.push('/match/create')}
          />
        </div>
      </nav>
      <main className={cx(styles.main)}>
        <Button
          className={cx(styles.theme)}
          onClick={handleChangeTheme}
          icon={cx('pi', theme === 'dark' ? 'pi-sun' : 'pi-moon')}
        />
        {children}
      </main>
    </Fragment>
  );
}
