import { Match, User } from '@prisma/client';
import classNames from 'classnames/bind';
import { GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Fragment } from 'react';
import { UserAvatar } from '@blaco/components/UserAvatar';
import { getUrl } from '@blaco/utils/getUrl';
import styles from './MatchPage.module.css';

const cx = classNames.bind(styles);

type TMatchInfo = Match & { challenger: User; defender: User };

export default function MatchesPage({
  matches,
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
            <div className={cx(styles.user)}>
              <UserAvatar name={match.challenger.name} size="medium" />
              <span>{match.challenger.name}</span>
            </div>
          </div>
        )}
      />
      <Column
        className={cx(styles.column)}
        body={(match: TMatchInfo) => (
          <Fragment>
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
          </Fragment>
        )}
      />
      <Column
        field="defender_id"
        body={(match: TMatchInfo) => (
          <div className={cx(styles.flexStart)}>
            <div className={cx(styles.user)}>
              <UserAvatar name={match.defender.name} size="medium" />
              <span>{match.defender.name}</span>
            </div>
          </div>
        )}
      />
    </DataTable>
  );
}

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<{ matches: Match[] }>
> {
  const res = await fetch(getUrl('/api/matches'));
  const matches = await res.json();

  return { props: { matches } };
}
