//don't require any module here, it will open a security hole. More details here: https://stackoverflow.com/questions/44391448/electron-require-is-not-defined/57049268#57049268

const input = document.querySelector("input");
const result = document.querySelector("h2");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); //avoiding default page/window refresh behavior

  //if no files were chosen,
  if (!input.files[0]) {
    return (result.innerText = "No video files were chosen");
  }

  const { path } = input.files[0];

  //customized api functions from preload.js to remove security holes
  window.api.send("video:submit", path);
  //while the video length is processing, setting the result to `calculating`
  result.innerText = "calculating...";
});

input.addEventListener("click", () => {
  result.innerText = "";
});

//customized api functions from preload.js to remove security holes
window.api.receive("video:length", (event, length) => {
  document.querySelector(
    "h2"
  ).innerText = `Video duration is: ${length} seconds`;
});
