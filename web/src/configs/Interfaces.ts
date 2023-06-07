export interface Event {
  _id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  description: Text;
  point: {
    coordinates: [0, 1];
  };
}
