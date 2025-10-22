export interface Fixture {
  id: string;
  date: string; // "Sun 20 Oct"
  time: string; // "7:30 PM"
  category: 'MEN' | 'WOMEN' | 'U21';
  homeTeam: string;
  awayTeam?: string;
  venue: string;
  ticketUrl: string;
  premiumTicketUrl?: string;
}

export interface FixturesSectionProps {
  fixtures: Fixture[];
}