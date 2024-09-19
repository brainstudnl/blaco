export function calculateMostGoalsAgainst(goalsConceded: Map<number, number>) {
  let mostGoalsAgainstUser: number | null = null;
  let mostGoalsAgainst = 0;

  goalsConceded.forEach((conceded, userId) => {
    if (conceded > mostGoalsAgainst) {
      mostGoalsAgainst = conceded;
      mostGoalsAgainstUser = userId;
    }
  });

  return {
    mostGoalsAgainstUser,
    mostGoalsAgainst,
  };
}
