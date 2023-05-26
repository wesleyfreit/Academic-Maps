export interface Event {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  description: Text;
  point: {
    coordinates: [0, 1];
  };
}