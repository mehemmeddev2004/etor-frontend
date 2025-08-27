import React from 'react';
import Kampaniya from './Kampaniya';
import NewIn from './NewIn';
import NewSeason from './NewSeason';
import Pay from './Pay';


const Main = () => {
  return (
    <div className='flex flex-col mt-[30px] gap-y-[30px] mb-[50px]  justify-center items-center'>
      <Kampaniya/>
      <NewIn/>
      <NewSeason/>
      <Pay/>

    </div>
  );
}

export default Main;
