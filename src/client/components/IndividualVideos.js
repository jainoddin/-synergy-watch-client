import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "./Sidebar";
import ReactPlayer from "react-player";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import { ToastContainer, toast } from "react-toastify";
import "./IndividualVideos.css";
import apilist from "../../apilist/Apilist";

const IndividualVideo = () => {
  const [videoDetails, setVideoDetails] = useState({
    savedStatus: "Not saved",
  });

  useEffect(() => {
    fetchIindividualVideo();
  }, []);
  const { id } = useParams();
  console.log(id);

  const fetchIindividualVideo = async (req, res) => {
    try {
      const response = await axios.get(
        `${apilist.individualvideo}/${id}`
      );
      setVideoDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlelikeSave = async () => {
    console.log(`Updating video with ID: ${videoDetails._id}`);
    try {
      const response = await axios.put(
        `${apilist.updatelikevideo}${videoDetails._id}?liked=true`
      );
      console.log("Success:", response);
      toast.success("Video like Successfully");

      

      window.location.reload();


    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleSavedStatus = async () => {
    const newStatus = videoDetails.saved === "Saved" ? "Unsaved" : "Saved";

    setVideoDetails({ ...videoDetails, saved: newStatus });

    try {
      const response = await axios.put(
        `${apilist.savevideostatus}${id}/save`,
        { saved: newStatus }
      );
      console.log(response);
      window.location.reload();


      // Update the icon based on the new status
     
    } catch (error) {
      console.log(error);
    }
  };

  const handledislikeSave = async () => {
    console.log(`Updating video with ID: ${videoDetails._id}`);
    try {
      const response = await axios.put(
        `${apilist.updateunlikevideo}${videoDetails._id}?liked=false`
      );
      console.log("Success:", response);
      toast.error("Video Dislike Successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log(videoDetails.liked);

  useEffect(() => {
    fetchIindividualVideo();
  }, []);

  console.log(videoDetails);

  return (
    <div>
      <ToastContainer></ToastContainer>
      <section className="nav_bar_component">
        <Navbar />
      </section>
      <section className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div
            className="col-md-9 container"
            style={{
              position: "absolute",
              top: "15%",
              left: "22%",
              width: "100%",
            }}
          >
            <div className="col-12 vh">
              {/* <ReactPlayer
                url={videoUrl}
                controls
                width="100%"
                height="475px"
                className="mt-4"
              /> */}
              <ReactPlayer
                url={videoDetails.video_url}
                width={"80%"}
                height={"400px"}
              />
            </div>
            <div className="col-12 cc">
              <p className="mt-3">{videoDetails.video_title}</p>
            </div>
            <div className="col-4">
              <div className="d-flex justify-content-space-between">
                <p className="mx-2">{videoDetails.subscribers}</p>
                <p className="mx-2">{videoDetails.published_date}</p>

                <div className="d-flex justify-content-space-between">
                  <button
                    className="mx-2"
                    style={{
                      position: "absolute",
                      left: "175%",
                      border: "none",
                      backgroundColor: "white",
                      display:"flex"
                    }} id="likebtn"
                    onClick={handlelikeSave}
                  >
                    {videoDetails.liked === "true" ? (
                      <span id="color1">
                        <i class="ri-thumb-up-fill" id="i"></i>
                      </span>
                    ) : (
                      <>
                        {" "}
                        <i class="ri-thumb-up-fill" id="i"></i>
                      </>
                    )}
                    Like
                  </button>
                  <button
                    className="mx-2"
                    style={{
                      position: "absolute",
                      left: "190%",
                      border: "none",
                      backgroundColor: "white",
                      display:"flex"

                    }}
                    onClick={handledislikeSave}
                  >
                    <i class="ri-thumb-down-fill"></i>Dislike
                  </button>
                  <button
                    className="mx-0"
                    style={{
                      position: "absolute",
                      left: "210%",
                      border: "none",
                      backgroundColor: "white",
                      display:"flex"

                    }}
                    onClick={toggleSavedStatus}
                    id="save-icon"
                  >
                     {videoDetails.saved === "Saved" ? (
                      <>
                     <p>
                        <i className = "ri-bookmark-2-fill" id="i">Unsaved</i>
                        </p>
                        </>
                      
                    ) : (
                      <>
                        {" "}
                        <i className ="fa-regular fa-floppy-disk"></i> <p id="saved2">saved</p>
                      </>
                    )}
                    
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="d-flex">
                <div>
                  <img
                    src={videoDetails.channel_logo}
                    style={{ height: "50px" }}
                  />
                </div>
                <div>
                  <p
                    className="m-0"
                    style={{
                      display: "flex",
                      justifycontent: "flex-start",
                      paddingLeft: "10px",
                    }}
                  >
                    {videoDetails.channel_name}
                  </p>
                  <p
                    className="m-0"
                    style={{
                      display: "flex",
                      justifycontent: "flex-start",
                      paddingLeft: "10px",
                    }}
                  >
                    {videoDetails.views_count}
                  </p>
                  <p
                    className="m-0"
                    style={{
                      display: "flex",
                      justifycontent: "flex-start",
                      paddingLeft: "10px",
                    }}
                  >
                    {videoDetails.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndividualVideo;
