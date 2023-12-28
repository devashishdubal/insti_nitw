import "./menu.css"
import React, { useState, useEffect } from 'react';
import jsonData from './menuData.json' // Import your JSON data


function Menu() {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Returns a number from 0 (Sunday) to 6 (Saturday)

    // You might want to convert it to a string for better readability
    const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const [currentDay, setCurrentDay] = useState(daysOfWeek[dayOfWeek]);

    //console.log(currentDay)

    const changeDay = (e) => {
        if (e.target.id == "mon") {
            //currentDay = "mon";
            setCurrentDay("mon")
            document.getElementsByClassName("breakfast")[0].innerHTML = jsonData.Mon["IFC-A"].breakfast
            document.getElementsByClassName("breakfast")[1].innerHTML = jsonData.Mon["IFC-B"].breakfast
            document.getElementsByClassName("breakfast")[2].innerHTML = jsonData.Mon["IFC-C"].breakfast
            document.getElementsByClassName("breakfast")[3].innerHTML = jsonData.Mon["LH"].breakfast

            document.getElementsByClassName("lunch")[0].innerHTML = jsonData.Mon["IFC-A"].lunch;
            document.getElementsByClassName("lunch")[1].innerHTML = jsonData.Mon["IFC-B"].lunch;
            document.getElementsByClassName("lunch")[2].innerHTML = jsonData.Mon["IFC-C"].lunch;
            document.getElementsByClassName("lunch")[3].innerHTML = jsonData.Mon["LH"].lunch;

            document.getElementsByClassName("dinner")[0].innerHTML = jsonData.Mon["IFC-A"].dinner;
            document.getElementsByClassName("dinner")[1].innerHTML = jsonData.Mon["IFC-B"].dinner;
            document.getElementsByClassName("dinner")[2].innerHTML = jsonData.Mon["IFC-C"].dinner;
            document.getElementsByClassName("dinner")[3].innerHTML = jsonData.Mon["LH"].dinner;
            //e.target.style.backgroundColor = "darkgreen";
        } else if (e.target.id == "tue" ) {
            setCurrentDay("tue")
            document.getElementsByClassName("breakfast")[0].innerHTML = jsonData.Tue["IFC-A"].breakfast
            document.getElementsByClassName("breakfast")[1].innerHTML = jsonData.Tue["IFC-B"].breakfast
            document.getElementsByClassName("breakfast")[2].innerHTML = jsonData.Tue["IFC-C"].breakfast
            document.getElementsByClassName("breakfast")[3].innerHTML = jsonData.Tue["LH"].breakfast

            document.getElementsByClassName("lunch")[0].innerHTML = jsonData.Tue["IFC-A"].lunch;
            document.getElementsByClassName("lunch")[1].innerHTML = jsonData.Tue["IFC-B"].lunch;
            document.getElementsByClassName("lunch")[2].innerHTML = jsonData.Tue["IFC-C"].lunch;
            document.getElementsByClassName("lunch")[3].innerHTML = jsonData.Tue["LH"].lunch;

            document.getElementsByClassName("dinner")[0].innerHTML = jsonData.Tue["IFC-A"].dinner;
            document.getElementsByClassName("dinner")[1].innerHTML = jsonData.Tue["IFC-B"].dinner;
            document.getElementsByClassName("dinner")[2].innerHTML = jsonData.Tue["IFC-C"].dinner;
            document.getElementsByClassName("dinner")[3].innerHTML = jsonData.Tue["LH"].dinner;
        } else if (e.target.id == "wed") {
            setCurrentDay("wed")
            // Change the day to Wednesday (replace "Tue" with "Wed")
            document.getElementsByClassName("breakfast")[0].innerHTML = jsonData.Wed["IFC-A"].breakfast;
            document.getElementsByClassName("breakfast")[1].innerHTML = jsonData.Wed["IFC-B"].breakfast;
            document.getElementsByClassName("breakfast")[2].innerHTML = jsonData.Wed["IFC-C"].breakfast;
            document.getElementsByClassName("breakfast")[3].innerHTML = jsonData.Wed["LH"].breakfast;

            document.getElementsByClassName("lunch")[0].innerHTML = jsonData.Wed["IFC-A"].lunch;
            document.getElementsByClassName("lunch")[1].innerHTML = jsonData.Wed["IFC-B"].lunch;
            document.getElementsByClassName("lunch")[2].innerHTML = jsonData.Wed["IFC-C"].lunch;
            document.getElementsByClassName("lunch")[3].innerHTML = jsonData.Wed["LH"].lunch;

            document.getElementsByClassName("dinner")[0].innerHTML = jsonData.Wed["IFC-A"].dinner;
            document.getElementsByClassName("dinner")[1].innerHTML = jsonData.Wed["IFC-B"].dinner;
            document.getElementsByClassName("dinner")[2].innerHTML = jsonData.Wed["IFC-C"].dinner;
            document.getElementsByClassName("dinner")[3].innerHTML = jsonData.Wed["LH"].dinner;

        } else if (e.target.id == "thu") {
            // Thursday
            setCurrentDay("thu")
            document.getElementsByClassName("breakfast")[0].innerHTML = jsonData.Thu["IFC-A"].breakfast;
            document.getElementsByClassName("breakfast")[1].innerHTML = jsonData.Thu["IFC-B"].breakfast;
            document.getElementsByClassName("breakfast")[2].innerHTML = jsonData.Thu["IFC-C"].breakfast;
            document.getElementsByClassName("breakfast")[3].innerHTML = jsonData.Thu["LH"].breakfast;

            document.getElementsByClassName("lunch")[0].innerHTML = jsonData.Thu["IFC-A"].lunch;
            document.getElementsByClassName("lunch")[1].innerHTML = jsonData.Thu["IFC-B"].lunch;
            document.getElementsByClassName("lunch")[2].innerHTML = jsonData.Thu["IFC-C"].lunch;
            document.getElementsByClassName("lunch")[3].innerHTML = jsonData.Thu["LH"].lunch;

            document.getElementsByClassName("dinner")[0].innerHTML = jsonData.Thu["IFC-A"].dinner;
            document.getElementsByClassName("dinner")[1].innerHTML = jsonData.Thu["IFC-B"].dinner;
            document.getElementsByClassName("dinner")[2].innerHTML = jsonData.Thu["IFC-C"].dinner;
            document.getElementsByClassName("dinner")[3].innerHTML = jsonData.Thu["LH"].dinner;

        } else if (e.target.id == "fri") {
            // Friday
            setCurrentDay("fri")
            document.getElementsByClassName("breakfast")[0].innerHTML = jsonData.Fri["IFC-A"].breakfast;
            document.getElementsByClassName("breakfast")[1].innerHTML = jsonData.Fri["IFC-B"].breakfast;
            document.getElementsByClassName("breakfast")[2].innerHTML = jsonData.Fri["IFC-C"].breakfast;
            document.getElementsByClassName("breakfast")[3].innerHTML = jsonData.Fri["LH"].breakfast;

            document.getElementsByClassName("lunch")[0].innerHTML = jsonData.Fri["IFC-A"].lunch;
            document.getElementsByClassName("lunch")[1].innerHTML = jsonData.Fri["IFC-B"].lunch;
            document.getElementsByClassName("lunch")[2].innerHTML = jsonData.Fri["IFC-C"].lunch;
            document.getElementsByClassName("lunch")[3].innerHTML = jsonData.Fri["LH"].lunch;

            document.getElementsByClassName("dinner")[0].innerHTML = jsonData.Fri["IFC-A"].dinner;
            document.getElementsByClassName("dinner")[1].innerHTML = jsonData.Fri["IFC-B"].dinner;
            document.getElementsByClassName("dinner")[2].innerHTML = jsonData.Fri["IFC-C"].dinner;
            document.getElementsByClassName("dinner")[3].innerHTML = jsonData.Fri["LH"].dinner;

        } else if (e.target.id == "sat") {
            // Saturday
            setCurrentDay("sat")
            document.getElementsByClassName("breakfast")[0].innerHTML = jsonData.Sat["IFC-A"].breakfast;
            document.getElementsByClassName("breakfast")[1].innerHTML = jsonData.Sat["IFC-B"].breakfast;
            document.getElementsByClassName("breakfast")[2].innerHTML = jsonData.Sat["IFC-C"].breakfast;
            document.getElementsByClassName("breakfast")[3].innerHTML = jsonData.Sat["LH"].breakfast;

            document.getElementsByClassName("lunch")[0].innerHTML = jsonData.Sat["IFC-A"].lunch;
            document.getElementsByClassName("lunch")[1].innerHTML = jsonData.Sat["IFC-B"].lunch;
            document.getElementsByClassName("lunch")[2].innerHTML = jsonData.Sat["IFC-C"].lunch;
            document.getElementsByClassName("lunch")[3].innerHTML = jsonData.Sat["LH"].lunch;

            document.getElementsByClassName("dinner")[0].innerHTML = jsonData.Sat["IFC-A"].dinner;
            document.getElementsByClassName("dinner")[1].innerHTML = jsonData.Sat["IFC-B"].dinner;
            document.getElementsByClassName("dinner")[2].innerHTML = jsonData.Sat["IFC-C"].dinner;
            document.getElementsByClassName("dinner")[3].innerHTML = jsonData.Sat["LH"].dinner;

        } else if (e.target.id == "sun") {
            // Sunday
            setCurrentDay("sun")
            document.getElementsByClassName("breakfast")[0].innerHTML = jsonData.Sun["IFC-A"].breakfast;
            document.getElementsByClassName("breakfast")[1].innerHTML = jsonData.Sun["IFC-B"].breakfast;
            document.getElementsByClassName("breakfast")[2].innerHTML = jsonData.Sun["IFC-C"].breakfast;
            document.getElementsByClassName("breakfast")[3].innerHTML = jsonData.Sun["LH"].breakfast;

            document.getElementsByClassName("lunch")[0].innerHTML = jsonData.Sun["IFC-A"].lunch;
            document.getElementsByClassName("lunch")[1].innerHTML = jsonData.Sun["IFC-B"].lunch;
            document.getElementsByClassName("lunch")[2].innerHTML = jsonData.Sun["IFC-C"].lunch;
            document.getElementsByClassName("lunch")[3].innerHTML = jsonData.Sun["LH"].lunch;

            document.getElementsByClassName("dinner")[0].innerHTML = jsonData.Sun["IFC-A"].dinner;
            document.getElementsByClassName("dinner")[1].innerHTML = jsonData.Sun["IFC-B"].dinner;
            document.getElementsByClassName("dinner")[2].innerHTML = jsonData.Sun["IFC-C"].dinner;
            document.getElementsByClassName("dinner")[3].innerHTML = jsonData.Sun["LH"].dinner;
        }
    };

    //////////////////////

    const defaultDay = () => {
        if (currentDay == "mon") {
            console.log("Mon"); 
            document.getElementsByClassName("breakfast")[0].innerHTML = jsonData.Mon["IFC-A"].breakfast
            document.getElementsByClassName("breakfast")[1].innerHTML = jsonData.Mon["IFC-B"].breakfast
            document.getElementsByClassName("breakfast")[2].innerHTML = jsonData.Mon["IFC-C"].breakfast
            document.getElementsByClassName("breakfast")[3].innerHTML = jsonData.Mon["LH"].breakfast

            document.getElementsByClassName("lunch")[0].innerHTML = jsonData.Mon["IFC-A"].lunch;
            document.getElementsByClassName("lunch")[1].innerHTML = jsonData.Mon["IFC-B"].lunch;
            document.getElementsByClassName("lunch")[2].innerHTML = jsonData.Mon["IFC-C"].lunch;
            document.getElementsByClassName("lunch")[3].innerHTML = jsonData.Mon["LH"].lunch;

            document.getElementsByClassName("dinner")[0].innerHTML = jsonData.Mon["IFC-A"].dinner;
            document.getElementsByClassName("dinner")[1].innerHTML = jsonData.Mon["IFC-B"].dinner;
            document.getElementsByClassName("dinner")[2].innerHTML = jsonData.Mon["IFC-C"].dinner;
            document.getElementsByClassName("dinner")[3].innerHTML = jsonData.Mon["LH"].dinner;
            //e.target.style.backgroundColor = "darkgreen";
        } else if (currentDay == "tue" ) {
            console.log("Tue");

            document.getElementsByClassName("breakfast")[0].innerHTML = jsonData.Tue["IFC-A"].breakfast
            document.getElementsByClassName("breakfast")[1].innerHTML = jsonData.Tue["IFC-B"].breakfast
            document.getElementsByClassName("breakfast")[2].innerHTML = jsonData.Tue["IFC-C"].breakfast
            document.getElementsByClassName("breakfast")[3].innerHTML = jsonData.Tue["LH"].breakfast

            document.getElementsByClassName("lunch")[0].innerHTML = jsonData.Tue["IFC-A"].lunch;
            document.getElementsByClassName("lunch")[1].innerHTML = jsonData.Tue["IFC-B"].lunch;
            document.getElementsByClassName("lunch")[2].innerHTML = jsonData.Tue["IFC-C"].lunch;
            document.getElementsByClassName("lunch")[3].innerHTML = jsonData.Tue["LH"].lunch;

            document.getElementsByClassName("dinner")[0].innerHTML = jsonData.Tue["IFC-A"].dinner;
            document.getElementsByClassName("dinner")[1].innerHTML = jsonData.Tue["IFC-B"].dinner;
            document.getElementsByClassName("dinner")[2].innerHTML = jsonData.Tue["IFC-C"].dinner;
            document.getElementsByClassName("dinner")[3].innerHTML = jsonData.Tue["LH"].dinner;
        } else if (currentDay == "wed") {
            console.log("Wed");
            // Change the day to Wednesday (replace "Tue" with "Wed")
            document.getElementsByClassName("breakfast")[0].innerHTML = jsonData.Wed["IFC-A"].breakfast;
            document.getElementsByClassName("breakfast")[1].innerHTML = jsonData.Wed["IFC-B"].breakfast;
            document.getElementsByClassName("breakfast")[2].innerHTML = jsonData.Wed["IFC-C"].breakfast;
            document.getElementsByClassName("breakfast")[3].innerHTML = jsonData.Wed["LH"].breakfast;

            document.getElementsByClassName("lunch")[0].innerHTML = jsonData.Wed["IFC-A"].lunch;
            document.getElementsByClassName("lunch")[1].innerHTML = jsonData.Wed["IFC-B"].lunch;
            document.getElementsByClassName("lunch")[2].innerHTML = jsonData.Wed["IFC-C"].lunch;
            document.getElementsByClassName("lunch")[3].innerHTML = jsonData.Wed["LH"].lunch;

            document.getElementsByClassName("dinner")[0].innerHTML = jsonData.Wed["IFC-A"].dinner;
            document.getElementsByClassName("dinner")[1].innerHTML = jsonData.Wed["IFC-B"].dinner;
            document.getElementsByClassName("dinner")[2].innerHTML = jsonData.Wed["IFC-C"].dinner;
            document.getElementsByClassName("dinner")[3].innerHTML = jsonData.Wed["LH"].dinner;

        } else if (currentDay == "thu") {
            console.log("Thu");

            // Thursday
            document.getElementsByClassName("breakfast")[0].innerHTML = jsonData.Thu["IFC-A"].breakfast;
            document.getElementsByClassName("breakfast")[1].innerHTML = jsonData.Thu["IFC-B"].breakfast;
            document.getElementsByClassName("breakfast")[2].innerHTML = jsonData.Thu["IFC-C"].breakfast;
            document.getElementsByClassName("breakfast")[3].innerHTML = jsonData.Thu["LH"].breakfast;

            document.getElementsByClassName("lunch")[0].innerHTML = jsonData.Thu["IFC-A"].lunch;
            document.getElementsByClassName("lunch")[1].innerHTML = jsonData.Thu["IFC-B"].lunch;
            document.getElementsByClassName("lunch")[2].innerHTML = jsonData.Thu["IFC-C"].lunch;
            document.getElementsByClassName("lunch")[3].innerHTML = jsonData.Thu["LH"].lunch;

            document.getElementsByClassName("dinner")[0].innerHTML = jsonData.Thu["IFC-A"].dinner;
            document.getElementsByClassName("dinner")[1].innerHTML = jsonData.Thu["IFC-B"].dinner;
            document.getElementsByClassName("dinner")[2].innerHTML = jsonData.Thu["IFC-C"].dinner;
            document.getElementsByClassName("dinner")[3].innerHTML = jsonData.Thu["LH"].dinner;

        } else if (currentDay == "fri") {
            console.log("Fri");

            // Friday
            document.getElementsByClassName("breakfast")[0].innerHTML = jsonData.Fri["IFC-A"].breakfast;
            document.getElementsByClassName("breakfast")[1].innerHTML = jsonData.Fri["IFC-B"].breakfast;
            document.getElementsByClassName("breakfast")[2].innerHTML = jsonData.Fri["IFC-C"].breakfast;
            document.getElementsByClassName("breakfast")[3].innerHTML = jsonData.Fri["LH"].breakfast;

            document.getElementsByClassName("lunch")[0].innerHTML = jsonData.Fri["IFC-A"].lunch;
            document.getElementsByClassName("lunch")[1].innerHTML = jsonData.Fri["IFC-B"].lunch;
            document.getElementsByClassName("lunch")[2].innerHTML = jsonData.Fri["IFC-C"].lunch;
            document.getElementsByClassName("lunch")[3].innerHTML = jsonData.Fri["LH"].lunch;

            document.getElementsByClassName("dinner")[0].innerHTML = jsonData.Fri["IFC-A"].dinner;
            document.getElementsByClassName("dinner")[1].innerHTML = jsonData.Fri["IFC-B"].dinner;
            document.getElementsByClassName("dinner")[2].innerHTML = jsonData.Fri["IFC-C"].dinner;
            document.getElementsByClassName("dinner")[3].innerHTML = jsonData.Fri["LH"].dinner;

        } else if (currentDay == "sat") {
            console.log("Sat");

            // Saturday
            document.getElementsByClassName("breakfast")[0].innerHTML = jsonData.Sat["IFC-A"].breakfast;
            document.getElementsByClassName("breakfast")[1].innerHTML = jsonData.Sat["IFC-B"].breakfast;
            document.getElementsByClassName("breakfast")[2].innerHTML = jsonData.Sat["IFC-C"].breakfast;
            document.getElementsByClassName("breakfast")[3].innerHTML = jsonData.Sat["LH"].breakfast;

            document.getElementsByClassName("lunch")[0].innerHTML = jsonData.Sat["IFC-A"].lunch;
            document.getElementsByClassName("lunch")[1].innerHTML = jsonData.Sat["IFC-B"].lunch;
            document.getElementsByClassName("lunch")[2].innerHTML = jsonData.Sat["IFC-C"].lunch;
            document.getElementsByClassName("lunch")[3].innerHTML = jsonData.Sat["LH"].lunch;

            document.getElementsByClassName("dinner")[0].innerHTML = jsonData.Sat["IFC-A"].dinner;
            document.getElementsByClassName("dinner")[1].innerHTML = jsonData.Sat["IFC-B"].dinner;
            document.getElementsByClassName("dinner")[2].innerHTML = jsonData.Sat["IFC-C"].dinner;
            document.getElementsByClassName("dinner")[3].innerHTML = jsonData.Sat["LH"].dinner;

        } else if (currentDay == "sun") {
            console.log("Sun");

            // Sunday
            document.getElementsByClassName("breakfast")[0].innerHTML = jsonData.Sun["IFC-A"].breakfast;
            document.getElementsByClassName("breakfast")[1].innerHTML = jsonData.Sun["IFC-B"].breakfast;
            document.getElementsByClassName("breakfast")[2].innerHTML = jsonData.Sun["IFC-C"].breakfast;
            document.getElementsByClassName("breakfast")[3].innerHTML = jsonData.Sun["LH"].breakfast;

            document.getElementsByClassName("lunch")[0].innerHTML = jsonData.Sun["IFC-A"].lunch;
            document.getElementsByClassName("lunch")[1].innerHTML = jsonData.Sun["IFC-B"].lunch;
            document.getElementsByClassName("lunch")[2].innerHTML = jsonData.Sun["IFC-C"].lunch;
            document.getElementsByClassName("lunch")[3].innerHTML = jsonData.Sun["LH"].lunch;

            document.getElementsByClassName("dinner")[0].innerHTML = jsonData.Sun["IFC-A"].dinner;
            document.getElementsByClassName("dinner")[1].innerHTML = jsonData.Sun["IFC-B"].dinner;
            document.getElementsByClassName("dinner")[2].innerHTML = jsonData.Sun["IFC-C"].dinner;
            document.getElementsByClassName("dinner")[3].innerHTML = jsonData.Sun["LH"].dinner;

        }

    };

    const getBackgroundColor = (day) => {
        if (day == currentDay) {
            return "#0a8ecb"
        } else {
            return "#1777a3"
        }
    }

    ///////////////////
    
    useEffect(() => {
        defaultDay();
    }, []);

      ///////////////////
    return (
        <div className="mess_menu">
            <div className="days">
                <button id="mon" onClick={changeDay} style={{ backgroundColor: getBackgroundColor("mon") }}>Mon</button>
                <button id="tue" onClick={changeDay} style={{ backgroundColor: getBackgroundColor("tue") }}>Tue</button>
                <button id="wed" onClick={changeDay} style={{ backgroundColor: getBackgroundColor("wed") }}>Wed</button>
                <button id="thu" onClick={changeDay} style={{ backgroundColor: getBackgroundColor("thu") }}>Thu</button>
                <button id="fri" onClick={changeDay} style={{ backgroundColor: getBackgroundColor("fri") }}>Fri</button>
                <button id="sat" onClick={changeDay} style={{ backgroundColor: getBackgroundColor("sat") }}>Sat</button>
                <button id="sun" onClick={changeDay} style={{ backgroundColor: getBackgroundColor("sun") }}>Sun</button>
            </div>
            <div className="mess_name">
                <div className="info">
                    <p className="mess_heading"><b>IFC-A</b></p>
                </div>
                <table class="menu">
                    <tr>
                        <th>Breakfast</th>
                        <th>Lunch</th>
                        <th>Dinner</th>
                    </tr>
                    <tr>
                        <td className = "breakfast">Poori, aalu curry, break, some shit some shit.Poori, aalu curry, break, some shit some shit</td>
                        <td className = "lunch">Channa, rice, roti, some shit some shit.Poori, aalu curry, break, some shit some shit</td>
                        <td className = "dinner">Someshit, someshit, someshit, someshit.Poori, aalu curry, break, some shit some shit</td>
                    </tr>
                </table>
            </div>
            <div className="mess_name">
                <div className="info">
                    <p className="mess_heading"><b>IFC-B</b></p>
                </div>
                <table class="menu">
                    <tr>
                        <th>Breakfast</th>
                        <th>Lunch</th>
                        <th>Dinner</th>
                    </tr>
                    <tr>
                        <td className = "breakfast">Poori, aalu curry, break, some shit some shit.Poori, aalu curry, break, some shit some shit</td>
                        <td className = "lunch">Channa, rice, roti, some shit some shit.Poori, aalu curry, break, some shit some shit</td>
                        <td className = "dinner">Someshit, someshit, someshit, someshit.Poori, aalu curry, break, some shit some shit</td>
                    </tr>
                </table>
            </div>
            <div className="mess_name">
                <div className="info">
                    <p className="mess_heading"><b>IFC-C</b></p>
                </div>
                <table class="menu">
                    <tr>
                        <th>Breakfast</th>
                        <th>Lunch</th>
                        <th>Dinner</th>
                    </tr>
                    <tr>
                        <td className = "breakfast">Poori, aalu curry, break, some shit some shit.Poori, aalu curry, break, some shit some shit</td>
                        <td className = "lunch">Channa, rice, roti, some shit some shit.Poori, aalu curry, break, some shit some shit</td>
                        <td className = "dinner">Someshit, someshit, someshit, someshit.Poori, aalu curry, break, some shit some shit</td>
                    </tr>
                </table>
            </div>
            <div className="mess_name">
                <div className="info">
                    <p className="mess_heading"><b>LH</b>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                </div>
                <table class="menu">
                    <tr>
                        <th>Breakfast</th>
                        <th>Lunch</th>
                        <th>Dinner</th>
                    </tr>
                    <tr>
                        <td className = "breakfast">Poori, aalu curry, break, some shit some shit.Poori, aalu curry, break, some shit some shit</td>
                        <td className = "lunch">Channa, rice, roti, some shit some shit.Poori, aalu curry, break, some shit some shit</td>
                        <td className = "dinner">Someshit, someshit, someshit, someshit.Poori, aalu curry, break, some shit some shit</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default Menu;


