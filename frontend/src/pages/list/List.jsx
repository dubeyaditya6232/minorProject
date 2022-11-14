import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import "./list.css";
import { useState } from 'react';
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from '../../components/hooks/useFetch';

const List = () => {
  const location = useLocation();

  const [destination, setDestination] = useState(location.state.destination);
  const [options, setOptions] = useState(location.state.options);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);

  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);


  const { data, loading, error, reFetch } = useFetch(
    `/hotels/?city=${destination}&min=${min || 0}&max=${max || 99999}`
  )

  const handleClick = ()=>{
    reFetch();
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className='listContainer'>
        <div className='listWrapper'>
          <div className='listSearch'>
            <h1 className='lsTitle'>Search</h1>
            <div className='lsItem'>
              <label>Destination</label>
              <input type="text" placeholder={destination}></input>
            </div>
            <div className='lsItem'>
              <label>Check-In Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, "dd/MM/yyyy")}`} to {`${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
              {openDate && (<DateRange
                onChange={item => setDate([item.selection])} minDate={new Date()}
                ranges={date}
              />)}
            </div>
            <div className='lsItem'>
              <label>Options</label>
              <div className='lsOptions'>
                <div className='lsOptionItem'>
                  <span className='lsSearchOptionText'>Min Price <small>per night</small></span>
                  <input type="number" onChange={e => setMin(e.target.value)} className='lsOptionInput' />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsSearchOptionText'>Max Price <small>per night</small></span>
                  <input type="number" onChange={e => setMax(e.target.value)} className='lsOptionInput' />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsSearchOptionText'>Adult</span>
                  <input type="number" min={1} className='lsOptionInput' />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsSearchOptionText'>Children</span>
                  <input type="number" min={0} className='lsOptionInput' />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsSearchOptionText'>Room</span>
                  <input type="number" min={1} className='lsOptionInput' />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className='listResult'>
            {
              loading ? "Loading" : <>
                {data.map(item => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default List