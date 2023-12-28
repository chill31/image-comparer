/** HORIZONTAL USER SECTION */

const horizontalFirstImage = document.querySelector(".first-hz-image");
const horizontalSecondImage = document.querySelector(".second-hz-image");
const horizontalDivider = document.querySelector(".hz-divider .circle");

const hzSection = document.querySelector(".hz-user");

let isHorizontalDragging = false;

horizontalDivider.addEventListener("pointerdown", () => {
  isHorizontalDragging = true;
});
document.addEventListener("pointerup", () => {
  isHorizontalDragging = false;
});
document.addEventListener("pointermove", (e) => {

  if (!isHorizontalDragging) return;

  const mouseX = e.clientX - hzSection.offsetLeft;
  const mainWidth = hzSection.offsetWidth;
  const percentage = (mouseX / mainWidth) * 100;

  if (percentage <= 0 || percentage >= 100) return;

  horizontalFirstImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0% 100%)`;
  horizontalSecondImage.style.clipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;
  horizontalDivider.parentElement.style.left = `${percentage}%`;

});

horizontalFirstImage.addEventListener('dragstart', (e) => e.preventDefault());
horizontalSecondImage.addEventListener('dragstart', (e) => e.preventDefault());

/** FILE INPUTS */

let horizontalFileInput = document.getElementById("horizontal-file-upload-input");
let horizontalFileSelect = document.querySelector(".horizontal-file-upload-select");


horizontalFileSelect.addEventListener("click", () => {
  horizontalFileInput.click();
});

let srcs = [];
horizontalFileInput.addEventListener("change", () => {
  let fileNames = horizontalFileInput.files;
  let selectName = document.querySelector(".file-select-name");

  selectName.textContent = '';
  if (fileNames.length < 2 || fileNames.length > 2) return alert("Please choose 2 images");

  let names = [];

  for (let i = 0; i < 2; i++) {
    const fileName = fileNames[i].name.toLowerCase();
    const isImage = /\.(png|jpe?g|webp|svg)$/.test(fileName);

    if (!isImage) {
      alert(`${i === 0 ? 'First' : 'Second'} file's format is not valid. Please input either png, jpg, jpeg, webp or svg.`);
      continue;
    }

    names.push(fileName);

    const reader = new FileReader();
    reader.readAsDataURL(fileNames[i]);
    reader.addEventListener("load", (event) => {
      const dataURL = event.target.result;

      if(i === 0) {
        horizontalFirstImage.src = dataURL;
      } else {
        horizontalSecondImage.src = dataURL;
      }
    });
  }
  selectName.textContent = names.join(", ");
});



/** VERTICAL USER SECTION */



const verticalFirstImage = document.querySelector(".first-vt-image");
const verticalSecondImage = document.querySelector(".second-vt-image");
const verticalDivider = document.querySelector(".vt-divider .circle");

const vtSection = document.querySelector(".vt-user");

let isVerticalDragging = false;

verticalDivider.addEventListener("pointerdown", () => {
  isVerticalDragging = true;
  console.log('verticalDivider is pointerdown')
});
document.addEventListener("pointerup", () => {
  isVerticalDragging = false;
  console.log('verticalDivider is destroyed')
});

document.addEventListener("pointermove", (e) => {

  if (!isVerticalDragging) return;
  const rect = vtSection.getBoundingClientRect();
  const mouseY = e.clientY - rect.top;
  
  const percentage = (mouseY / rect.height) * 100;

  console.log(percentage);
  if (percentage <= 0 || percentage >= 100) return;

  verticalFirstImage.style.clipPath = `polygon(0 0, 100% 0, 100% ${percentage}%, 0 ${percentage}%)`;
  verticalSecondImage.style.clipPath = `polygon(0 ${percentage}%, 100% ${percentage}%, 100% 100%, 0 100%)`;
  verticalDivider.parentElement.style.top = `${percentage - 50}%`;

});

verticalFirstImage.addEventListener('dragstart', (e) => e.preventDefault());
verticalSecondImage.addEventListener('dragstart', (e) => e.preventDefault());

/** FILE INPUTS */

let verticalFileInput = document.getElementById("vertical-file-upload-input");
let verticalFileSelect = document.querySelector(".vertical-file-upload-select");


verticalFileSelect.addEventListener("click", () => {
  verticalFileInput.click();
});

let vt_srcs = [];
verticalFileInput.addEventListener("change", () => {
  let fileNames = verticalFileInput.files;
  let selectName = document.querySelector(".vertical-file-upload-select .file-select-name");

  selectName.textContent = '';
  if (fileNames.length < 2 || fileNames.length > 2) return alert("Please choose 2 images");

  let names = [];

  for (let i = 0; i < 2; i++) {
    const fileName = fileNames[i].name.toLowerCase();
    const isImage = /\.(png|jpe?g|webp|svg)$/.test(fileName);

    if (!isImage) {
      alert(`${i === 0 ? 'First' : 'Second'} file's format is not valid. Please input either png, jpg, jpeg, webp or svg.`);
      continue;
    }

    names.push(fileName);

    const reader = new FileReader();
    reader.readAsDataURL(fileNames[i]);
    reader.addEventListener("load", (event) => {
      const dataURL = event.target.result;

      if(i === 0) {
        verticalFirstImage.src = dataURL;
      } else {
        verticalSecondImage.src = dataURL;
      }
    });
  }
  selectName.textContent = names.join(", ");
});

/** PICTURE MODE CODE */

const hzPictureModeCheckbox = document.getElementById("hz-picture-mode-checkbox");
const vtPictureModeCheckbox = document.getElementById("vt-picture-mode-checkbox");

const hzDivider = document.querySelector(".hz-divider");
const vtDivider = document.querySelector(".vt-divider");

hzPictureModeCheckbox.addEventListener("input", (e) => {
  if(e.target.checked) {
    hzDivider.classList.add("hide");
  } else {
    hzDivider.classList.remove("hide");
  }
});

vtPictureModeCheckbox.addEventListener("input", (e) => {
  if(e.target.checked) {
    vtDivider.classList.add("hide");
  } else {
    vtDivider.classList.remove("hide");
  }
});