export interface Fixture {
  id: string;
  date: string;
  time: string; 
  category: 'MEN' | 'U21';
  homeTeam: string;
  awayTeam: string;
  venue: string;
  ticketUrl: string;
  premiumTicketUrl?: string;
  opponentLogo:string;
}

export interface FixturesSectionProps {
  fixtures: Fixture[];
}