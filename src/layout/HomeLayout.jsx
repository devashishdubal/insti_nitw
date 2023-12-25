import Topbar from "../components/topbar/Topbar"

const HomeLayout = ({ buttonSelect, clickFunction, left, right }) => {
  return (
    <div className="full_app">
      <div className="side">
        {left}
      </div>
      <div className="main">
        <Topbar buttonSelect={buttonSelect} clickFunction={clickFunction} />
        <div className="center scrollbar scrollbar-primary">
          {right}
          <div class="force-overflow"></div> {/*scrollbar*/}
        </div>
      </div>
    </div>
  );
}

export default HomeLayout;