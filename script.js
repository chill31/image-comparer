const firstImage = document.querySelector('.first-image');
const secondImage = document.querySelector('.second-image');
const divider = document.querySelector('.circle');

const main = document.querySelector("main");

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

  if (percentage <= 0) return;
  if (percentage >= 100) return;

  firstImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0% 100%)`;
  secondImage.style.clipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;
  divider.parentElement.style.left = `${percentage}%`;

});

firstImage.addEventListener('dragstart', (e) => e.preventDefault());
secondImage.addEventListener('dragstart', (e) => e.preventDefault());

const firstFileInput = document.querySelector("[data-first]");
const secondFileInput = document.querySelector("[data-second]");

firstFileInput.addEventListener('change', (event) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const fileName = files[i].name.toLowerCase();
    const isImage = /\.(png|jpe?g|webp|svg)$/.test(fileName);
    if (!isImage) {
      alert("File format is not valid. Please input either png, jpg, jpeg, webp or svg.");
      continue;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[i]);
    reader.onload = (event) => {
      const dataURL = event.target.result;
      firstImage.src = dataURL;
    };
  }
});

secondFileInput.addEventListener('change', (event) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    const fileName = files[i].name.toLowerCase();
    const isImage = /\.(png|jpe?g|webp|svg)$/.test(fileName);
    if (!isImage) {
      alert("File format is not valid. Please input either png, jpg, jpeg, webp or svg.");
      continue;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[i]);
    reader.onload = (event) => {
      const dataURL = event.target.result;
      secondImage.src = dataURL;
    };
  }
});

const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", () => {
  firstImage.src = '/images/gradient1.png';
  secondImage.src = '/images/gradient2.png';
})