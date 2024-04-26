const kittens = [
  { name: "Мочалка", age: 2, color: "Светлый" },
  { name: "Мухоморчик", age: 3, color: "Рыжий в крапинку" }
];

function displayCollection(collection, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; 

  collection.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("item");

    const info = `
      <p><b>Имя:</b> ${item.name}</p>
      <p><b>Возраст:</b> ${item.age}</p>
      <p><b>Окрас:</b> ${item.color}</p>
      <button onclick="startRedact(${index})">Редактировать</button>
      <button onclick="deleteKitten(${index})">Удалить</button>
    `;

    itemElement.innerHTML = info;
    container.appendChild(itemElement);
  });
}

function addKitten(event) {
  event.preventDefault(); 

  const form = event.target;
  const name = form.elements.name.value;
  const age = parseInt(form.elements.age.value);
  if (age > 0) {
    const color = form.elements.color.value;

    kittens.push({ name, age, color });

    form.reset();
  } else {
    alert("Пожалуйста, введите корректный возраст (больше нуля).");
    form.reset();
  }
  
  displayCollection(kittens, "collection");
}

function deleteKitten(index) {
  kittens.splice(index, 1); 
  displayCollection(kittens, "collection"); 
}

function startRedact(index) {
  const kitten = kittens[index];
  document.getElementById("redactName").value = kitten.name;
  document.getElementById("redactAge").value = kitten.age;
  document.getElementById("redactColor").value = kitten.color;

  document.getElementById("redactContainer").style.display = "block";
  document.getElementById("redact").dataset.index = index;
}

function saveRedact(event) {
  event.preventDefault(); 

  const form = event.target;
  const index = parseInt(form.dataset.index);
  const newName = form.elements.redactName.value;
  const newAge = parseInt(form.elements.redactAge.value);
  const newColor = form.elements.redactColor.value;
  if (newAge > 0) {
    if (newName && !isNaN(newAge) && newColor) {
    kittens[index].name = newName;
    kittens[index].age = newAge;
    kittens[index].color = newColor;

    displayCollection(kittens, "collection");

    document.getElementById("redactContainer").style.display = "none";
    }
  }
  else {
    alert("Пожалуйста, введите корректный возраст (больше нуля).");
    form.reset();
  }
}

function cancelRedact() {
  document.getElementById("redactContainer").style.display = "none";
}

window.onload = function() {
  displayCollection(kittens, "collection");

  document.getElementById("dobavl").addEventListener("submit", addKitten);

  document.getElementById("redact").addEventListener("submit", saveRedact);
};