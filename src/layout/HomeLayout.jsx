import Topbar from "../components/topbar/Topbar"

const HomeLayout = ({buttonSelect,clickFunction,left,right}) => {
  return (
    <div className="full_app">
      <Topbar buttonSelect={buttonSelect} clickFunction={clickFunction} />
      <div className="main">
          <div className="side">
              {left}
          </div>
          <div className="center">
            {right}
          </div>
        </div>
    </div>
  );
}

export default HomeLayout;