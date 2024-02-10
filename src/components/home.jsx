import React, { useState } from "react";
import { BsStars } from "react-icons/bs";
import { BiPhotoAlbum } from "react-icons/bi";
import { GoVideo } from "react-icons/go";
import { FiSend } from "react-icons/fi";
import { MdMoreTime } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import InputEmoji from "react-input-emoji";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import user from "../assets/images/image.jpg";
import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { RiShareForwardLine } from "react-icons/ri";
import axios from 'axios';

function Home() {

const [name, setName] = useState("Barista's Café");
  const [selectedValue, setSelectedValue] = useState("");
  const [text, setText] = useState("");
  const [selectedFiles, setselectedFiles] = useState([]);
  const [imagelocale, setImageLocale] = useState();
  const [image, setImage] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [filesArray, setfilesArray] = useState([]);

  const handleVideoChange = (event) => {
    const selectedFiles = event.target.files;
    const filesArray = Array.from(event.target.files);

    //setselectedFiles(filesArray);

    const videoFile = filesArray.find((file) => file.type.startsWith("video/"));
    setVideoFile(videoFile);

    console.log('Selected files:', filesArray);
    console.log('Selected video:', videoFile);
  };

  const handleFilesChange = (event) => {

    setselectedFiles(Array.from(event.target.files));
    console.log('Selected files:', filesArray);
    console.log("hel");
  };

  const handleFileChange = (e) => {
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    setImage(file);
    reader.onloadend = function () {
      setImageLocale(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
   
  };

  const handleinputchange = (event) => {
    const inputValue = event;
    setText(inputValue);
  };

  const handleOnEnter = (text) => {
    console.log("enter", text);
  };

  const postData = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/generate-profile', {
        content: text,
      });

       setText(response.data.data);
      // setError(null);
      console.log(response.data);
    } catch (err) {
      
      setError(err.response.data.message); 
      setResponseData(null);
    }
  };
  const handleResetSelection = () => {
    setselectedFiles([]);
    setVideoFile('');

  };

  const handleDeleteMedia = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setselectedFiles(updatedFiles);
    setVideoFile();
    setImage();
    setImageLocale();
    console.log(imagelocale)
  };







  return (
    <div className="row">
    <div className="col-md-6">
      <div className="mb-3">
        <div className="cadre">
          <h6 className="title">Post in</h6>
          <div>
            <select
              className="form-select"
              value={selectedValue}
              onChange={handleDropdownChange}
            >
              <option value="">Sélectionnez un compte</option>
              <option value="BaristasCafe">
               <span style={{ fontWeight: 'bold', color: '#A020F0' }}>Barista's Café</span>{" "}
               <span style={{ color: 'gray' }}>@Barista's Coffeeshop</span>
              </option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="cadre">
          <h6 className="title">Post details</h6>
          <p className="description">
            Personnaliser la publication pour Facebook et Instagram
          </p>
          <div>
            <p className="">Enter a query here</p>
            <InputEmoji
              value={text}
              onChange={handleinputchange}
              height={150}
              shouldReturnKey={true}
              maxLength={50}
              placeholder="Add tags"
            />
            <p className="description">Your text must not exceed 40 words</p>
            <div className="line"></div>
            <div className="d-flex justify-content-end">
              <button className="cancel me-2">Cancel</button>
              <button className="active" onClick={postData}>
                <BsStars />
                Génerate
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="cadre">
          <h6 className="title">Multimedia content</h6>
          <p className="description">
            Share photos or video, Instagram posts cannot exceed 10 photos
          </p>
          <div className="d-flex ">
            <label
              htmlFor="select-image"
              className="d-flex buttons align-items-center"
           
            >
              <input
                onChange={handleFileChange}
                type="file"
                id="select-image"
                style={{ display: "none" }}
              />
              <MdOutlineAddPhotoAlternate
                style={{ color: "#A020F0" }}
                className="mx-1"
              />
              Add photo
            </label>

            <label htmlFor='select-images' className='d-flex ms-3 buttons align-items-center' >
              <input
                onChange={handleFilesChange}
                type='file'
                id='select-images'
                multiple
                style={{ display: 'none' }}
              />
              <BiPhotoAlbum style={{ color: "#A020F0" }} className="mx-1" />
              Add album
            </label>

            <label htmlFor="select-video" className="buttons ms-3 d-flex align-items-center" onClick={handleResetSelection}>
              <input
                onChange={handleVideoChange}
                type="file"
                id="select-video"
                accept="video/*"
                style={{ display: 'none' }}
              />
              <GoVideo style={{ color: '#A020F0' }} className="mx-1" />
              Add video
            </label>
          </div>
        </div>
      </div>


      <div className="mb-3">
        <div className="cadre">
          <h6 className="title">Programming options</h6>
          <div className="d-flex ">
            <button className="d-flex   active align-items-center">
              <FiSend className="mx-1" />
              Publier
            </button>
            <button className="ms-3 buttons d-flex align-items-center">
              <MdMoreTime style={{ color: "#A020F0" }} className="mx-1" />
              Program
            </button>
            <button className=" ms-3  buttons d-flex align-items-center">
              <IoSaveOutline style={{ color: "#A020F0" }} className="mx-1" />
              Save as a draft
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="col-md-6">
      <div className="mb-3">
        <div className="cadre">
          <div className="d-flex mb-3 justify-content-between align-items-center">
            <h6 className="title  ">Post Preview</h6>
            <select
              className="form-select w-75 "
              value={selectedValue}
              onChange={handleDropdownChange}
            >
              <option value="en">Preview on facebook</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="line mb-3"></div>
          <div className="mb-3">
            <select
              className="form-select"
              value={selectedValue}
              onChange={handleDropdownChange}
            >
              <option value="en">Barista's Chart Default Model</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="cadre">
            <div className="user">
              <div className="d-flex">
                <div className="avatar-container online">
                  <img src={user} alt="User Avatar" className="avatar-img" />
                  <div className="online-indicator"></div>
                </div>
                <div className="ms-2">
                  <h6 className="name-user">Barista's Café</h6>
                  <span className="online-time">A l'instant</span>
                </div>
              </div>
              <div>
                <p className="description-post">
                  {text}
                  {videoFile && (
                  <div className="media-container">
                    <video width="100%" height="auto" controls>
                      <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
                      Your browser does not support the video tag.
                    </video>
                    <button className="delete-overlay" onClick={() => handleDeleteMedia()}>
                      X
                    </button>
                  </div>
                )}
                {imagelocale && (
                    <div className="media-container">
                      <img src={imagelocale} className="one-photo" />
                      <button className="delete-overlay" onClick={() => handleDeleteMedia()}>
                        X
                      </button>
                    </div>
                  )}
                  {selectedFiles.map((file, index) => (
                    
                    <div key={index} className="media-container">
                         <button className="delete-album" onClick={() => handleDeleteMedia(index)}>
                        X
                      </button>
                     <img src={URL.createObjectURL(file)} className="album" />
                   
                    </div>
                  ))}

                  
                </p>
              </div>
            </div>
            <div className="reaction d-flex ">
              <div className="d-flex align-items-center">
                <CiHeart className="mx-1" />
                Like
              </div>
              <div className="d-flex align-items-center pt-1 pb-1 ps-3 ">
                <GoComment className="mx-1" />
                Comment
              </div>
              <div className="d-flex align-items-center pt-1 pb-1 ps-3 ">
                <RiShareForwardLine className="mx-1" />
                Share
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Home;
