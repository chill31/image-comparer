const firstImage = document.querySelector('.first-image');
const secondImage = document.querySelector('.second-image');
const divider = document.querySelector('.circle');

const main = document.querySelector(".main");

let isDragging = false;

// Event listeners
divider.addEventListener('pointerdown', () => {
  isDragging = true;
});
document.addEventListener('pointerup', () => {
  isDragging = false;
});
document.addEventListener('pointermove', (e) => {

  if (!isDragging) return;

  const mouseX = e.clientX - main.offsetLeft;
  const mainWidth = main.offsetWidth;
  const percentage = (mouseX / mainWidth) * 100;

  if (percentage <= 0 || percentage >= 100) return;

  firstImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0% 100%)`;
  secondImage.style.clipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;
  divider.parentElement.style.left = `${percentage}%`;

});

firstImage.addEventListener('dragstart', (e) => e.preventDefault());
secondImage.addEventListener('dragstart', (e) => e.preventDefault());

/** USER SECTION */

const customFirstImage = document.querySelector(".first-custom-image");
const customSecondImage = document.querySelector(".second-custom-image");
const customDivider = document.querySelectorAll(".circle")[1]

const section = document.querySelector(".user");

let isCustomDragging = false;

customDivider.addEventListener("pointerdown", () => {
  isCustomDragging = true;
});
document.addEventListener("pointerup", () => {
  isCustomDragging = false;
});
document.addEventListener("pointermove", (e) => {

  if (!isCustomDragging) return;

  const mouseX = e.clientX - section.offsetLeft;
  const mainWidth = section.offsetWidth;
  const percentage = (mouseX / mainWidth) * 100;

  if (percentage <= 0 || percentage >= 100) return;

  customFirstImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0% 100%)`;
  customSecondImage.style.clipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;
  customDivider.parentElement.style.left = `${percentage}%`;

});

customFirstImage.addEventListener('dragstart', (e) => e.preventDefault());
customSecondImage.addEventListener('dragstart', (e) => e.preventDefault());

// const firstFileInput = document.querySelector("[data-first]");
// const secondFileInput = document.querySelector("[data-second]");

// firstFileInput.addEventListener('change', (event) => {
//   const files = event.target.files;
//   for (let i = 0; i < files.length; i++) {
//     const fileName = files[i].name.toLowerCase();
//     const isImage = /\.(png|jpe?g|webp|svg)$/.test(fileName);
//     if (!isImage) {
//       alert("File format is not valid. Please input either png, jpg, jpeg, webp or svg.");
//       continue;
//     }
//     const reader = new FileReader();
//     reader.readAsDataURL(files[i]);
//     reader.onload = (event) => {
//       const dataURL = event.target.result;
//       firstImage.src = dataURL;
//     };
//   }
// });

// secondFileInput.addEventListener('change', (event) => {
//   const files = event.target.files;
//   for (let i = 0; i < files.length; i++) {
//     const fileName = files[i].name.toLowerCase();
//     const isImage = /\.(png|jpe?g|webp|svg)$/.test(fileName);
//     if (!isImage) {
//       alert("File format is not valid. Please input either png, jpg, jpeg, webp or svg.");
//       continue;
//     }
//     const reader = new FileReader();
//     reader.readAsDataURL(files[i]);
//     reader.onload = (event) => {
//       const dataURL = event.target.result;
//       secondImage.src = dataURL;
//     };
//   }
// });

// const resetBtn = document.querySelector(".reset-btn");
// resetBtn.addEventListener("click", () => {
//   firstImage.src = '/images/gradient1.png';
//   secondImage.src = '/images/gradient2.png';
// })

/** FILE INPUTS */

let fileInput = document.getElementById("file-upload-input");
let fileSelect = document.querySelector(".file-upload-select");

fileSelect.addEventListener("click", () => {
  fileInput.click();
});

let srcs = [];
fileInput.addEventListener("change", () => {
  let fileNames = fileInput.files;
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
        customFirstImage.src = dataURL;
      } else {
        customSecondImage.src = dataURL;
      }
    });
  }
  selectName.textContent = names.join(", ");
});