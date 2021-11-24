import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { size, toArray } from "lodash";
import { teamUploadFile } from "../../../../redux/main/uploadFile/uploadFile.actions";
import UploadItem from "./UploadItem";
import Styles from "../../../../styles/Upload/UploadProgress.module.css";

const UploadProgress = (props) => {
  const { fileProgress, teamFile, email, eventId, uploadSelectedFile } =
    props;
  const uploadedFileAmount = size(fileProgress);
  return (
    <Fragment>
      <div>
        <button
          type="button"
          onClick={() =>
            uploadSelectedFile(teamFile.fileObj, { email, eventId })
          }
        >
          upload after setting
        </button>
      </div>
      {teamFile.fileObj.file!==undefined ? (
        <div className={Styles.main_wrapper}>
          <div className={Styles.head_wrap}>
            <h4>File</h4>
            <h4>Status</h4>
          </div>
          <UploadItem
            // key={file.id}
            file={teamFile}
          />
        </div>
      ) : null}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  const { teamFile, fileProgress } = state.fileUpload;
  const { user } = state.auth;
  const { email, eventId } = user;
  return {
    teamFile,
    fileProgress,
    email,
    eventId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  uploadSelectedFile: (file, user) => dispatch(teamUploadFile(file, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadProgress);
