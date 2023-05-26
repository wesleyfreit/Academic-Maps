import { api } from '@/lib/api';
import { ClipboardType } from 'lucide-react';
import { FormEvent, useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types';

interface Props {
  position: google.maps.LatLngLiteral;
  onClose: (value: boolean) => void;
}

export default function FormCreateEvent(props: Props) {

  const { position, onClose } = props;

  const [date, setChange] = useState<DateValueType | null>(null);

  const handleDateChange = (newDate: DateValueType) => setChange(newDate);

  const handleCreateLocation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      await api.post('/events', {
        title: formData.get('title'),
        startDate: date?.startDate,
        endDate: date?.endDate,
        description: formData.get('description'),
        lng: position.lng,
        lat: position.lat,
      });
    } catch (error) {}

    onClose(false);
    window.location.assign('/');
  };

  return (
    <div className="flex flex-col p-10 border-gray-800 border bg-gray-900 text-center rounded-xl shadow-gray-950 shadow-lg drop-shadow-2xl w-screen max-w-lg">
      <h1 className="uppercase font-alt text-xl font-bold">🗺️ Criação do Evento</h1>
      <form onSubmit={handleCreateLocation} className="mt-5 flex flex-col overflow-y-auto">
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Título"
          className="rounded-lg px-3 py-2 outline-none border border-transparent bg-slate-800 focus:border-gray-700 text-lg text-gray-100 placeholder:text-gray-400"
        />
        <div className="mt-4 relative">
          <Datepicker
            placeholder={'Início do evento ~ Fim do evento'}
            displayFormat={'DD/MM/YYYY'}
            i18n={'pt'}
            readOnly={true}
            useRange={false}
            value={date}
            onChange={handleDateChange}
            inputClassName="rounded-lg px-3 py-2 outline-none border border-transparent bg-slate-800 focus:border-gray-700 text-lg text-gray-100 placeholder:text-gray-400 w-full focus:ring-0 "
          />
        </div>
        <textarea
          name="description"
          id="description"
          spellCheck={false}
          className="rounded-lg px-3 py-2 outline-none border border-transparent bg-slate-800 focus:border-gray-700 text-lg text-gray-100 placeholder:text-gray-400 mt-5 resize-none h-52"
          placeholder="Adicione uma breve descrição do evento"
        />
        <div className="mt-5 w-full h-full flex justify-center">
          <button
            type="submit"
            className="bg-blue-700 border border-transparent outline-none shadow-gray-950 shadow-sm hover:bg-blue-800 active:border-blue-400 rounded-lg relative px-10 py-2 "
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
