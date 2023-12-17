import Topbar from "../components/topbar/Topbar"
import Sidebar from "../components/sidebar/sidebar"

import "./home.css"

export default function Home() {
  return (
    <>
    <div className="full_app">
      <div className="top">
        <Topbar />
      </div>
      <div className="main">
        <div className="side">
          <Sidebar/>
        </div>
        <div className="center">
          <h1>Main area</h1>
        </div>
      </div>
    </div>
    </>
  )
}