// Fetch data from local JSON server
fetch("http://localhost:3000/styles")
  .then(response => response.json())
  .then(data => displayStyles(data));

// Display shaving styles with images and prices
function displayStyles(data) {
  const styles = document.getElementById("styles");

  data.forEach(style => {
    const styleDiv = document.createElement("div");
    styleDiv.classList.add("style");

    const name = document.createElement("h2");
    name.textContent = style.name;
    styleDiv.appendChild(name);

    const description = document.createElement("p")
    description.textContent = style.description;
    styleDiv.appendChild(description);

    const image = document.createElement("img");
    image.src = style.image;
    styleDiv.appendChild(image);

    const price = document.createElement("p");
    price.textContent = "Price: $" + style.price;
    styleDiv.appendChild(price);
   
      const likeButton = document.createElement("button");
      likeButton.textContent = "Likes"; 
    let count = 0
      likeButton.addEventListener("click", () => {
        likeStyle(style.id); 
        count ++; 
        likeButton.textContent = `${count} likes`;
      });
      styleDiv.appendChild(likeButton);
 
      //comment section
// Select the comment section element
const commentSection = document.querySelector('#comments #comment');

// Select the form element and add an event listener for the submit event
const form = document.querySelector('#comments form');
form.addEventListener('submit', event => {
  event.preventDefault(); // Prevent the form from submitting normally
  
  // Get the values from the form inputs
  const name = document.querySelector('#name').value;
  const comment = document.querySelector('#comment').value;
  
  // Create a new comment element and add it to the comment section
  const newComment = document.createElement('div');
  newComment.textContent = `${name}: ${comment}`;
  commentSection.appendChild(newComment);
  
  // Clear the form inputs
  document.querySelector('#name').value = '';
  document.querySelector('#comment').value = '';
  
  // Clear the comment section
  commentSection.innerHTML = '';
});

    const commentInput = document.createElement("input");
    commentInput.type = "text, number";
    commentInput.placeholder = "Add a comment";
    styleDiv.appendChild(commentInput);

    const commentButton = document.createElement("button");
    commentButton.textContent = "Comment";
    commentButton.addEventListener("click", () => {
      commentStyle(style.id, commentInput.value);
      
      commentInput.value = "Thanks For Your Feedback";
    });
    styleDiv.appendChild(commentButton);

    const commentsDiv = document.createElement("div");
    commentsDiv.id = "comments-" + style.id;
    style.comments.forEach(comment => {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");

      const commentBtn = document.getElementById('comment-btn');
const commentsContainer = document.getElementById('comments-container');

// Add an event listener to the comment button
commentBtn.addEventListener('click', function() {
//  Get the user's comment from an input field (or wherever)
  const newComment = document.getElementById('new-comment').value;

 // Create a new comment element
  const commentEl = document.createElement('div');
  commentEl.classList.add('comment');
  commentEl.textContent = newComment;

 // Add the new comment to the container
  commentsContainer.appendChild(commentEl);
});        

      const author = document.createElement("p");
      author.textContent = comment.author;
      commentDiv.appendChild(author);

      const text = document.createElement("p");
      text.textContent = comment.text;
      commentDiv.appendChild(text);

      commentsDiv.appendChild(commentDiv);
      const stylesList = document.getElementById('styles-list');
const addStyleButton = document.getElementById('add-style');

  });
    styleDiv.appendChild(commentsDiv);
    
    styles.appendChild(styleDiv);
  });
}

function updateStyle() {
  const styleId = prompt("Enter the ID of the style you want to update:");
  const updatedFields = {};
  if (document.getElementById("nameInput").value) {
    updatedFields.name = document.getElementById("nameInput").value;
  }
  if (document.getElementById("descriptionInput").value) {
    updatedFields.description = document.getElementById("descriptionInput").value;
  }
  if (document.getElementById("imageInput").value) {
    updatedFields.image = document.getElementById("imageInput").value;
  }
  fetch(`http://localhost:3000/styles/${styleId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFields),
  })
    .then((response) => response.json())
    .then((updatedStyle) => {
      const styleElement = document.getElementById(`style-${styleId}`);
      if (updatedFields.name) {
        styleElement.querySelector(".name").textContent = updatedFields.name;
      }
      if (updatedFields.description) {
        styleElement.querySelector(".description").textContent = updatedFields.description;
      }
      if (updatedFields.image) {
        styleElement.querySelector(".image").src = updatedFields.image;
      }
    });
}

function deleteItem() {
  var id = prompt("Enter the ID of the item you want to delete:");
  var item = document.getElementById(id);
  if (item) {
    item.remove();
    console.log("Item with ID " + id + " was deleted.");
  } else {
    console.log("Item with ID " + id + " not found.");
    alert("Item not found.");
  }
}

function addItem() {
  var name = prompt("Enter the name of the item:");
  var description = prompt("Enter a description of the item:");
  var imageUrl = prompt("Enter the URL of the item's image:");
  
  // Create a new item object
  var newItem = {
    name: name,
    description: description,
    imageUrl: imageUrl
  };
  
  // Add the item to the local storage
  var items = JSON.parse(localStorage.getItem("items")) || [];
  items.push(newItem);
  localStorage.setItem("items", JSON.stringify(items));
  
  // Add the item to the web page
  var itemList = document.getElementById("styles");
  var newItemElement = document.createElement("div");
  newItemElement.classList.add("item");
  newItemElement.innerHTML = `
    <h2>${newItem.name}</h2>
    <p>${newItem.description}</p>
    <img src="${newItem.imageUrl}">
  `;
  itemList.appendChild(newItemElement);
}


// Like a shaving style
function likeStyle(id) {
  // Code to like the style with the given id
}

// Comment on a shaving style
function commentStyle(id, text) {
  // Code to add the comment to the style with the given id
}

// Search for a shaving style
function search() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toUpperCase();
  const styles = document.getElementById("styles");
  const styleDivs = styles.getElementsByClassName("style");

  Array.from(styleDivs).forEach(styleDiv => {
    const name = styleDiv.getElementsByTagName("h2")[0];
    const description = styleDiv.getElementsByTagName("p")[0];
      const text = name.textContent.toUpperCase() + " " + description.textContent.toUpperCase();

    if (text.indexOf(filter) > -1) {
      styleDiv.style.display = "";
    } else {
      styleDiv.style.display = "none";
    }
  });

}
