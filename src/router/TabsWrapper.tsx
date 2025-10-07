import { Outlet } from 'react-router';
import Tabs from './Tabs';

function TabsWrapper() {
  return (
    <div className="flex flex-col pb-28">
      <Outlet />
      <Tabs />
    </div>
  );
}

export default TabsWrapper;
