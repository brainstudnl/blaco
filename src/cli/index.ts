import { parseArgs } from 'util';
import { setLocale } from './config';
import { filterExcludedUsers } from './filterExcludedUsers';
import { calculateGoalsPerUser } from './goalsPerUser';
import { logResults } from './logResults';

async function loadFiles(dataDirPath?: string) {
  const [matches, users] = await Promise.all([
    import(`${dataDirPath || ''}/Match.json`).then((mod) => mod.default),
    import(`${dataDirPath || ''}/User.json`).then((mod) => mod.default),
  ]);

  return { matches, users };
}

/**
 * Import the data files, and log the results.
 * This is the main function that is called when the script is run.
 */
async function calculateAndLogResults() {
  const {
    values: { dataDirPath, excludeUserIds = '', locale },
  } = parseArgs({
    args: Bun.argv,
    options: {
      dataDirPath: { type: 'string' },
      excludeUserIds: { type: 'string' },
      locale: { type: 'string' },
    },
    strict: true,
    allowPositionals: true,
  });

  setLocale(locale);

  console.log('Excluding users for ranking:', excludeUserIds);

  const { matches, users } = await loadFiles(dataDirPath);
  const excludedUsers = excludeUserIds.split(',').map((id) => parseInt(id, 10));
  const filteredMatches = filterExcludedUsers(matches, excludedUsers);

  // Only calculate the goals scored and conceded for the filtered matches.
  // This is to ensure that the excluded users are not included in the results for whatever reason
  const { goalsScored, goalsConceded } = calculateGoalsPerUser(filteredMatches);

  logResults({ matches, users, goalsScored, goalsConceded });
}

calculateAndLogResults();
