// import axios from 'axios'
import { size } from "lodash";

export const modifyFiles = (existingFiles, files) => {
  let fileToUpload = {};
  // const reader = new FileReader();
  // console.log("reader", reader)
  // console.log("file", file)
  // if (reader !== undefined && file !== undefined) {
  //   reader.onloadend = () => {
  //     console.log((reader.result))
  //   }
  //   reader.readAsDataURL(file);
  // }

  for (let i = 0; i < files.length; i++) {
    const id = size(existingFiles) + i + 1;
    // const CancelToken = axios.CancelToken  --> can be used for cancelling upload progress
    // const source = CancelToken.source()

    fileToUpload = {
      ...fileToUpload,
      [id]: {
        id,
        file: files[i],
        progress: 0,
        // cancelSource: source,
      },
    };
  }

  return fileToUpload;
};

export function getBase64(fileToUpload) {
  if (fileToUpload !== undefined) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      if (reader !== undefined && fileToUpload !== undefined) {
        reader.readAsBinaryString(fileToUpload);
        reader.onload = () => resolve({ file: btoa(reader.result) });
        reader.onerror = (error) => reject(error);
      }
    });
  }
}
