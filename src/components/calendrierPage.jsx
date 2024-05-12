import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { IoLogoLinkedin } from "react-icons/io5";
import logo from "../assets/images/Innovation page.png";
import { SlCalender } from "react-icons/sl";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { MOCK_EVENTS } from "./event";
import Navbar from "./Navigation/navbar";
import Sidebar from "./Navigation/sidebar";
import { FaFileImage } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { connect, useDispatch, useSelector } from "react-redux";

const localizer = momentLocalizer(moment);

/*const EventComponent = ({ event }) => (
    <div>
      <div  className="event-title">{event.title}</div>
      <div className="event-sub-title">{event.subtitle} 
        <FaFileImage color={event.color}/>
      </div>
    </div>
);*/
const EventComponent = ({ event, onEventClick }) => (
  <div>
    <div className="event-title">{event.title}</div>
    <div className="event-sub-title">
      {event.subtitle}
      <FaFileImage color={event.color} />
      {event.subtitle === "programmed" && <FaFileImage color={event.color} />}
      {event.subtitle === "Meta Business Suite" && (
        <FaSquareFacebook color={event.color} />
      )}
      {event.subtitle === "Meta Business Suite_Programmer" && (
        <IoLogoLinkedin color={event.color} />
      )}
    </div>
    <button onClick={() => onEventClick(event.id)}>Voir plus</button>
  </div>
);

const MoreEventsPopup = ({ events }) => {
  // Logique pour ordonner les événements par heure
  const sortedEvents = events.sort(
    (a, b) => new Date(a.start) - new Date(b.start)
  );

  return (
    <div className="more-events-popup">
      {sortedEvents.map((event, index) => (
        <div key={index} className="popup-event">
          <div className="popup-event-time">
            {moment(event.start).format("HH:mm")}
          </div>
          <div className="popup-event-title">{event.title}</div>
        </div>
      ))}
    </div>
  );
};

