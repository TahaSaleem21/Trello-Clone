let listIdCounter = 1;

document.getElementById("add-list-btn").addEventListener("click", function () {
  const newList = createListElement(`List ${listIdCounter}`);
  document.getElementById("board").appendChild(newList);
  listIdCounter++;
});

function createListElement(title) {
  const listContainer = document.createElement("div");
  listContainer.classList.add("list");

  const listHeader = document.createElement("div");
  listHeader.classList.add("list-header");

  const input = document.createElement("input");
  input.type = "text";
  input.classList.add("list-title-input");
  input.placeholder = "Enter list title...";
  input.value = title;

  const deleteListButton = document.createElement("button");
  deleteListButton.classList.add("delete-list-btn");
  deleteListButton.textContent = "Delete List";
  deleteListButton.addEventListener("click", function () {
    listContainer.remove();
  });

  const listCards = document.createElement("div");
  listCards.classList.add("list-cards");
  listCards.addEventListener("dragover", dragOver);
  listCards.addEventListener("drop", drop);

  const addCardContainer = document.createElement("div");
  addCardContainer.classList.add("add-card");

  const cardInput = document.createElement("input");
  cardInput.type = "text";
  cardInput.classList.add("card-input");
  cardInput.placeholder = "Enter a title for this card...";

  const addCardButton = document.createElement("button");
  addCardButton.classList.add("add-card-btn");
  addCardButton.textContent = "Add Card";

  addCardButton.addEventListener("click", function () {
    const cardTitle = cardInput.value.trim();
    if (cardTitle !== "") {
      const card = createCardElement(cardTitle);
      listCards.appendChild(card);
      cardInput.value = "";
    }
  });

  listHeader.appendChild(input);
  listHeader.appendChild(deleteListButton);
  addCardContainer.appendChild(cardInput);
  addCardContainer.appendChild(addCardButton);
  listContainer.appendChild(listHeader);
  listContainer.appendChild(listCards);
  listContainer.appendChild(addCardContainer);

  return listContainer;
}

function createCardElement(title) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("draggable", "true");
  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);

  const cardText = document.createElement("span");
  cardText.textContent = title;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-card-btn");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    card.remove();
  });

  card.appendChild(cardText);
  card.appendChild(deleteButton);

  return card;
}

function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  setTimeout(() => {
    event.target.classList.add("hide");
  }, 0);
  event.target.classList.add("dragging");
}

function dragEnd(event) {
  event.target.classList.remove("hide");
  event.target.classList.remove("dragging");
}

function dragOver(event) {
  event.preventDefault();
  const draggingElement = document.querySelector(".dragging");
  const afterElement = getDragAfterElement(
    event.target.closest(".list-cards"),
    event.clientY
  );
  const listCards = event.target.closest(".list-cards");
  if (afterElement == null) {
    listCards.appendChild(draggingElement);
  } else {
    listCards.insertBefore(draggingElement, afterElement);
  }
}

function drop(event) {
  event.preventDefault();
  const draggable = document.querySelector(".dragging");
  draggable.classList.remove("dragging");
}

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".card:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
