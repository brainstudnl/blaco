import { User } from '@prisma/client';
import classNames from 'classnames/bind';
import { GetStaticPropsResult, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Level } from '@blaco/components/Level';
import { getUrl } from '@blaco/utils/getUrl';
import styles from './Home.module.css';

const cx = classNames.bind(styles);

const levels = Array.from({ length: 10 }, (_, i) => i + 1);

export default function Home({
  usersPerLevel,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Brainstud Ladder Competition</title>
      </Head>
      <header className={cx(styles.header)}>
        <h1>Leaderboard</h1>
      </header>

      <div className={cx(styles.levels)}>
        {levels.map((level) => (
          <Level
            key={level}
            level={level}
            players={usersPerLevel[`level-${level}`]}
          />
        ))}
      </div>
    </>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ usersPerLevel: Record<string, User[]> }>
> {
  const res = await fetch(getUrl('/api/users'));
  const fetchedUsers: User[] = await res.json();
  const usersPerLevel: Record<string, User[]> = {};

  fetchedUsers.forEach((user) => {
    const level = `level-${user.level}`;
    if (!Object.prototype.hasOwnProperty.call(usersPerLevel, level)) {
      usersPerLevel[level] = [];
    }

    usersPerLevel[level].push(user);
  });

  return { props: { usersPerLevel } };
}
