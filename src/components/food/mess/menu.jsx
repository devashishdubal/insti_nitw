import "./menu.css"

const Menu = () => {
    const changeDay = (e) => {
        if (e.target.id == "mon") {
            console.log("Mon");
            //e.target.style.backgroundColor = "darkgreen";
        } else if (e.target.id == "tue") {
            console.log("Tue");
        } else if (e.target.id == "wed") {
            console.log("Wed");
        } else if (e.target.id == "thu") {
            console.log("Thu");
        } else if (e.target.id == "fri") {
            console.log("Fri");
        } else if (e.target.id == "sat") {
            console.log("Sat");
        } else if (e.target.id == "sun") {
            console.log("Sun");
        }
        
    }

    return (
        <div className="mess_menu">
            <div className="days">
                <button id="mon" onClick={changeDay}>Mon</button>
                <button id="tue" onClick={changeDay}>Tue</button>
                <button id="wed" onClick={changeDay}>Wed</button>
                <button id="thu" onClick={changeDay}>Thu</button>
                <button id="fri" onClick={changeDay}>Fri</button>
                <button id="sat" onClick={changeDay}>Sat</button>
                <button id="sun" onClick={changeDay}>Sun</button>
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
                        <td>Poori, aalu curry, break, some shit some shit.Poori, aalu curry, break, some shit some shit</td>
                        <td>Channa, rice, roti, some shit some shit.Poori, aalu curry, break, some shit some shit</td>
                        <td>Someshit, someshit, someshit, someshit.Poori, aalu curry, break, some shit some shit</td>
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
                        <td>Poori, aalu curry, break, some shit some shit.Poori, aalu curry, break, some shit some shit</td>
                        <td>Channa, rice, roti, some shit some shit.Poori, aalu curry, break, some shit some shit</td>
                        <td>Someshit, someshit, someshit, someshit.Poori, aalu curry, break, some shit some shit</td>
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
                        <td>Poori, aalu curry, break, some shit some shit.Poori, aalu curry, break, some shit some shit</td>
                        <td>Channa, rice, roti, some shit some shit.Poori, aalu curry, break, some shit some shit</td>
                        <td>Someshit, someshit, someshit, someshit.Poori, aalu curry, break, some shit some shit</td>
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
                        <td>Poori, aalu curry, break, some shit some shit.Poori, aalu curry, break, some shit some shit</td>
                        <td>Channa, rice, roti, some shit some shit.Poori, aalu curry, break, some shit some shit</td>
                        <td>Someshit, someshit, someshit, someshit.Poori, aalu curry, break, some shit some shit</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default Menu;