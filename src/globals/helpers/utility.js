import { NotificationManager } from "react-notifications";

/*
Initial application state
*/

export const INIT_STATE = {
  show_custodian: false,
  fileList: [],
  form: null,
  batch_process: new Map(),
  batch_process_completed: new Set(),
};

/*update this array to support for other file extensions.
Ref to this link for file extensions and theri respective mime types https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types 
*/
export const VALID_FILE_EXTENSIONS = [
  { name: "jpg", mime: "image/jpg" },
  { name: "png", mime: "image/png" },
  { name: "pdf", mime: "application/pdf" },
];

/*function to validate files */

export const validateFiles = (files) => {
  let mime_types = [...files].map((file) => file.type);
  let valid_types = VALID_FILE_EXTENSIONS.map((file) => file.mime);
  //if there are some invalid files in the liat
  return !mime_types.some((type) => !valid_types.includes(type));
};

/*Notification extension throws findDOMNode is deprecated in StrictMode */
export const setNotification = (type, data = null) => {
  switch (type) {
    case "INVALID_FILES":
      NotificationManager.error(
        `Only allowed extensions are ${VALID_FILE_EXTENSIONS.map(
          (element) => element.name
        ).join()}`,
        "Invalid file type",
        3000
      );
      break;
    case "BATCH_PROCESSED":
      NotificationManager.success(
        `Batch id: ${data}`,
        "Batch processed successfully",
        3000
      );
      break;
    default:
      return null;
  }
};

/* fake axios request*/
export const axios = (form, uploadProgress) => {
  const batchId = form.get("batch_id");
  let progress = 0;
  //we will take 6 seconds for every batchprocess
  const timeTakenForUoload = 6000;
  //we will update progess in five ticks
  const uploadInterval = setInterval(() => {
    progress += 20;
    if (progress > 100) clearInterval(uploadInterval);
    uploadProgress(batchId, progress, form);
  }, timeTakenForUoload / 5);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //in case of time mismatch
      clearInterval(uploadInterval);
      uploadProgress(batchId, 100, form);
      //resolve the batch process
      resolve(batchId);
    }, timeTakenForUoload);
  });
};
/*
Helper function to convert map to array
*/
export const mapToArray = (map_obj) => {
  const map_array = [];
  if (map_obj.size > 0) {
    map_obj.forEach((value, key) => {
      map_array.push({ id: key, value: value });
    });
  }
  return map_array;
};
