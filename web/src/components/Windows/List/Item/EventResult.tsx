import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

import { Event } from '@/configs/Interfaces';

export default function EventResult(props: { event: Event }) {
  const router = useRouter();
  const { event } = props;

  const handleClickEvent = () => {
    router.push(`/events/${event._id}`);
  };

  return (
    <>
      <li className="flex justify-center">
        <div
          title="Visualizar evento"
          className="text-center bg-gray-700 rounded-md py-1 w-full hover:bg-gray-600 cursor-pointer"
          onClick={handleClickEvent}
        >
          <h2 className="font-alt text-lg font-semibold">{event.title}</h2>
          <p>
            {dayjs(event.startDate).utc().format('DD[/]MM[/]YYYY')} ~
            {dayjs(event.endDate).utc().format('DD[/]MM[/]YYYY')}
          </p>
        </div>
      </li>
    </>
  );
}
