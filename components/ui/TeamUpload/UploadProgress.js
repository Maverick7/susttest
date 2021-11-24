import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { individualUploadFile } from "../../../../redux/main/uploadFile/uploadFile.actions";
import UploadItem from "./UploadItem";
import Styles from "../../../styles/Upload/UploadProgress.module.css";

const UploadProgress = (props) => {
  const {  individualFile, email, eventId, uploadSelectedFile } =
    props;
  return (
    <Fragment>
      <div>
        <button
          type="button"
          onClick={() =>
            uploadSelectedFile(individualFile.fileObj, { email, eventId })
          }
        >
          upload after setting
        </button>
      </div>
      {individualFile.fileObj.file!==undefined ? (
        <div className={Styles.main_wrapper}>
          <div className={Styles.head_wrap}>
            <h4>File</h4>
            <h4>Status</h4>
          </div>

          <UploadItem
            // key={file.id}
            file={individualFile}
          />
        </div>
      ) : null}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  const { individualFile, fileProgress } = state.fileUpload;
  const { user } = state.auth;
  const { email, eventId } = user;
  return {
    individualFile,
    fileProgress,
    email,
    eventId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  uploadSelectedFile: (file, user) => dispatch(individualUploadFile(file, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadProgress);
