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
  return (
    <div className={Styles.wrapperItem}>
      <div className={Styles.leftSide}>
        {/* <div className={Styles.progressBar}>
          <div style={{ width: `${progress}%` }} />
        </div> */}
        <div>
          {isLoading ? (
            <img
              width={"25px"}
              className="img-fluid"
              src={"/images/loader/loader.svg"}
              alt="loading"
            />
          ) : (
            ""
          )}
          
        </div>
        <label>{fileName}</label>
      </div>
      <span className={Styles.percentage}>{status}</span>
    </div>
  );
};

export default UploadItem;
