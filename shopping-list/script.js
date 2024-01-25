
const previewBtn = document.getElementById("preview-btn");
const sourceBtn = document.getElementById("source-btn");

previewBtn.addEventListener("click", () => {
  window.open("./app/index.html");
});

sourceBtn.addEventListener("click", () => {
  window.open("https://github.com/BrunoReis-NZ/Projects/tree/main/shopping-list");
});