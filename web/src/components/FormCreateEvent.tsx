import options from '@/configs/datePickerOptions';
import { FormEvent, useState } from 'react';
import DatePicker from 'tailwind-datepicker-react';

interface Props {
  selectedPosition: google.maps.LatLngLiteral;
}

export default function WarningCreateEvent(props: Props) {
  const { selectedPosition } = props;
  const [show, setShow] = useState<boolean>(false);

  const handleCreateLocation = async (event: FormEvent<HTMLFormElement>) => {};
  return (
    <div className="flex flex-col w-screen max-w-lg p-10 bg-gray-900 text-center rounded-xl shadow-gray-950 shadow-lg drop-shadow-2xl">
      <h1 className="uppercase font-alt text-xl font-bold">🗺️ Criação do Evento</h1>
      <form onSubmit={handleCreateLocation} className="mt-5 flex flex-col ">
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Título"
          className="rounded-lg px-3 py-2 text-gray-100 bg-gray-700 border border-gray-600"
        />
        <div className="mt-4 relative">
          <DatePicker
            style={{ backgroundColor: '#000' }}
            id="date"
            name="date"
            show={show}
            options={{ ...options }}
            setShow={(state: boolean | ((prevState: boolean) => boolean)) => setShow(state)}
          />
        </div>
        <textarea
          name="description"
          spellCheck={false}
          className="mt-5 p-3 border border-gray-600 rounded-md flex h-52 bg-gray-700 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400"
          placeholder="Adicione uma breve descrição do evento"
        />
        <div className="mt-5 w-full h-full flex justify-center">
          <button type="submit" className="bg-blue-700 hover:bg-blue-800 px-10 py-2 rounded-lg shadow-gray-950 shadow-sm">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
