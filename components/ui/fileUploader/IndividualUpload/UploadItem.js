import React from "react";
import Styles from "../../../../styles/Upload/UploadItem.module.css";

const UploadItem = (props) => {
  const {
    fileObj: { fileName, fileType, fileSize },
    status,
    progress,
    isLoading,
    isSuccess,
  } = props.file;
  function iconStatus() {
    switch (status) {
      case "idle":
        return (
          <img
            width={"15px"}
            className="img-fluid mr-2"
            src={"/images/alert/ic_tick.svg"}
            alt="icon"
          />
        );
        case "uploading":
        return (
          <img
            width={"15px"}
            className="img-fluid mr-2"
            src={"/images/loader/loader.svg"}
            alt="icon"
          />
        );
      case "ready":
        return (
          // <img
          //   width={"15px"}
          //   className="img-fluid mr-2"
          //   src={"/images/alert/ic_exclamation.svg"}
          //   alt="icon"
          // />
          <h6 className=" mr-2">R</h6>
        );
      case "uploaded":
        return (
          <img
            width={"15px"}
            className="img-fluid mr-2"
            src={"/images/alert/ic_tick-green.svg"}
            alt="icon"
          />
        );
      case "failed":
        return (
          <img
            width={"15px"}
            className="img-fluid mr-2"
            src={"/images/alert/ic_cross-red.svg"}
            alt="icon"
          />
        );
      case "error":
        return (
          <img
            width={"15px"}
            className="img-fluid mr-2"
            src={"/images/alert/ic_wrong-red.svg"}
            alt="icon"
          />
        );
      default:
        return "";
    }
  }
  return (
    <div className={Styles.wrapperItem}>
      <div className={Styles.leftSide}>
        {/* <div className={Styles.progressBar}>
          <div style={{ width: `${progress}%` }} />
        </div> */}
        <div>
          {iconStatus()}
        </div>
        <label>{fileName}</label>
      </div>
      <span className={Styles.percentage}>{status}</span>
    </div>
  );
};

export default UploadItem;
