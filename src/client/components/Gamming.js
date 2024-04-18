import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import './Gamming.css'

import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import apilist from "../../apilist/Apilist";

const Gamming = () => {
  const [videosArray, setVideoarray] = useState([]);
  const navigate = useNavigate();
  const [input, setinput] = useState("");

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`${apilist.gamingvideos}`);
      console.log(response.data);
      setVideoarray(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const token = Cookies.get("jwtAuth");
  console.log(token);

  useEffect(() => {
    if (token === undefined) {
      navigate("/auth");
    }
  }, []);

  const changeBackgroundColor = () => {
    document.body.style.backgroundColor = "black";
  };
  const [isSun, setIsSun] = useState(true);

  const toggleIcon = () => {
    setIsSun(!isSun);
    changeBackgroundColor();
  };

  const [isDark, setIsDark] = useState(false);

  const toggleBackgroundColor = () => {
    document.body.style.backgroundColor = isDark ? "white" : "black";
    setIsDark(!isDark);
  };

  // console.log(videosArray);
  const fetchinputdata = (value) => {
    const filteredVideos = videosArray.filter((video) => {
      return (
        value &&
        video &&
        video.video_title &&
        video.video_title.toLowerCase().includes(value)
      );
    });
    setVideoarray(filteredVideos);
  };
  const handlechange = (value) => {
    setinput(value);
    fetchinputdata(value);
  };

  return (
    <div id="home-container">
      <section className="nav_bar_component">
        <Navbar
          isSun={isSun}
          changeBackgroundColor={changeBackgroundColor}
          toggleBackgroundColor={toggleBackgroundColor}
          toggleIcon={toggleIcon}
        />{" "}
      </section>
      <section className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9 container" id="a">
            <section className="banner_component text-center d-flex align-items-center  justify-content-center">
            <div className="search-box">    
      <video src="https://kstatic.googleusercontent.com/files/cd309304baa17fce6fa26b0c4af0a75240cb1bb52f766348450db944c1fc3225f587115aa2328a8bab794c3904d025434a5eeabae4458ab31a55ac51210bb43d" autoPlay loop muted></video>
      <div className="search-main">
        <div className="headline">
          <h1>Grow your business with  <span class="logo" id="c">Synergy</span>WATCH ads
            </h1>
        </div>
       
      </div>
    </div>
            </section>

            <section className="input_group_search container my-5">
              <div class="input-group mb-3 py">
                <input
                  type="text"
                  id="myTextbox"
                  class="form-control py-4 ml-5 "
                  placeholder="Search ....."
                  value={input}
                  onChange={(e) => handlechange(e.target.value)}
                />
                <div
                  class="input-group-append mr-5"
                  style={{ position: "relative", top: "7px", height: "51px" }}
                >
                  <span
                    class="input-group-text btn-outline-secondary"
                    id="basic-addon2"
                  >
                    Search
                  </span>
                </div>
              </div>
            </section>

            <section className="thumbnails_layout">
              <div className="container">
                <div className="row">
                  {videosArray.map((video) => (
                    <div className="col-md-4 my-3">
                      <Link to={`/video/${video._id}`}>
                        <div className="thumbnail_image">
                          <img style={{width:"60%"}} src={video.thumbnail_url} />
                        </div>

                        <div className="home_thumbnail_title">
                          <h6 className={`my-3 ${isDark ? "white-text" : ""}`}>
                            {video.video_title}
                          </h6>{" "}
                        </div>

                        <div className="home_channel_description d-flex">
                          <div className="channel_log">
                            <img
                              src={video.channel_logo}
                              className="w-75 img"
                            />
                          </div>

                          <div className="channel_description ">
                            <p>{video.channel_name}</p>
                            <p>{video.subscribers}</p>
                            <p>{video.published_date}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gamming;