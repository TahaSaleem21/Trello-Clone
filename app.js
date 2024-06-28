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