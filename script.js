const MAX_CAPACITY = 100;

// 📚 Famous Books
const defaultBooks = [
  {title:"Introduction to Algorithms", author:"Cormen"},
  {title:"Clean Code", author:"Robert Martin"},
  {title:"Cracking the Coding Interview", author:"Gayle Laakmann"},
  {title:"The Pragmatic Programmer", author:"Andrew Hunt"},
  {title:"Code Complete", author:"Steve McConnell"},
  {title:"Eloquent JavaScript", author:"Marijn Haverbeke"},
  {title:"You Don’t Know JS", author:"Kyle Simpson"},
  {title:"Python Crash Course", author:"Eric Matthes"},
  {title:"Head First Java", author:"Kathy Sierra"},
  {title:"Hands-On Machine Learning", author:"Aurélien Géron"},
  {title:"Deep Learning", author:"Ian Goodfellow"},
  {title:"Higher Engineering Mathematics", author:"B.S. Grewal"},
  {title:"Discrete Mathematics", author:"Kenneth Rosen"},
  {title:"Linear Algebra Done Right", author:"Axler"},
  {title:"Calculus", author:"James Stewart"},
  {title:"Naruto Vol 1", author:"Kishimoto"},
  {title:"One Piece Vol 1", author:"Oda"},
  {title:"Dragon Ball Z", author:"Toriyama"},
  {title:"Batman Comics", author:"DC"},
  {title:"Marvel Avengers", author:"Stan Lee"},
  {title:"Atomic Habits", author:"James Clear"},
  {title:"Rich Dad Poor Dad", author:"Kiyosaki"},
  {title:"Think and Grow Rich", author:"Napoleon Hill"},
  {title:"The Psychology of Money", author:"Morgan Housel"},
  {title:"Zero to One", author:"Peter Thiel"}
];

// Fill up to 100 books
let books = [];
for (let i = 0; i < 100; i++) {
  let base = defaultBooks[i % defaultBooks.length];
  books.push({
    title: base.title + " Vol " + (Math.floor(i / defaultBooks.length) + 1),
    author: base.author,
    isbn: "ISBN-" + (1000 + i)
  });
}

let issued = JSON.parse(localStorage.getItem("issued")) || [];

// Stats
function updateStats() {
  document.getElementById("totalBooks").innerText = books.length;
  document.getElementById("slots").innerText = MAX_CAPACITY - books.length;
  document.getElementById("capacity").innerText = MAX_CAPACITY;
}

// Add Book
function addBook() {
  if (books.length >= MAX_CAPACITY) return alert("Library Full ❌");

  let title = titleInput.value;
  let author = authorInput.value;
  let isbn = isbnInput.value;

  books.push({ title, author, isbn });
  displayBooks();
  updateStats();
}

// Issue
function issueBook() {
  issued.push({
    isbn: bookSelect.value,
    student: student.value,
    issueDate: issueDate.value,
    returnDate: returnDate.value
  });
  displayIssued();
}

// Return
function returnBook(i) {
  issued.splice(i,1);
  displayIssued();
}

// Display Books
function displayBooks() {
  bookList.innerHTML = "";
  bookSelect.innerHTML = "";

  books.forEach(b => {
    bookList.innerHTML += `<li>${b.title}</li>`;
    bookSelect.innerHTML += `<option value="${b.isbn}">${b.title}</option>`;
  });
}

// Display Issued
function displayIssued() {
  issuedList.innerHTML = "";

  issued.forEach((b,i)=>{
    issuedList.innerHTML += `
      <tr>
        <td>${b.isbn}</td>
        <td>${b.student}</td>
        <td>${b.issueDate}</td>
        <td>${b.returnDate}</td>
        <td><button onclick="returnBook(${i})">Return</button></td>
      </tr>`;
  });
}

// Init
displayBooks();
displayIssued();
updateStats();