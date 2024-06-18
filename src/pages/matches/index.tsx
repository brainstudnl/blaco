import { Match, User } from '@prisma/client';
import classNames from 'classnames/bind';
import { GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { UserAvatar } from '@blaco/components/UserAvatar';
import { getUrl } from '@blaco/utils/getUrl';
import styles from './MatchPage.module.css';

const cx = classNames.bind(styles);

type TMatchInfo = Match & { challenger: User; defender: User };

export default function MatchesPage({
  matches,
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <DataTable<Match[]>
      value={matches}
      stripedRows
      header="Gespeelde wedstrijden"
      className={cx(styles.table)}
      emptyMessage="Nog geen wedstrijden gespeeld"
    >
      <Column
        field="challenger_id"
        body={(match: TMatchInfo) => (
          <div className={cx(styles.flexEnd)}>
            <UserAvatar name={match.challenger.name} size="large" />
          </div>
        )}
      />
      <Column
        className={cx(styles.column)}
        body={(match: TMatchInfo) => (
          <div>
            <div className={cx(styles.scoreContainer)}>
              <div
                className={cx(
                  styles.scoreBox,
                  match.score_challenger > match.score_defender
                    ? styles.scoreBoxPrimary
                    : styles.scoreBoxWhite,
                )}
              >
                {match.score_challenger}
              </div>
              -
              <div
                className={cx(
                  styles.scoreBox,
                  match.score_challenger > match.score_defender
                    ? styles.scoreBoxWhite
                    : styles.scoreBoxPrimary,
                )}
              >
                {match.score_defender}
              </div>
            </div>
            {match.played_at ? (
              <div className={cx(styles.date)}>
                <span>
                  {new Date(match.played_at).toLocaleDateString('nl', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <span>
                  {new Date(match.played_at).toLocaleTimeString('nl', {
                    timeStyle: 'short',
                  })}
                </span>
              </div>
            ) : null}
          </div>
        )}
      />
      <Column
        field="defender_id"
        body={(match: TMatchInfo) => (
          <UserAvatar name={match.defender.name} size="large" />
        )}
      />
    </DataTable>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<{ matches: Match[]; users: User[] }>
> {
  const [matchesResponse, usersResponse] = await Promise.all([
    fetch(getUrl('/api/matches')),
    fetch(getUrl('/api/users')),
  ]);

  const matches = await matchesResponse.json();
  const users = await usersResponse.json();

  return { props: { matches, users } };
}
