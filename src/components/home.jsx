import React, { useState, useRef, useEffect } from "react";
import { BsStars } from "react-icons/bs";
import { BiLock, BiPhotoAlbum } from "react-icons/bi";
import { FiImage } from "react-icons/fi";
import { GoVideo } from "react-icons/go";
import { FiSend } from "react-icons/fi";
import { MdMoreTime } from "react-icons/md";

import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";

import { IoSaveOutline } from "react-icons/io5";
import InputEmoji from "react-input-emoji";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import user from "../assets/images/diggow.jpg"; 
import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { RiShareForwardLine } from "react-icons/ri";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid, Paper, Typography } from "@material-ui/core";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { TiTickOutline } from "react-icons/ti";
import dayjs from "dayjs";
import { AiTwotoneAudio } from "react-icons/ai";
import { useReactMediaRecorder } from "react-media-recorder";
import { FaRegStopCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ConfirmModal from "./Navigation/modal";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Navbar from "./Navigation/navbar";



function Home() {
  const location = useLocation();
  const params = new URLSearchParams(window.location.search);
  const encodedData = params.get("data");
  const userData = useSelector((data) => data.user);

  const { eventdata } = useParams();
  const data = eventdata ? JSON.parse(eventdata) : null;

  const [loadingPublish, setLoadingPublish] = useState(false);
  const [loadingProgram, setLoadingProgram] = useState(false);
  const [loadingDraft, setLoadingDraft] = useState(false);
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [selectedValueName, setSelectedValueName] = useState( "");

  const [selectedValue, setSelectedValue] = useState(data ? data.idpage : "");
  const [text, setText] = useState(
    data ? (data.message ? data.message : "") : ""
  );
  const [selectedFiles, setselectedFiles] = useState([]);
  const [columns, setColumns] = useState([]);
  const [columsdata, setcolumsdata] = useState([]);

  const [idpage, setidpage] = useState("");

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
  const [pages, setPages] = useState([]);

  //audio
  const [isRecording, setIsRecording] = useState(false);
  /*const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);*/
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  const recognitionRef = useRef(null);

  if (!recognitionRef.current && typeof window.webkitSpeechRecognition !== "undefined") {
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.interimResults = true;
    recognitionRef.current.continuous = true;
  }
  let [cleanedFilePathsArray, setcleanedFilePathsArray] = useState([]);

  useEffect(() => {
    if (data && data.media_path) {
      if( data.media_path!='null'){
        console.log("the media path",data.media_path)
        if (data.media_path.endsWith("mp4")) {
          setVideoFile(data.media_path);
        } else {
          if(data.media_path.includes('uploads/')){
            setImageLocale(`http://127.0.0.1:8000/${data.media_path}`);

          }else{
            setImageLocale(data.media_path);

          }
        
          setImage(`${data.media_path}`);
  
        }
      }
     
    }

    // console.log("hello",data.media_paths)
    if (data && data.media_paths) {
      const filePathsArray = JSON.parse(data.media_paths);
       cleanedFilePathsArray = filePathsArray.map((path) =>
        path.replace(/\\/g, "")
      );
      const col1 = cleanedFilePathsArray.slice(0, 2);
      const col2 = cleanedFilePathsArray.slice(2, 5);
      setcolumsdata([col1, col2]);
    }
  }, []);

  //eventId
  const { eventId } = useParams();
  const get = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/getUserPages",
        {
          params: {
            user_id: userData,
          },
        }
      );
      if (pages.length != response.data.length) {
        response.data.forEach((element) => {
         
          pages.push({
            value: element.id,
            label: element.page_name,
          });
        });
      }

      // setPages(response.data);
    
    } catch (err) {
      console.log("err");
    }
  };
  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        let computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        let computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter((counter) => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);
  function stopTimer() {
    setIsActive(false);
    setCounter(0);
    setSecond("00");
    setMinute("00");
  }
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    //mediaBlobUrl,
  } = useReactMediaRecorder({
    video: false,
    audio: true,
    echoCancellation: true,
  });

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

    const isImage = files[0].type.startsWith("image/");
    const isVideo = files[0].type.startsWith("video/");

    if (!isImage && !isVideo) {
      // Utilisation de toast pour afficher un message d'erreur
      toast.error("Please choose an image or a video.");
      return;
    }
   
    // Si c'est une image
    if (isImage) {
      setImage(null);
      setImageLocale(null);
    }

    // Si c'est une vidéo
    if (isVideo) {
      setVideoFile(null);
      setVideoFiles(null);
    }

    // Parcourir les fichiers pour les ajouter à selectedFiles
    const updatedSelectedFiles = Array.from(files).map((file) => ({
      file,
      type: file.type,
    }));

    setselectedFiles(updatedSelectedFiles);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const update = async (event) => {
    event.preventDefault();
    setLoadingDraft(true);
    /*const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;*/

    const formData = new FormData();
    formData.append("message", text);

    //console.log(videoFile);

    console.log('from function',image);
    formData.append("media_path", image ? image : videoFile);
    formData.append("idpage", selectedValue);
    formData.append("id", data.id);

    /*if (image) {
      formData.append("media_path", image, image.name);
    }
    if (videoFile) {
        formData.append("media_path", videoFile, videoFile.name);
    }*/
    
    let newdata=columsdata.flat()
 console.log(newdata)
    if(newdata.length>0  ){
      console.log('helooool',newdata)
      newdata.forEach((media, index) => {
        
        formData.append(`media_pathsdelete[${index}]`, media);
      });
    }
  else{
  
  
  }
  selectedFiles.forEach((media, index) => {
    formData.append(`media_paths[${index}]`, media.file);
  });
    console.log("the form",cleanedFilePathsArray)
    /*selectedFiles.forEach((file, index) => {
      formData.append(`media_paths[${index}]`, file, file.name);
    });

    ///*******+++********* */
    // const filePathsJson = '["uploads\\/post\\/17105958680.jpg","uploads\\/post\\/17105958682.jpg","uploads\\/post\\/17105958683.webp"]';
    // const filePathsArray = JSON.parse(filePathsJson);
    // const cleanedFilePathsArray = filePathsArray.map(path => path.replace(/\\/g, ''));
    // console.log("clean")
    // console.log(cleanedFilePathsArray);
    console.log(selectedFiles);
    try {
      setLoadingDraft(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/modify-post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Post modified successfully.");
        console.log(response)
      navigate("/calendar");
      setColumns([]);
    } catch (err) {
      setLoadingDraft(false);
      toast.success("An error occurred while saving as draft.");
      console.log(err);
    }
  };

  const updateprogramm = async (event) => {
    event.preventDefault();

    /*const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;*/

    const formData = new FormData();
    formData.append("message", text);

    console.log(videoFile);

    console.log(image);
    formData.append("media_path", image ? image : videoFile);
    formData.append("idpage", selectedValue);
    formData.append("id", data.id);
    formData.append(
      "scheduled_datetime",
      dayjs(valuetime).format("YYYY-MM-DD HH:mm:ss")
    );
    formData.append("Programming_options", "programmed");

    /*if (image) {
      formData.append("media_path", image, image.name);
    }
    if (videoFile) {
        formData.append("media_path", videoFile, videoFile.name);
    }*/

    selectedFiles.forEach((media, index) => {
      formData.append(`media_paths[${index}]`, media.file);
    });
    /*selectedFiles.forEach((file, index) => {
      formData.append(`media_paths[${index}]`, file, file.name);
    });

    ///*******+++********* */
    // const filePathsJson = '["uploads\\/post\\/17105958680.jpg","uploads\\/post\\/17105958682.jpg","uploads\\/post\\/17105958683.webp"]';
    // const filePathsArray = JSON.parse(filePathsJson);
    // const cleanedFilePathsArray = filePathsArray.map(path => path.replace(/\\/g, ''));
    // console.log("clean")
    // console.log(cleanedFilePathsArray);
    console.log(selectedFiles);
    try {
      setLoadingProgram(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/modify-post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoadingProgram(false);
      navigate("/calendar");
      toast.success("Publication scheduled successfully.");

      setColumns([]);
    } catch (err) {
      setLoadingProgram(false);
      toast.error(
        "The publication date must be between 10 minutes and 30 days after the current date."
      );
      console.log(err);
      setprogram(false);
    }
  };
  const updatepublish = async (event) => {
    event.preventDefault();
    /*const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;*/

    const formData = new FormData();
    formData.append("message", text);

    console.log(videoFile);

    console.log(image);
    formData.append("media_path", image ? image : videoFile);
    formData.append("idpage", selectedValue);
    formData.append("id", data.id);

    formData.append("Programming_options", "published");

    /*if (image) {
      formData.append("media_path", image, image.name);
    }
    if (videoFile) {
        formData.append("media_path", videoFile, videoFile.name);
    }*/

    selectedFiles.forEach((media, index) => {
      formData.append(`media_paths[${index}]`, media.file);
    });
    /*selectedFiles.forEach((file, index) => {
      formData.append(`media_paths[${index}]`, file, file.name);
    });

    ///*******+++********* */
    // const filePathsJson = '["uploads\\/post\\/17105958680.jpg","uploads\\/post\\/17105958682.jpg","uploads\\/post\\/17105958683.webp"]';
    // const filePathsArray = JSON.parse(filePathsJson);
    // const cleanedFilePathsArray = filePathsArray.map(path => path.replace(/\\/g, ''));
    // console.log("clean")
    // console.log(cleanedFilePathsArray);
    console.log(selectedFiles);
    try {
      setLoadingPublish(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/modify-post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response)
      setLoadingPublish(false);
      // navigate("/calendar");
      toast.success("Post published successfully.");

      setColumns([]);
    } catch (err) {
      setLoadingPublish(false);
      toast.success("An error occurred.");
      console.log(err);
    }
  };
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    // Handle confirmation logic here
    deletepost();
    setIsModalOpen(false);
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

  const handleDropdownChange = (selected) => {
    console.log("helool", selected);
    setSelectedValue(selected.value);
    setSelectedValueName(selected.label)
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
      setLoadingGenerate(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/generate-profile",
        {
          content: text,
        }
      );
      setLoadingGenerate(false);
      setText(response.data.data);
    } catch (err) {
      setLoadingGenerate(false);
      setError(err.response.data.message);
      setResponseData(null);
    }
  };

  const handleResetSelection = () => {
    setselectedFiles([]);
    setVideoFile("");
    setImageLocale("");
  };
  const [selectedfilesdata, setselectedfilesdata] = useState([]);

  const handleDeleteMedia = (colIndex, mediaIndex) => {
    const globalIndex = colIndex * columns[0].length + mediaIndex;
    const globalIndextow = colIndex * columsdata[0].length + mediaIndex;
    const updatedFilestow =columsdata.flat();

    const updatedFiles = [...selectedFiles];
    if (globalIndex >= 0 && globalIndex < updatedFiles.length) {
        updatedFiles.splice(globalIndex, 1);
        setselectedFiles(updatedFiles);
       
        console.log("her",columsdata)

    } else {
        console.warn(`Index ${globalIndex} out of bounds for selectedFiles`);
    }
    if (globalIndextow >= 0 && globalIndextow <= updatedFilestow.length) {
      
      updatedFilestow.splice(globalIndextow, 1);
      setcleanedFilePathsArray(updatedFilestow);
   

  } else {
      console.warn(`Index ${globalIndex} out of bounds for selectedFiles`);
  }
    
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
    const col1 = cleanedFilePathsArray.slice(0, 2);
    const col2 = cleanedFilePathsArray.slice(2, 5);
    setcolumsdata([col1, col2]);
  
  }, [cleanedFilePathsArray]);
  useEffect(() => {
    const col1 = selectedFiles.slice(0, 2);
    const col2 = selectedFiles.slice(2, 5);
    setColumns([col1, col2]);
  
  }, [selectedFiles]);

  const deletepost = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/delete-post",
        { id: data.id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Post deleted successfully.");
      navigate("/calendar");
    } catch (err) {
      toast.success("An error occurred.");
      console.log(err);
    }
  };
  const publishPost = async (e) => {
    e.preventDefault();

    /*const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;*/

    const formData = new FormData();
    formData.append("message", text);
    formData.append("media_path", image ?? videoFile);
    formData.append("idpage", selectedValue);
    console.log("selectedValue", selectedValue);
    console.log("text", text);

    selectedFiles.forEach((media, index) => {
      formData.append(`media_paths[${index}]`, media.file);
    });
    /*selectedFiles.forEach((file, index) => {
      formData.append(`media_paths[${index}]`, file, file.name);
    });*/

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
      toast.success("Post published successfully.");
      setText();
      setImage(null);
      setImageLocale(null);
      setselectedFiles([]);

      setColumns([]);
    } catch (err) {
      setLoadingPublish(false);
      toast.error("An error occurred.");
      console.log(err);
    }
  };

  const schedulePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("message", text);

    formData.append("media_path", image ?? videoFile);
    formData.append(
      "scheduled_datetime",
      dayjs(valuetime).format("YYYY-MM-DD HH:mm:ss")
    );

    selectedFiles.forEach((media, index) => {
      formData.append(`media_paths[${index}]`, media.file);
    });
    formData.append("idpage", selectedValue);
    

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
      toast.success("Publication scheduled successfully.");
      setText();
      setImage(null);
      setImageLocale(null);
      setvaluetime(null);
      setprogram(false);

      setColumns([]);
    } catch (err) {
      setLoadingProgram(false);
      toast.error(
        "The publication date must be between 10 minutes and 30 days after the current date."
      );
      console.log(err);
      setprogram(false);
    }
  };

  const saveAsDraft = async (e) => {
    e.preventDefault();
    setLoadingDraft(true);

    const formData = new FormData();
    formData.append("message", text);
    console.log(image);
    if(image){
      formData.append("media_path", image );

    }if(videoFile){
      formData.append("media_path", videoFile );

    }

    //formData.append("idpage", selectedValue);
   
    selectedFiles.forEach((media, index) => {
      formData.append(`media_paths[${index}]`, media.file);
    });

    formData.append("idpage", selectedValue);

    // selectedFiles.forEach((media, index) => {
    //   formData.append(`media_paths[${index}]`, media.file);
    // });

    // if(selectedValue??selectedValue.trim()==''){
    //   toast.error('add page')
    // }
    
    try {
      setLoadingDraft(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/save-post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoadingDraft(false);
      toast.success("Post saved as draft.");
      setText();
      setImage(null);
      setImageLocale(null);
      setColumns([]);
    } catch (err) {
      setLoadingDraft(false);

      toast.error("An error occurred while saving as draft.");
      console.log(err);
    }
  };

  useEffect(() => {
    return () => {
      stopRecording(); // Arrête l'enregistrement si encore en cours
    };
  }, [stopRecording]);

  useEffect(() => {
    const recognition = recognitionRef.current;
  
    const handleResult = (event) => {
      let transcript = "";
      for (const result of event.results) {
        transcript += result[0].transcript;
      }
      setText(transcript);
    };
  
    const handleError = (event) => {
      console.error("Voice recognition error: ", event.error);
    };
  
    const handleEnd = () => {
      if (isRecording) {
        recognition.start();
      }
    };
  
    recognition.addEventListener('result', handleResult);
    recognition.addEventListener('error', handleError);
    recognition.addEventListener('end', handleEnd);
  
    // Maintenant, passons les fonctions spécifiques lors de la suppression
    return () => {
      recognition.removeEventListener('result', handleResult);
      recognition.removeEventListener('error', handleError);
      recognition.removeEventListener('end', handleEnd);
    };
  }, []);

  const toggleRecording = () => {
  if (isRecording) {
    stopTranscription();
  } else {
    handleVoiceToText();
  }
};

  

  const handleVoiceToText = () => {
    if (isRecording) {
      stopTranscription();
    } else {
      setText("");
      setSecond("00");
      setMinute("00");
      setCounter(0);
      setIsActive(true);
      startRecording();
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };
  
  const stopTranscription = () => {
    if (isRecording) {
      recognitionRef.current.stop();
      stopRecording();
      setIsRecording(false);
      setIsActive(false);
      stopTimer();
    }
  };


  

  return (
    <div className="main">
      <Navbar home={true} />
      <div class="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <div className="cadre">
                <h6 className="title">Post in</h6>
                <div>
                {data && data.subtitle != "saved as draft"  && 
                  <Select
                  isDisabled
                    className="select-option  "
                    options={pages}
                    onChange={handleDropdownChange}
                  />}
                    {!data || data && data.subtitle == "saved as draft"  && 
                  <Select
                 
                    className="select-option  "
                    options={pages}
                    onChange={handleDropdownChange}
                  />}
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="cadre">
                <h6 className="title">Post details</h6>
                <p className="description">
                  Customize the publication for Facebook
                </p>
                <div>
                  <p className="">Enter a query here</p>
                  {!data && (
                    <div className="d-flex ">
                      <InputEmoji
                        value={text}
                        onChange={handleinputchange}
                        height={150}
                        shouldReturnKey={true}
                        placeholder="Add tags"
                      />
                      <div>
                        <div class="voice-control">
                          <div class="voice-button">
                          <button id="recordButton" onClick={toggleRecording}>
                            {isActive ? (
                              <FaRegStopCircle />
                            ) : (
                              <AiTwotoneAudio />
                            )}
                          </button>
                          </div>

                          <div class="timer">
                            <span className="minute">{minute}</span>
                            <span>:</span>
                            <span className="second">{second}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {data && data.subtitle == "saved as draft" && (
                    <div className="d-flex ">
                    <InputEmoji
                        value={text}
                        onChange={handleinputchange}
                        height={150}
                        shouldReturnKey={true}
                        placeholder="Add tags"
                      />
                      <div>
                        <div class="voice-control">
                          <div class="voice-button">
                          <button id="recordButton" onClick={toggleRecording}>
                            {isActive ? (
                              <FaRegStopCircle />
                            ) : (
                              <AiTwotoneAudio />
                            )}
                          </button>
                          </div>

                          <div class="timer">
                            <span className="minute">{minute}</span>
                            <span>:</span>
                            <span className="second">{second}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {data && data.subtitle != "saved as draft" && (
                    <div className="d-flex icons disabled ">
                    <InputEmoji
                        value={text}
                        onChange={handleinputchange}
                        height={150}
                        shouldReturnKey={true}
                        placeholder="Add tags"
                      />
                      <div>
                        <div class="voice-control">
                          <div class="voice-button">
                          <button id="recordButton" onClick={toggleRecording}>
                            {isActive ? (
                              <FaRegStopCircle />
                            ) : (
                              <AiTwotoneAudio />
                            )}
                          </button>
                          </div>

                          <div class="timer">
                            <span className="minute">{minute}</span>
                            <span>:</span>
                            <span className="second">{second}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                

                  <div className="line"></div>

                  {data && data.subtitle === "saved as draft" && (
                    <div className="d-flex justify-content-end">
                      <button className="cancel me-2" onClick={handleCancel}>
                        Cancel
                      </button>
                      {loadingGenerate ? (
                        <div class="loader"></div>
                      ) : (
                        <button className="active" onClick={Generer}>
                          <BsStars />
                          Génerate
                        </button>
                      )}
                    </div>
                  )}
                  {!data && (
                    <div className="d-flex justify-content-end">
                      <button className="cancel me-2" onClick={handleCancel}>
                        Cancel
                      </button>
                      {loadingGenerate ? (
                        <div class="loader"></div>
                      ) : (
                        <button className="active" onClick={Generer}>
                          <BsStars />
                          Génerate
                        </button>
                      )}
                    </div>
                  )}
                  {data && data.subtitle != "saved as draft" && (
                    <div className="d-flex justify-content-end">
                      <button
                        className="cancel me-2 icons disabled"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                      {loadingGenerate ? (
                        <div class="loader"></div>
                      ) : (
                        <button
                          className="active icons disabled"
                          onClick={Generer}
                        >
                          <BsStars />
                          Génerate
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {data && data.subtitle === "saved as draft" && (
              <>
                <div className="mb-3">
                  <div className="cadre">
                    <h6 className="title">Multimedia content</h6>
                    <p className="description">
                      Share photos or videos
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
                        <BiPhotoAlbum
                          style={{ color: "#A020F0" }}
                          className="mx-1"
                        />
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
                        <GoVideo
                          style={{ color: "#A020F0" }}
                          className="mx-1"
                        />
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
                        onSubmit={updatepublish}
                        method="post"
                        formEncType="multipart/form-data"
                      >
                        {loadingPublish ? (
                          <div class="loader"></div>
                        ) : (
                          <button
                            className="d-flex   active align-items-center"
                            type="submit"
                            onClick={updatepublish}
                          >
                            <FiSend className="mx-1" />
                            Publish
                          </button>
                        )}
                      </form>

                      <form
                        onSubmit={updateprogramm}
                        method="post"
                        formEncType="multipart/form-data"
                      >
                        <div className="">
                          {program ? (
                            <div className="programme">
                              <div className="ms-3  d-flex align-items-center ">
                                <DateTimePicker
                                  onChange={setvaluetime}
                                  value={valuetime}
                                  className="custom-picker"
                                />
                              </div>
                              <div className="tcheck">
                                {loadingProgram ? (
                                  <div className="loader"></div>
                                ) : (
                                  <TiTickOutline
                                    style={{ color: "#A020F0" }}
                                    size={30}
                                    onClick={updateprogramm}
                                  />
                                )}
                              </div>
                            </div>
                          ) : (
                            <button
                              className="ms-3 buttons d-flex align-items-center"
                              onClick={VoirCalendrier}
                            >
                              <MdMoreTime
                                style={{ color: "#A020F0" }}
                                className="mx-1"
                              />
                              Schedule
                            </button>
                          )}
                        </div>
                      </form>

                      <form
                        onSubmit={update}
                        method="post"
                        formEncType="multipart/form-data"
                      >
                        {loadingDraft ? (
                          <div class="loader"></div>
                        ) : (
                          <button
                            className=" ms-3  buttons d-flex align-items-center"
                            type="submit"
                            onClick={update}
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
              </>
            )}
            {!data && (
              <>
                <div className="mb-3">
                  <div className="cadre">
                    <h6 className="title">Multimedia content</h6>
                    <p className="description">
                      Share photos or videos
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
                        <BiPhotoAlbum
                          style={{ color: "#A020F0" }}
                          className="mx-1"
                        />
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
                        <GoVideo
                          style={{ color: "#A020F0" }}
                          className="mx-1"
                        />
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
                        {loadingPublish ? (
                          <div class="loader"></div>
                        ) : (
                          <button
                            className="d-flex   active align-items-center"
                            type="submit"
                            onClick={publishPost}
                          >
                            <FiSend className="mx-1" />
                            Publish
                          </button>
                        )}
                      </form>

                      <form
                        onSubmit={schedulePost}
                        method="post"
                        formEncType="multipart/form-data"
                      >
                        <div className="">
                          {program ? (
                            <div className="programme">
                              <div className="ms-3  d-flex align-items-center ">
                                <DateTimePicker
                                  onChange={setvaluetime}
                                  value={valuetime}
                                  className="custom-picker"
                                />
                              </div>
                              <div className="tcheck">
                                {loadingProgram ? (
                                  <div className="loader"></div>
                                ) : (
                                  <TiTickOutline
                                    style={{ color: "#A020F0" }}
                                    size={30}
                                    onClick={schedulePost}
                                  />
                                )}
                              </div>
                            </div>
                          ) : (
                            <button
                              className="ms-3 buttons d-flex align-items-center"
                              onClick={VoirCalendrier}
                            >
                              <MdMoreTime
                                style={{ color: "#A020F0" }}
                                className="mx-1"
                              />
                              Schedule
                            </button>
                          )}
                        </div>
                      </form>

                      <form
                        onSubmit={saveAsDraft}
                        method="post"
                        formEncType="multipart/form-data"
                      >
                        {loadingDraft ? (
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
              </>
            )}
            {data && data.subtitle != "saved as draft" && (
              <>
                <div className="mb-3 ">
                  <div className="cadre">
                    <h6 className="title">Multimedia content</h6>
                    <p className="description">
                      Share photos or videos
                    </p>
                    <div className="d-flex icons disabled ">
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
                        <BiPhotoAlbum
                          style={{ color: "#A020F0" }}
                          className="mx-1"
                        />
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
                        <GoVideo
                          style={{ color: "#A020F0" }}
                          className="mx-1"
                        />
                        Add video
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="cadre">
                    <h6 className="title">Programming options</h6>
                    <div className="d-flex icons disabled ">
                      <form
                        onSubmit={publishPost}
                        method="post"
                        formEncType="multipart/form-data"
                      >
                        {loadingPublish ? (
                          <div class="loader"></div>
                        ) : (
                          <button
                            className="d-flex   active align-items-center"
                            type="submit"
                            onClick={publishPost}
                          >
                            <FiSend className="mx-1" />
                            Publish
                          </button>
                        )}
                      </form>

                      <form
                        onSubmit={schedulePost}
                        method="post"
                        formEncType="multipart/form-data"
                      >
                        <div className="">
                          {program ? (
                            <div className="programme">
                              <div className="ms-3  d-flex align-items-center ">
                                <DateTimePicker
                                  onChange={setvaluetime}
                                  value={valuetime}
                                  className="custom-picker"
                                />
                              </div>
                              <div className="tcheck">
                                {loadingProgram ? (
                                  <div className="loader"></div>
                                ) : (
                                  <TiTickOutline
                                    style={{ color: "#A020F0" }}
                                    size={30}
                                    onClick={schedulePost}
                                  />
                                )}
                              </div>
                            </div>
                          ) : (
                            <button
                              className="ms-3 buttons d-flex align-items-center"
                              onClick={VoirCalendrier}
                            >
                              <MdMoreTime
                                style={{ color: "#A020F0" }}
                                className="mx-1"
                              />
                              Schedule
                            </button>
                          )}
                        </div>
                      </form>

                      <form
                        onSubmit={saveAsDraft}
                        method="post"
                        formEncType="multipart/form-data"
                      >
                        {loadingDraft ? (
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
              </>
            )}
            <div>
              {data && data.subtitle === "saved as draft" && (
                <div className="delete-container">
                  <div style={{ display: "flex" }}>
                    <button
                      className="ms-3 buttons delete d-flex align-items-center"
                      onClick={handleOpenModal}
                    >
                      <MdOutlineDeleteOutline
                        style={{ color: "white" }}
                        className="mx-1"
                      />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <div className="cadre">
                <div className="d-flex mb-3 justify-content-between align-items-center">
                  <h6 className="title  ">Post Preview on Facebook <FaFacebookSquare  size={18} color="blue" /></h6> 

                  
                </div>

                <div className="line mb-3"></div>
               
                <div className="cadre">
                  <div className="user">
                    <div className="d-flex">
                      <div className="avatar-container online">
                        <img
                          src={user}
                          alt="User Avatar"
                          className="avatar-img"
                        />
                        <div className="online-indicator"></div>
                      </div>
                      <div className="ms-2">
                        <h6 className="name-user">{selectedValueName}</h6>
                        <span className="online-time">Just now</span>
                      </div>
                    </div>
                    <div>
                      <p className="description-post">
                        {text}
                        {videoFile && (
                          <div className="media-container">
                            <video width="100%" height="auto" controls>
                              <source
                                src={
                                  data
                                        ? `http://127.0.0.1:8000/${videoFile}` 

                                    : URL.createObjectURL(videoFile)
                                }
                                type={videoFile.type}
                              />
                              Your browser does not support the video tag.
                            </video>
                            <button
                              className="delete-overlay"
                              onClick={() => handleDeleteMedia(0)}
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
                              onClick={() => handleDeleteMedia(0)}
                            >

                              X 
                            </button>
                          </div>
                        )}
                        
                        {
                          data &&      
                          <div className="media-container album">
                            <Grid container>
                                {columsdata.map((column, index) => (
                                    <Grid item xs={6} key={index}>
                                        {column.map((media, indexmedia) => (
                                            <div
                                                key={indexmedia}
                                                className={`media-container ${getMediaClass(
                                                    index,
                                                    selectedFiles.length
                                                )}`}
                                            >
                                                <button
                                                    className="delete-album"
                                                    onClick={() => handleDeleteMedia(index, indexmedia)}
                                                >
                                                    X
                                                </button>
                                                <div className={index === 1 ? "trois" : "tow"}>
                                                    {media.endsWith(".mp4") ? (
                                                        <div className="media-container">
                                                            <video width="100%" height="auto" controls>
                                                                <source
                                                                    src={`http://127.0.0.1:8000/${media}`}
                                                                />
                                                                Your browser does not support the video tag.
                                                            </video>
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={`http://127.0.0.1:8000/${media}`}
                                                            alt={media}
                                                            className={
                                                              indexmedia === 2
                                                                    ? "album collectmedia"
                                                                    : "album"
                                                            }
                                                        />
                                                    )}
                                                </div>

                                                <span
                                                    className={
                                                      indexmedia === 2 ? "play" : "numbers"
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
                        }
                        <div className=" media-container album">
                          <Grid container>
                            {columns.map((column, index) => (
                              <Grid item xs={6} key={index}>
                                {column.map((media, indexmedia) => (
                                  <div
                                    key={indexmedia}
                                    className={`media-container ${getMediaClass(
                                      index,
                                      selectedFiles.length
                                    )}`}
                                  >
                                    <button
                                      className="delete-album"
                                      onClick={() => handleDeleteMedia(index, indexmedia)}
                                    >
                                      X
                                    </button>
                                    <div
                                      className={index == 1 ? "trois" : "tow"}
                                    >
                                      {media.type.startsWith("image/") && (
                                        <img
                                          src={URL.createObjectURL(media.file)}
                                          alt={media.name}
                                          key={media.id}
                                          className={
                                            indexmedia == 2
                                              ? "album collectmedia"
                                              : "album"
                                          }
                                        />
                                      )}

                                      {media.file.type.startsWith("video/") && (
                                        <video
                                          controls
                                          src={URL.createObjectURL(media.file)}
                                          alt={media.name}
                                          key={media.id}
                                          className={
                                            indexmedia == 2
                                              ? "album collectmedia"
                                              : "album"
                                          }
                                        />
                                      )}
                                    </div>

                                    <span
                                      className={
                                        indexmedia == 2 ? " play" : "numbers"
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

          <ConfirmModal
            isOpen={isModalOpen}
            message="Are you sure you want to proceed?"
            onConfirm={() => handleConfirm(data.id)}
            onCancel={handleCloseModal}
          />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Home;