export default function Calenderpage() {

  const [showeventpopup, setshoweventpopup] = useState(false);
  

  const [eventselected, seteventselected] = useState();

  const [showpopup, setshowpopup] = useState(false);
  const [eventsDays, seteventsDays] = useState();
  const navigate = useNavigate();

  const handleEventClick = (eventId) => {
    navigate(`/post/${eventId}`); // Navigation vers la page du post avec l'ID de l'événement
  };
  const userData = useSelector((data) => data.user);


  const toggleEventPopup = () => {
    setshoweventpopup(!showeventpopup);
  };
  const togglePopup = () => {
    setshowpopup(!showpopup);
  };
  const handleeventClick = (event) => {
    
    navigate(`/edit/${encodeURIComponent(
      JSON.stringify(event)
    )}`); // Navigation vers la page du post avec l'ID de l'événement

    // setshoweventpopup(!showeventpopup)
    // seteventselected(event)
    console.log(event);
  };
  const handleClick = (events) => {
    setshowpopup(true);

    seteventsDays(events);
    console.log(eventsDays);
  };
  //fonction ili bech tjib mil bd
  /*const events = MOCK_EVENTS.map((event) => {   //MOCK_EVENTS -->liste jdida mta3 bd 
    // new Date(Y, M, D, H, MIN)
    return {
      title: "Innovation page",
      start: new Date(event.start),// si shadul m3bya t7ot l valeur mt3 shadel si  non t7ot l valeur mta3 created at 
      end: new Date(event.end),
      color: event.color,
      subtitle: event.subtitle, // Ajoutez la propriété de sous-titre à chaque événement
    };
  });*/

  // Fonction pour gérer la sélection d'un événement
  const handleSelectEvent = (event) => {
    if (event.isMoreButton) {
      setShowMorePopup(true);
      setMoreEvents(event.moreEvents);
    } else {
      // Affichez les détails de l'événement ou effectuez une autre action
      alert(event.title);
    }
  };

  // États pour gérer les événements et le popup
  const [events, setEvents] = useState([]);
  const [showMorePopup, setShowMorePopup] = useState(false);
  const [moreEvents, setMoreEvents] = useState([]);

  // Function to handle navigation to the Home component
  const navigateToHome = () => {
    navigate("/");
  };
  const CustomDayEvent = ({ events }) => (
    <div>
      {events.map((event) => (
        <div key={event.id}>
          <span style={{ color: event.color }}>{event.title}</span>
        </div>
      ))}
    </div>
  );

  const CustomDateCellWrapper = ({ children, value, events }) => {
    const [showAllEvents, setShowAllEvents] = useState(false);

    const toggleShowAllEvents = () => {
      setShowAllEvents(!showAllEvents);
    };

    return (
      <div style={{ position: "relative" }}>
        {children}
        {showAllEvents ? (
          <div>
            {events.map((event) => (
              <div key={event.id}>{event.title}</div>
            ))}
            <button onClick={toggleShowAllEvents}>Moins</button>
          </div>
        ) : (
          events.length > 1 && (
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                padding: "2px 4px",
                borderRadius: "2px",
                fontSize: "12px",
                cursor: "pointer",
              }}
              onClick={toggleShowAllEvents}
            >
              More
            </div>
          )
        )}
      </div>
    );
  };
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);

  const handleSelectSlot = (slotInfo) => {
    const selectedDate = slotInfo.start;
    const eventsOnSelectedDate = events.filter((event) =>
      moment(event.start).isSame(selectedDate, "day")
    );
    setSelectedDateEvents(eventsOnSelectedDate);
  };
  // Chargement des événements depuis le backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/events",{ params: { userId: userData } })
      .then((response) => {
        console.log("events", response);
        const formattedEvents = response.data.map((event) => ({
          ...event,
          title: event.page_name,
          start:
            event.Programming_options === "published"
              ? new Date(event.created_at)
              : event.Programming_options === "programmed"
              ? new Date(event.scheduledDateTime)
              : new Date(event.created_at),
          end:
            event.Programming_options === "published"
              ? new Date(event.created_at)
              : event.Programming_options === "programmed"
              ? new Date(event.scheduledDateTime)
              : new Date(event.created_at),
          color:
            event.Programming_options === "published"
              ? "green"
              : event.Programming_options === "programmed"
              ? "orange"
              : "blue",
          subtitle: event.Programming_options,
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Fonction pour obtenir la couleur en fonction du type de publication
  // const getColorBasedOnType = (type) => {
  //   switch (type) {
  //     case 'Meta Business Suite':
  //       return '#007bff'; // Bleu
  //     case 'Meta Business Suite_Programmer':
  //       return '#28a745'; // Vert
  //     case 'published':
  //       return '#c2f270'; // Jaune
  //     case 'programmed':
  //       return '#ffc107'; // Orange
  //     default:
  //       return '#d3d3d3'; // Gris
  //   }
  // };

  return (
    <div className="">
      <div class="wrapper">
        <Sidebar />

        <div class="main ">
          <Navbar />
          <div class="container-fluid">
            <div className="container-row">
              <button className="add-new" onClick={navigateToHome}>
                <SlCalender className="mx-2" />
                Add new post
              </button>
            </div>

            <Calendar
              localizer={localizer}
              startAccessor="start"
              events={events}
              endAccessor="end"
              style={{
                height: "500px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "15px",
              }}
              eventPropGetter={(event) => ({
                style: {
                  borderRadius: "0",
                  backgroundColor: "#f8f9fa",
                  borderLeft: `3px solid ${event.color}`,
                 
                },
              })}
              views={[Views.MONTH, Views.WEEK]}
              components={{
                events: ({ event }) => (
                  <EventComponent
                    event={event}
                    onEventClick={handleEventClick}
                  />
                ),
                day: {
                  event: ({ event }) => (
                    <EventComponent
                      event={event}
                      onEventClick={handleEventClick}
                    />
                  ),
                },
              }}
              popup={false}
              onShowMore={(events, date) => handleClick(events)}
              onSelectSlot={handleSelectSlot}
              onSelecting={handleClick}
              onSelectEvent={handleeventClick}
            />
          </div>
          {showpopup && (
            <div className="popup">
              <div className="popup-content">
                <button className="close-button" onClick={togglePopup}>
                  ×
                </button>

                <div>
                  {eventsDays.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        borderBottom: `2px solid ${item.color}`,
                        borderRadius: "5px",
                        padding: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      
                      <div className="titleeditsection">
                        <div>
                          {" "}
                          <h3
                            className="event-title"
                            style={{ color: item.color }}
                          >
                            {item.title}
                          </h3>
                        </div>
                        <div className={item.subtitle ==="saved as draft" ?"icons":"icons disabled"}>

                        <div>
                          {" "}
                          <Link
                            to={`/edit/${encodeURIComponent(
                              JSON.stringify(item)
                            )}`}
                          >
                            <FaRegEdit size={20} />
                          </Link>
                        </div>
                        <div>
                        <MdOutlineDeleteOutline color="red" size={20} cursor="pointer"/>

                          </div>    </div>
                      </div>
                      <div className="event-sub-title">
                        <p>
                          {" "}
                          <span className="p-1">
                            {" "}
                            {new Date(item.start).getHours()}:
                            {new Date(item.start).getMinutes()}:
                            {new Date(item.start).getSeconds()}{" "}
                          </span>
                          {/* <FaFileImage color={item.color} /> */}
                          {item.subtitle === "programmed" && (
                            <FaFileImage color={item.color} />
                          )}{" "}
                          {/* Icône pour événement programmé */}
                          {item.subtitle === "published" && (
                            <FaFileImage color={item.color} />
                          )}{" "}
                          {/* Icône pour Meta Business Suite */}
                          {item.subtitle ===
                            "saved as draft" && (
                            <FaFileImage color={item.color} />
                          )}{" "}
                        </p>
                        {/* Icône pour Meta Business Suite Programmer */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
           
        </div>
      </div>
    </div>
  );
}
