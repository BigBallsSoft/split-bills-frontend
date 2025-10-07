import HeaderTotal from '@/components/HeaderTotal';
import { Cell } from '@telegram-apps/telegram-ui';
import { FiPlusCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router';

function SplitsPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col pt-14">
      <HeaderTotal title="30 BYN" />
      <Cell
        className="mt-6 mb-3 bg-primary px-4 mx-5 rounded-2xl d-flex justify-center items-center child-grow-0"
        onClick={() => navigate('/splits/create')}
      >
        <FiPlusCircle className="size-8 my-1.5" />
      </Cell>
    </div>
  );
}

export default SplitsPage;
