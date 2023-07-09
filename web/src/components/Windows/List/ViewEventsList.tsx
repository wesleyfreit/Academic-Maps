import { Event } from '@/configs/Interfaces';
import EventItem from './Item/EventItem';

interface Props {
  eventsList: Event[];
  onClose: () => void;
  openMenu: boolean;
}
export default function ViewEventsList(props: Props) {
  const { eventsList, openMenu, onClose } = props;
  return (
    <>
      <ul className="flex flex-col space-y-2 w-full justify-center">
        {eventsList.map((event) => {
          return <EventItem key={event._id} event={event} onClose={onClose} openMenu={openMenu} />;
        })}
      </ul>
    </>
  );
}
