import React from "react";
import { setUploadIndividualFile } from "../../../../redux/main/uploadFile/uploadFile.actions";
import UploadProgress from "./UploadProgress";
import { useDispatch, connect } from "react-redux";
import { useDropzone } from "react-dropzone";

const Uploader = (props) => {
  const { individualFile, setIndividualFile } = props;
  const maxLength = 200;
  function nameLengthValidator(file) {
    if (file.name.length > maxLength) {
      return {
        code: "name-too-large",
        message: `Name is larger than ${maxLength} characters`,
      };
    }

    return null;
  }
  const handleDropFile = (files) => {
    // could do some validation for the attached file here
    console.log(files);
    setIndividualFile(files[0]);
    // dispatch(setUploadIndividualFile(files[0]));
    // dispatch(uploadFile(files))
  };
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      onDrop: handleDropFile,
      // validator: nameLengthValidator,
      // accept: "image/jpeg, image/png",
      maxFiles: 1,
      maxSize: 2e7,
    });
  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  return (
    <section className="uploader_container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className="upload_content">
          <div className="img_wrap">
            <img className="img-fluid file_img" src={"/images/ic_doc.svg"} />
          </div>
          <div className="text_wrap">
            {individualFile.status === "ready" &&
            individualFile.fileObj.file !== undefined ? (
              <p>{individualFile.fileObj.fileName}</p>
            ) : (
              <p>
                Click to browse or
                <br /> drag and drop your files
                <br />
                then Upload
              </p>
            )}
          </div>
        </div>
      </div>
      {/* <small>upload max size 10mb</small> */}
      <aside>
        <UploadProgress />
        <ul>{fileRejectionItems}</ul>
      </aside>
    </section>
  );
};
const mapStateToProps = (state) => {
  const { individualFile } = state.fileUpload;
  const { user } = state.auth;
  const { email, eventId } = user;
  return {
    individualFile,
    email,
    eventId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setIndividualFile: (file) => dispatch(setUploadIndividualFile(file)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Uploader);
