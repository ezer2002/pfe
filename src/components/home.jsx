import { Calendar } from 'primereact/calendar';
import React, { useState, useRef,useEffect } from "react";
import { BsStars } from "react-icons/bs";
import { BiPhotoAlbum} from "react-icons/bi";
import { FiImage } from 'react-icons/fi';
import { GoVideo } from "react-icons/go";
import { FiSend } from "react-icons/fi";
import { MdMoreTime } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import InputEmoji from "react-input-emoji";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import user from "../assets/images/Innovation page.png";
import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { RiShareForwardLine } from "react-icons/ri";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Grid, Paper, Typography } from '@material-ui/core';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { TiTickOutline } from "react-icons/ti";


function Home() {
  const [date, setDate] = useState(null);
  const [loadingPublish, setLoadingPublish] = useState(false);
  const [loadingProgram, setLoadingProgram] = useState(false);
  const [loadingDraft, setLoadingDraft] = useState(false);

  const [selectedValue, setSelectedValue] = useState("");
  const [text, setText] = useState("");
  const [selectedFiles, setselectedFiles] = useState([]);
  const [columns, setColumns] = useState([]);

  const [imagelocale, setImageLocale] = useState();
  const [image, setImage] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoFiles, setVideoFiles] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const imageInputRef = useRef();
  const imagesInputRef = useRef();
  const videoInputRef = useRef();

  const [valuetime, setvaluetime] = useState(new Date());

  const [program, setprogram] = useState(false);


  const handleVideoChange = (event) => {
    const selectedFiles = event.target.files;
    const filesArray = Array.from(event.target.files);

    //setselectedFiles(filesArray);

    const videoFile = filesArray.find((file) => file.type.startsWith("video/"));
    setVideoFile(videoFile);

    console.log("Selected files:", filesArray);
    console.log("Selected video:", videoFile);
  };

  const handleFilesChange = (event) => {
    const files = event.target.files;
  
    // Vérifier si des fichiers ont été sélectionnés
    if (files.length === 0) {
      return;
    }
  
    const isImage = files[0].type.startsWith('image/');
    const isVideo = files[0].type.startsWith('video/');
  
    if (!isImage && !isVideo) {
      // Utilisation de toast pour afficher un message d'erreur
      toast.error('Veuillez choisir une image ou une vidéo.');
      return;
    }
  
    // Si c'est une image
    if (isImage) {
      setImage(null);
      setImageLocale(null);
    }
  
    // Si c'est une vidéo
    if (isVideo) {
      const videoFile = files[0];
      setVideoFile(videoFile);
      console.log('Selected video:', videoFile);
      return;
    }
  
    // Créer un tableau de chemins de fichiers pour les images
    const imageFiles = Array.from(files);
    const imageFilePaths = imageFiles.map((file) => URL.createObjectURL(file));
    setselectedFiles(imageFiles);
  
    // Mettre à jour l'état de la vue prévisualisation pour les images
    // Par exemple : setImageLocale(imageFilePaths[0]);
  };
  


  const handleFileChange = (e) => {
 
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      setImage(file);

  
      setColumns([]);
      reader.onloadend = function () {
        setImageLocale(reader.result);
      };
      reader.readAsDataURL(file);

      e.target.value = null;
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleCancel = () => {
    setText(""); // Réinitialiser le contenu du champ "Add tags" à une chaîne vide
  };

  const handleinputchange = (event) => {
    const inputValue = event;
    setText(inputValue);
  };

  const Generer = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/generate-profile",
        {
          content: text,
        }
      );

      setText(response.data.data);
    } catch (err) {
      setError(err.response.data.message);
      setResponseData(null);
    }
  };

  const handleResetSelection = () => {
    setselectedFiles([]);
    setVideoFile("");
    setImageLocale("");
  };

  const handleDeleteMedia = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setselectedFiles(updatedFiles);
    setVideoFile(null);
    setImage(null);
    setImageLocale(null);

    // Si vous êtes en train de supprimer une image
    if (imageInputRef.current) imageInputRef.current.value = "";
    // Si vous êtes en train de supprimer un album
    if (imagesInputRef.current) imagesInputRef.current.value = "";
    // Si vous êtes en train de supprimer une vidéo
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  const getMediaClass = (index, filesCount) => {
    if (filesCount >= 6 && index === 4) return "with-overlay";
    if (filesCount === 3 && index === 0) return "full-width-row";
    if (
      filesCount === 4 &&
      index > 0 &&
      filesCount === 5 &&
      index > 1 &&
      filesCount >= 6 &&
      (index === 2 || index === 3)
    )
      return "three-images-row";
    return "";
  };
  const VoirCalendrier = () => {
    setprogram(true);
  };

  useEffect(() => {
    const col1 = selectedFiles.slice(0, 2);
    const col2 = selectedFiles.slice(2, 5);
    setColumns([col1, col2]);
  }, [selectedFiles]);

  const publishPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("message", text);
    formData.append("page_id", "115449061452354");
    formData.append("media_path", image ?? videoFile);

    selectedFiles.forEach((file, index) => {
      formData.append(`media_paths[${index}]`, file);
    });

    ///*******+++********* */
    // const filePathsJson = '["uploads\\/post\\/17105958680.jpg","uploads\\/post\\/17105958682.jpg","uploads\\/post\\/17105958683.webp"]';
    // const filePathsArray = JSON.parse(filePathsJson);
    // const cleanedFilePathsArray = filePathsArray.map(path => path.replace(/\\/g, ''));
    // console.log("clean")
    // console.log(cleanedFilePathsArray);

    try {
      setLoadingPublish(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/graph-interaction",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoadingPublish(false);
      toast.success("Post publié avec succès");
      setText()
      setImage(null);
      setImageLocale(null);
  
      setColumns([]);
    } catch (err) {
        toast.success("Une erreur s'est produite");
        console.log(err);
    }
  };

  const schedulePost = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
      formData.append("message", text);
      formData.append("page_id", "115449061452354");
      formData.append("media_path", image ?? videoFile);
      formData.append("scheduled_datetime", valuetime.toISOString());
  
      selectedFiles.forEach((file, index) => {
        formData.append(`media_paths[${index}]`, file);
      });
  
    try {
      setLoadingProgram(true); 
      const response = await axios.post(
        "http://127.0.0.1:8000/api/schedule-post",
        formData, // Ajoutez les données à envoyer
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoadingProgram(false); 
      toast.success("Publication programmée avec succès");
      setText()
      setImage(null);
      setImageLocale(null);
      setvaluetime(null);

      setColumns([]);
    } catch (err) {
      toast.error("Une erreur s'est produite pendant la publication programmée");
      console.log(err);
    }
  };

  const saveAsDraft = async (e) => {
    e.preventDefault();
    setLoadingDraft(true);
  
    const formData = new FormData();
      formData.append('message', text);
      formData.append('page_id', '115449061452354');
      formData.append('media_path', image ?? videoFile);
  
      selectedFiles.forEach((file, index) => {
        formData.append(`media_paths[${index}]`, file);
      });
    try {
      setLoadingDraft(true);
      const response =await axios.post("http://127.0.0.1:8000/api/save-post", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoadingDraft(false);
      toast.success('Post sauvegardé en tant que brouillon');
      setText()
      setImage(null);
      setImageLocale(null);

    
      setColumns([]);
    } catch (err) {
      toast.error('Une erreur s\'est produite lors de la sauvegarde en tant que brouillon');
      console.log(err);
    }
    
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
                  <option value="Innovation page">
                    <span style={{ fontWeight: 'bold', color: '#A020F0' }}>Innovation page</span>
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
                <button className="cancel me-2" onClick={handleCancel}>Cancel</button>
                <button className="active" onClick={Generer}>
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
                  onClick={handleResetSelection}
                >
                  <input
                    ref={imageInputRef}
                    onChange={handleFileChange}
                    type="file"
                    id="select-image"
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                  <MdOutlineAddPhotoAlternate
                    style={{ color: "#A020F0" }}
                    className="mx-1"
                  />
                  Add photo
                </label>

                <label
                  htmlFor="select-images"
                  className="d-flex ms-3 buttons align-items-center"
                  onClick={handleResetSelection}
                >
                  <input
                    ref={imagesInputRef}
                    onChange={handleFilesChange}
                    type="file"
                    id="select-images"
                    multiple
                    style={{ display: "none" }}
                  />
                  <BiPhotoAlbum style={{ color: "#A020F0" }} className="mx-1" />
                  Add album
                </label>
                <label
                  htmlFor="select-video"
                  className="buttons ms-3 d-flex align-items-center"
                  onClick={handleResetSelection}
                >
                  <input
                    ref={videoInputRef}
                    onChange={handleVideoChange}
                    type="file"
                    id="select-video"
                    accept="video/*"
                    style={{ display: "none" }}
                  />
                  <GoVideo style={{ color: "#A020F0" }} className="mx-1" />
                  Add video
                </label>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div className="cadre">
              <h6 className="title">Programming options</h6>
              <div className="d-flex ">
                <form
                  onSubmit={publishPost}
                  method="post"
                  formEncType="multipart/form-data"
                >
                    {loadingPublish  ? (
                      <div class="loader"></div>
                    ) : (
                      <button
                        className="d-flex   active align-items-center"
                        type="submit"
                        onClick={publishPost}
                      >
                        <FiSend className="mx-1" />
                        Publier
                      </button>
                    )}
                </form>

                <form 
                  onSubmit={schedulePost} 
                  method="post" 
                  formEncType="multipart/form-data"
                >
                  <div className="" > <Calendar value={date} onChange={(e) => setDate(e.value)} touchUI />
                    {program ? (
                      <div className="ms-3  d-flex align-items-center ">
                        <DateTimePicker
                          onChange={setvaluetime}
                          value={valuetime}
                          className="custom-picker"
                        />
                      </div>
                    ) : (
                      <button
                        className="ms-3 buttons d-flex align-items-center"
                        onClick={VoirCalendrier}
                      >
                      
                        <MdMoreTime style={{ color: "#A020F0" }} className="mx-1" />
                        Choose Date
                      </button>
                      
                    )}
                    <div>
                      {loadingProgram ? (
                        <div className="loader"></div>
                      ) : (
                        <button
                          className="ms-3 buttons d-flex align-items-center"
                          type="submit"
                          onClick={schedulePost}
                        >
                          <TiTickOutline style={{ color: "#A020F0" }} />
                          Schedule Post
                        </button>
                      )}
                    </div>
                  </div>
                </form>

                <form
                  onSubmit={saveAsDraft}
                  method="post"
                  formEncType="multipart/form-data"
                >
                  {loadingDraft  ? (
                    <div class="loader"></div>
                  ) : (
                    <button
                      className=" ms-3  buttons d-flex align-items-center"
                      type="submit"
                      onClick={saveAsDraft}
                    >
                      <IoSaveOutline
                        style={{ color: "#A020F0" }}
                        className="mx-1"
                      />
                      Save as a draft
                    </button>
                  )}
                </form>
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
                <option value="en">Innovation page</option>
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
                    <h6 className="name-user">Innovation page</h6>
                    <span className="online-time">A l'instant</span>
                  </div>
                </div>
                <div>
                  <p className="description-post">
                    {text}
                    {videoFile && (
                      <div className="media-container">
                        <video width="100%" height="auto" controls>
                          <source
                            src={URL.createObjectURL(videoFile)}
                            type={videoFile.type}
                          />
                          Your browser does not support the video tag.
                        </video>
                        <button
                          className="delete-overlay"
                          onClick={() => handleDeleteMedia()}
                        >
                          X
                        </button>
                      </div>
                    )}
                    {imagelocale && (
                      <div className="media-container">
                        <img src={imagelocale} className="one-photo" />
                        <button
                          className="delete-overlay"
                          onClick={() => handleDeleteMedia()}
                        >
                          X
                        </button>
                      </div>
                    )}
                    <div className=" media-container album">
                      <Grid container>
                        {columns.map((column, index) => (
                          <Grid item xs={6} key={index}>
                            {column.map((photo, indexphoto) => (
                              <div
                                key={index}
                                className={`media-container ${getMediaClass(
                                  index,
                                  selectedFiles.length
                                )}`}
                              >
                                <button
                                  className="delete-album"
                                  onClick={() => handleDeleteMedia(index)}
                                >
                                  X
                                </button>
                                <div className={index == 1 ? "trois" : "tow"}>
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt={photo.name}
                                    key={photo.id}
                                    className={
                                      indexphoto == 2
                                        ? "album collectimage"
                                        : "album"
                                    }
                                  />
                                </div>

                                <span
                                  className={
                                    indexphoto == 2 ? " play" : "numbers"
                                  }
                                >
                                  {" "}
                                  {selectedFiles.length - 4}+{" "}
                                </span>
                              </div>
                            ))}
                          </Grid>
                        ))}
                      </Grid>
                    </div>
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
      <ToastContainer />
    </div>
  );
}

export default Home;
