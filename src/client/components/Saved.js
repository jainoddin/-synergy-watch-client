import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import apilist from "../../apilist/Apilist";

const Saved = () => {
  const [videosArray, setVideoarray] = useState([]);
  const navigate = useNavigate();
  const [input, setinput] = useState("");

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`${apilist.SavedVideos}`);
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

export default Saved;