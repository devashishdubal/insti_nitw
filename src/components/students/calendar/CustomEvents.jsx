import "./CustomEvents.css";

const CustomEvents = () => {
    return (
        <>
            <form action="https://httpbin.org/post" method="post">
                <div className="custom-wrapper">
                    <div className="custom-desc"> Add Custom Event</div>
                    <div className="label-container custom-wrapper-inner-container">
                        <div className="desc">Label:</div>
                        <div className="label-color-container">
                            <div className="label-color" id="label-color-purple"></div>
                            <div className="label-color" id="label-color-green"></div>
                            <div className="label-color" id="label-color-blue"></div>
                            <input className="label-color" type="color" name="color" />
                        </div>
                    </div>
                    <div className="title-container custom-wrapper-inner-container">
                        <label for="title" className="desc">Title:</label>
                        <input type="text" id="title" name="title" />
                    </div>
                    <div className="time-submit-container custom-wrapper-inner-container">
                        <div className="time-container">
                            <label for="time" className="desc">Time:</label>
                            <input type="time" id="time" name="time" />
                        </div>
                        <button class="submit" type="submit">Add</button>
                    </div>
                </div>
            </form>
        </ >
    )
}

export default CustomEvents