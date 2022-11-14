import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import "./hotel.css";
import useFetch from "../../components/hooks/useFetch";
import { useLocation} from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

const Hotel = () => {

  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data, loading, error, reFetch} = useFetch(`http://localhost:8000/api/hotels/find/${id}`);

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const {date, options} = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000*60*60*24;
  function dayDifference(date1,date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  let day = 1;
  if(date !== undefined){
    day = dayDifference(date[0].endDate, date[0].startDate) ;
  }

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  }

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === 'l') {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {
        loading ? "Loading" : (
          <>
            <div className="hotelContainer">
              {open && <div className="slider">
                <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
                <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
                <div className="sliderWrapper">
                  <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
                  <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")} />
                </div>
              </div>}
              <div className="hotelWrapper">
                <button className="bookNow">Reserve or Book Now!</button>
                <h1 className="hotelTitle">{data.name}</h1>
                <div className="hotelAddress">
                  <FontAwesomeIcon icon={faLocation}></FontAwesomeIcon>
                  <span>{data.address}</span>
                </div>
                <span className="hotelDistance">
                  Excellent location - {data.distance}m from city center
                </span>
                <span className="hotelPriceHighlight">
                  Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
                </span>
                <div className="hotelImages">
                  {data.photos?.map((photo, i) => (
                    <div className="hotelImgWrapper">
                      <img onClick={() => handleOpen(i)} src={photo} alt="" className="hotelImg" />
                    </div>
                  ))}
                </div>
                <div className="hotelDetails">
                  <div className="hotelDetailsText">
                    <h1 className="hotelTitle">{data.title}</h1>
                    <p className="hotelDesc">
                      {data.desc}
                    </p>
                  </div>
                  <div className="hotelDetailsPrice">
                    <h1>Perfect for a 9-night stay!</h1>
                    <span>
                      Located in the real heart of Krakow, this property has an
                      excellent location score of 9.8!
                    </span>
                    <h2>
                      <b>${day*data.cheapestPrice*options.room}</b> ({day} nights)
                    </h2>
                    <button>Reserve or Book Now!</button>
                  </div>
                </div>
              </div>
            </div>
            <MailList />
            <Footer />
          </>
        )
      }
    </div>
  )
}

export default Hotel