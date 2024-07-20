const addBtn = document.querySelector(".add-btn");
const authorInput = document.querySelector("#author");
const titleInput = document.querySelector("#title");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
const mainContent = document.querySelector(".main-content");
const inputs = document.querySelectorAll('input');

const myLibrary = [];

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  if (checkIsEmpty(authorInput) && checkIsEmpty(titleInput) && checkIsEmpty(pagesInput) && checkIsEmpty(readInput) && authorInput.checkValidity() === true && titleInput.checkValidity() === true && pagesInput.checkValidity() === true && readInput.checkValidity() === true) {
    let book = new Book(authorInput.value, titleInput.value, pagesInput.value, readInput.value.toLowerCase());
    let colors = randomColors();
    let readColor = "#000000";
    let notReadcolor = "#777777";

    myLibrary.push(book);
    
    let bookContainer = document.createElement("div")
    let bookSectionOne = document.createElement("div");
    let bookSectionTwo = document.createElement("div");
    let bookSectionThree = document.createElement("div");
    let readBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    let author = document.createElement("div");
    let title = document.createElement("div");
    let pages = document.createElement("div");
    let read = document.createElement("div");
    bookContainer.setAttribute("class", "book-container");
    bookSectionOne.setAttribute("class", "book-section-one");
    bookSectionTwo.setAttribute("class", "book-section-two");
    bookSectionThree.setAttribute("class", "book-section-three")
    readBtn.setAttribute("class", "read-btn");
    deleteBtn.setAttribute("class", "delete-btn");
    bookSectionOne.style.backgroundColor = colors.notRead;
    bookSectionThree.style.backgroundColor = colors.notRead; 

    if (book.read === "yes") bookRead();
    else bookNotRead();

    readBtn.addEventListener("click", () => {
      if (book.read === "yes") book.read = "no", bookNotRead();
      else book.read = "yes", bookRead();
    })

    deleteBtn.addEventListener("click", () => {
      let deleteOrCancel = confirm("Do you accept?");
      if (deleteOrCancel) myLibrary.splice(myLibrary.indexOf(book), 1), mainContent.removeChild(bookContainer);
    });

    author.setAttribute("class", "author");
    title.setAttribute("class", "title");
    pages.setAttribute("class", "pages");
    read.setAttribute("class", "test");
    author.textContent = book.author;
    title.textContent = book.title;
    pages.textContent = book.pages + " pages";
    read.textContent = book.read;
    bookSectionOne.appendChild(readBtn);
    bookSectionOne.appendChild(deleteBtn);
    bookSectionTwo.appendChild(title);
    bookSectionTwo.appendChild(author);
    bookSectionTwo.appendChild(pages);
    bookContainer.appendChild(bookSectionOne);
    bookContainer.appendChild(bookSectionTwo);
    bookContainer.appendChild(bookSectionThree);
    mainContent.appendChild(bookContainer);

    inputs.forEach(input =>  input.value = "");
    
    function randomColors() {
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

    function bookRead() {
      bookSectionOne.style.backgroundColor = colors.read;
      bookSectionThree.style.backgroundColor = colors.read;
      readBtn.style.backgroundImage = "url(./images/svg/bookmark-check.svg)";
      bookSectionTwo.style.color = readColor;
    }
    
    function bookNotRead() {
      bookSectionOne.style.backgroundColor = colors.notRead;
      bookSectionThree.style.backgroundColor = colors.notRead;
      readBtn.style.backgroundImage = "url(./images/svg/bookmark-uncheck.svg)";
      bookSectionTwo.style.color = notReadcolor;
    }
  }

  function checkIsEmpty(input) {
    if (!(input.value.split("").filter(value => value != " ").length === 0)) return true
  }
}

addBtn.addEventListener("click", addBookToLibrary);