import { User } from '@prisma/client';
import classNames from 'classnames/bind';
import type {
  GetServerSideProps,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { FormEvent, useState } from 'react';
import { getDefenders } from '@blaco/utils/getDefenders';
import { getUrl } from '@blaco/utils/getUrl';
import styles from './MatchCreate.module.css';

const cx = classNames.bind(styles);

export default function CreateMatch({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [challengerId, setChallengerId] = useState<number | null>(null);
  const [defenderId, setDefenderId] = useState<number | null>(null);
  const [playedAt, setPlayedAt] = useState(new Date());
  const router = useRouter();
  const defenders = getDefenders(challengerId, users);
  const userOptions = users.map((user) => ({
    label: user.name,
    value: user.id,
  }));

  async function handleStartMatch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { score_challenger, score_defender, played_at } = Object.fromEntries(
      new FormData(e.currentTarget),
    );

    const body = JSON.stringify({
      played_at,
      score_challenger: parseInt(score_challenger as string, 10),
      score_defender: parseInt(score_defender as string, 10),
      challenger_id: challengerId,
      defender_id: defenderId,
    });

    try {
      const response = await fetch(getUrl('/api/matches'), {
        method: 'POST',
        body,
      });

      if (response.status !== 201) {
        throw new Error(response.statusText);
      }

      router.push('/');
    } catch (error) {
      alert((error as Error).message);
    }
  }

  function handleSetChallengerId(event: DropdownChangeEvent) {
    if (event.target.value === challengerId) return;
    if (event.target.value === defenderId) setDefenderId(null);
    setChallengerId(parseInt(event.target.value, 10));
  }

  function handleSetDefenderId(event: DropdownChangeEvent) {
    if (event.target.value === defenderId) return;
    if (event.target.value === challengerId) setChallengerId(null);
    setDefenderId(parseInt(event.target.value, 10));
  }

  return (
    <>
      <Head>
        <title>Wedstrijd registreren</title>
      </Head>
      <form onSubmit={handleStartMatch}>
        <div className={cx(styles.base)}>
          <div className={cx(styles.group)}>
            <label htmlFor="challenger_id">Uitdager</label>

            <Dropdown
              filter={userOptions.length > 5}
              options={userOptions}
              value={challengerId}
              onChange={handleSetChallengerId}
              name="challenger_id"
              required
            />
            <label htmlFor="score_challenger">Score</label>

            <InputNumber
              name="score_challenger"
              placeholder=""
              min={0}
              max={10}
              required
            />
          </div>
          <div className={cx(styles.group)}>
            <label htmlFor="defender_id">Uitgedaagde</label>

            <Dropdown
              filter={defenders.length > 5}
              options={defenders.map(({ name, id }) => ({
                label: name,
                value: id,
              }))}
              value={defenderId}
              onChange={handleSetDefenderId}
              name="defender_id"
              placeholder="Uitgedaagde"
              required
              disabled={!challengerId}
            />

            <label htmlFor="score_defender">Score</label>
            <InputNumber name="score_defender" min={0} max={10} required />
          </div>

          <div className={cx(styles.group)}>
            <label htmlFor="played_at">Gespeeld op</label>
            <Calendar
              showTime
              hourFormat="24"
              name="played_at"
              dateFormat="dd MM yy"
              maxDate={new Date()}
              value={playedAt}
              onChange={(event) =>
                setPlayedAt(
                  event.target.value
                    ? new Date(event.target.value)
                    : new Date(),
                )
              }
            />
          </div>
        </div>

        <div className={cx(styles.button)}>
          <Button
            type="button"
            label="Annuleren"
            link
            onClick={() => router.push('/')}
          />
          <Button type="submit" label="Opslaan" />
        </div>
      </form>
    </>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<{ users: User[] }>
> {
  const res = await fetch(getUrl('/api/users'));
  const users = await res.json();
  return { props: { users } };
}
