const inputs = document.querySelectorAll('input');
const authorInput = document.querySelector("#author");
const titleInput = document.querySelector("#title");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const addBtn = document.querySelector(".add-btn");
const mainContent = document.querySelector(".main-content");

class Library {
  constructor(author, title, pages, read) {
    let colors = Library.randomColors();
    let bookContainer = document.createElement("div")
    let bookSectionOne = document.createElement("div");
    let bookSectionTwo = document.createElement("div");
    let bookSectionThree = document.createElement("div");
    let readBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    let authorDiv = document.createElement("div");
    let titleDiv = document.createElement("div");
    let pagesDiv = document.createElement("div");
    let readDiv = document.createElement("div");

    bookContainer.setAttribute("class", "book-container");
    bookSectionOne.setAttribute("class", "book-section-one");
    bookSectionTwo.setAttribute("class", "book-section-two");
    bookSectionThree.setAttribute("class", "book-section-three")
    readBtn.setAttribute("class", "read-btn");
    deleteBtn.setAttribute("class", "delete-btn");
    bookSectionOne.style.backgroundColor = colors.notRead;
    bookSectionThree.style.backgroundColor = colors.notRead; 

    if (read === "yes") bookRead();
    else bookNotRead();

    readBtn.addEventListener("click", () => {
      if (read === "yes") read = "no", bookNotRead();
      else read = "yes", bookRead();
    })

    deleteBtn.addEventListener("click", () => {
      let deleteOrCancel = confirm("Do you accept?");
      if (deleteOrCancel) {
        mainContent.removeChild(bookContainer)
      }
    });

    authorDiv.setAttribute("class", "author");
    titleDiv.setAttribute("class", "title");
    pagesDiv.setAttribute("class", "pages");
    readDiv.setAttribute("class", "test");
    authorDiv.textContent = author;
    titleDiv.textContent = title
    pagesDiv.textContent = pages + " pages";
    readDiv.textContent = read;
    bookSectionOne.appendChild(readBtn);
    bookSectionOne.appendChild(deleteBtn);
    bookSectionTwo.appendChild(titleDiv);
    bookSectionTwo.appendChild(authorDiv);
    bookSectionTwo.appendChild(pagesDiv);
    bookContainer.appendChild(bookSectionOne);
    bookContainer.appendChild(bookSectionTwo);
    bookContainer.appendChild(bookSectionThree);
    mainContent.appendChild(bookContainer);

    inputs.forEach(input => input.value = "")

    function bookRead() {
      bookSectionOne.style.backgroundColor = colors.read;
      bookSectionThree.style.backgroundColor = colors.read;
      readBtn.style.backgroundImage = "url(./images/svg/bookmark-check.svg)";
      bookSectionTwo.style.color = Library.readColor;
    }
  
    function bookNotRead() {
      bookSectionOne.style.backgroundColor = colors.notRead;
      bookSectionThree.style.backgroundColor = colors.notRead;
      readBtn.style.backgroundImage = "url(./images/svg/bookmark-uncheck.svg)";
      bookSectionTwo.style.color = Library.notReadcolor;
    }
  }

  static readColor = "#000000";
  static notReadcolor = "#777777";

  static randomColors() {
    const randomNumber = Math.floor(Math.random() * 10)
    const colorsArray = [
      // rose
      {read: "#fb7185", notRead: "#fda4af"}, 
      // cyan
      {read: "#22d3ee", notRead: "#67e8f9"},
      // yellow
      {read: "#facc15", notRead: "#fde047"},
      // purple
      {read: "#c084fc", notRead: "#d8b4fe"}, 
      // green
      {read: "#4ade80", notRead: "#86efac"},
      // blue
      {read: "#60a5fa", notRead: "#93c5fd"},
      // fuchsia
      {read: "#e879f9", notRead: "#f0abfc"},
      // teal
      {read: "#2dd4bf", notRead: "#5eead4"},
      // orange
      {read: "#fb923c", notRead: "#fdba74"},
      // pink
      {read: "#f472b6", notRead: "#f9a8d4"}
    ];
    const colorsPick = colorsArray[randomNumber];
    return colorsPick;
  }
}

addBtn.addEventListener("click", () => {
  let valid = true;

  for (input of inputs) {
    if (!(input.value.split("").filter(value => value != " ").length !== 0 && input.checkValidity() === true)) {
      valid = false;
    }
  }

  if (valid) {
    new Library(authorInput.value, titleInput.value, pagesInput.value, readInput.value);
  }
})