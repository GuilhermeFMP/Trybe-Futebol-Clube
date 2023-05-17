import IMatchAtributtes from '../../interfaces/IMatchAtributtes';

const matchesMock = {
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 1,
  "awayTeamId": 8,
  "awayTeamGoals": 1,
  "inProgress": false,
  "homeTeam": {
    "teamName": "São Paulo"
  },
  "awayTeam": {
    "teamName": "Grêmio"
  }
} as unknown;

const wrongMatchesMock = {
  "id": 1,
  "homeTeamId": 1,
  "homeTeamGoals": 1,
  "awayTeamId": 1,
  "awayTeamGoals": 1,
  "inProgress": false,
  "homeTeam": {
    "teamName": "São Paulo"
  },
  "awayTeam": {
    "teamName": "Grêmio"
  }
} as unknown;

const notExistMatchesMock = {
  "id": 1,
  "homeTeamId": 1,
  "homeTeamGoals": 1,
  "awayTeamId": 99,
  "awayTeamGoals": 1,
  "inProgress": false,
  "homeTeam": {
    "teamName": "São Paulo"
  },
  "awayTeam": {
    "teamName": "Grêmio"
  }
} as unknown;

const InProgressMatchesMock = {
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 1,
  "awayTeamId": 8,
  "awayTeamGoals": 1,
  "inProgress": true,
  "homeTeam": {
    "teamName": "São Paulo"
  },
  "awayTeam": {
    "teamName": "Grêmio"
  }
} as unknown;

export default { 
  matchesMock,
  wrongMatchesMock,
  notExistMatchesMock,
  InProgressMatchesMock,
};