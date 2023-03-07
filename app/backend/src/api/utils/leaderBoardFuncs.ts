import ILeaderboard from '../Interfaces/ILeaderboard';
import MatchesModel from '../../database/models/matchesModel';

type homeAway = 'homeTeamGoals' | 'awayTeamGoals';

const arrayHomeAwayGoals: homeAway[] = ['homeTeamGoals', 'awayTeamGoals'];
const array2HomeAwayGoals: homeAway[] = ['awayTeamGoals', 'homeTeamGoals'];

export const goalCount = (matches: MatchesModel[], goaltype: homeAway) => {
  let totalGoals = 0;
  matches.forEach((match) => {
    totalGoals += match[goaltype];
  });
  return totalGoals;
};

export const getTeamResults = (matches: MatchesModel[], goaltype: homeAway[]) =>
  matches.reduce(
    (acc, curr) => ({
      victories: acc.victories + (curr[goaltype[0]] > curr[goaltype[1]] ? 1 : 0),
      losses: acc.losses + (curr[goaltype[0]] < curr[goaltype[1]] ? 1 : 0),
      draws: acc.draws + (curr[goaltype[0]] === curr[goaltype[1]] ? 1 : 0),
    }),
    { victories: 0, losses: 0, draws: 0 },
  );

export const totalScore = (matches: MatchesModel[], goaltype: homeAway[]): number => {
  const { victories, draws } = getTeamResults(matches, goaltype);
  const result = (victories * 3) + draws;
  return result;
};

export const totalScoreGoalsBalance = (
  matches: MatchesModel[],
  goaltype: homeAway[],
): number => {
  const goalsHome = goalCount(matches, goaltype[0]);
  const goalsAway = goalCount(matches, goaltype[1]);

  const result = goalsHome - goalsAway;
  return result;
};

export const calculateEfficiency = (matche: MatchesModel[], goaltype: homeAway[]): string => {
  const totalpoints = totalScore(matche, goaltype);
  const totalGames = matche.length;
  const result = (totalpoints / (totalGames * 3)) * 100;
  return result.toFixed(2);
};

export const calculateAllEfficiency = (
  matcheHome: MatchesModel[],
  matcheAway: MatchesModel[],
): string => {
  const totalpoints = totalScore(matcheHome, arrayHomeAwayGoals)
    + totalScore(matcheAway, array2HomeAwayGoals);
  const totalGames = matcheHome.length + matcheAway.length;
  const result = (totalpoints / (totalGames * 3)) * 100;
  return result.toFixed(2);
};

export const objectResult = (team: string, matche: MatchesModel[], goaltype: homeAway[]) => ({
  name: team,
  totalPoints: totalScore(matche, goaltype),
  totalGames: matche.length,
  totalVictories: getTeamResults(matche, goaltype).victories,
  totalDraws: getTeamResults(matche, goaltype).draws,
  totalLosses: getTeamResults(matche, goaltype).losses,
  goalsFavor: goalCount(matche, goaltype[0]),
  goalsOwn: goalCount(matche, goaltype[1]),
  goalsBalance: totalScoreGoalsBalance(matche, goaltype),
  efficiency: calculateEfficiency(matche, goaltype),
});

export const objectAll = (tea: string, matcheHome: MatchesModel[], matcheAway: MatchesModel[]) => ({
  name: tea,
  totalPoints: totalScore(matcheHome, arrayHomeAwayGoals)
    + totalScore(matcheAway, array2HomeAwayGoals),
  totalGames: matcheHome.length + matcheAway.length,
  totalVictories: (getTeamResults(matcheHome, arrayHomeAwayGoals).victories
    + getTeamResults(matcheAway, array2HomeAwayGoals).victories),
  totalDraws: (getTeamResults(matcheHome, arrayHomeAwayGoals).draws
    + getTeamResults(matcheAway, array2HomeAwayGoals).draws),
  totalLosses: (getTeamResults(matcheHome, arrayHomeAwayGoals).losses
    + getTeamResults(matcheAway, array2HomeAwayGoals).losses),
  goalsFavor: goalCount(matcheHome, arrayHomeAwayGoals[0])
    + goalCount(matcheAway, arrayHomeAwayGoals[1]),
  goalsOwn: goalCount(matcheHome, arrayHomeAwayGoals[1])
    + goalCount(matcheAway, arrayHomeAwayGoals[0]),
  goalsBalance: totalScoreGoalsBalance(matcheHome, arrayHomeAwayGoals)
    + totalScoreGoalsBalance(matcheAway, array2HomeAwayGoals),
  efficiency: calculateAllEfficiency(matcheHome, matcheAway),
});

export const orderResults = (teams: ILeaderboard[]) =>
  teams.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;
    if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
    if (b.goalsFavor !== a.goalsFavor) return b.goalsFavor - a.goalsFavor;
    return a.goalsOwn - b.goalsOwn;
  });
