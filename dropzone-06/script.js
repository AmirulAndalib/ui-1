



const dropzoneBox = document.getElementsByClassName("dropzone-box")[0];
const inputFiles = document.querySelectorAll(
  ".dropzone-area input[type='file']"
);
const inputElement = inputFiles[0];
const dropZoneElement = inputElement.closest(".dropzone-area");
const fileLimit = 25000000;

inputElement.addEventListener("change", (e) => {
  const filesArr =  Array.from(inputElement.files);
  const totalSize = filesArr.reduce((acc, file) => {
    acc += file.size;
    return acc;
  }, 0);

  if(totalSize > fileLimit) {
    alert("File is over 25MB!");
    return
  }

  if (filesArr.length) {
    updateDropzoneFileList(dropZoneElement, inputElement.files, filesArr);
  }
});

dropZoneElement.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZoneElement.classList.add("dropzone--over");
});

["dragleave", "dragend"].forEach((type) => {
  dropZoneElement.addEventListener(type, (e) => {
    dropZoneElement.classList.remove("dropzone--over");
  });
});

dropZoneElement.addEventListener("drop", (e) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  const filesArr =  Array.from(files);
  const totalSize = filesArr.reduce((acc, file) => {
    acc += file.size;
    return acc;
  }, 0);

  if(totalSize > fileLimit) {
    alert("File is over 25MB!");
    dropZoneElement.classList.remove("dropzone--over");
    return
  }

  if (files.length) {
    inputElement.files = files;
    updateDropzoneFileList(dropZoneElement, files, filesArr);
  }

  dropZoneElement.classList.remove("dropzone--over");
});

const updateDropzoneFileList = (
  dropzoneElement, files, filesArr
) => {
  let dropzoneFileMessage = dropzoneElement
  .querySelector(
    ".file-info"
  );

  const filesString = filesArr.reduce(
    (acc, file) => {
      acc = acc + `<li>${file.name}, ${file.size} bytes</li>\n`;
      return acc;
  }, '');

  dropzoneFileMessage.innerHTML = `<ul>
    ${filesString}
  </ul>`;
};

dropzoneBox.addEventListener("reset", (e) => {
  let dropzoneFileMessage = dropZoneElement.querySelector(
    ".file-info");

  dropzoneFileMessage.innerHTML = `No Files Selected`;
});

dropzoneBox.addEventListener("submit", (e) => {
  e.preventDefault();
  const myFile = document.getElementById("upload-file");

  const totalSize = Array.from(myFile.files).reduce(
    (acc, file) => {
      acc += file.size;
      return acc;
  }, 0);

  if (totalSize > fileLimit) {
    alert("Files are over 25MB!");
  }

  console.log("Files:", myFile.files);
});


