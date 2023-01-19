// Сделать контактную книжку с использованием Local Storage

// Что нужно реализовать:

// 1. CRUD - добавление, отображение, удаление, редактирование 

// В первый день выполняете  добавление, отображение 

// Во второй день выполняете удаление, редактирование 


let ContactNameInput = document.querySelector("#contact-name-input");
let ContactNumberInput = document.querySelector("#contact-number-input");
let addContact = document.querySelector('.btn');
let saveChangesBtn = document.querySelector(".save-changes-btn");

function initStorage() {
    if (!localStorage.getItem("contacts-data")) {
      localStorage.setItem("contacts-data", "[]");
    }
  }
  initStorage();
  
  function setContactsToStorage(contacts) {
    localStorage.setItem("contacts-data", JSON.stringify(contacts));
  }
  
  function getContactsFromStorage() {
    let contacts = JSON.parse(localStorage.getItem("contacts-data"));
    return contacts;
  }
  
  function render(data = getContactsFromStorage()) {
    let container = document.querySelector(".container");
    container.innerHTML = "";
    data.forEach((i) => {
      container.innerHTML += `
      <div class="card w-25 m-2" style="width: 18rem" id="${i.id}">
      <img src="https://play-lh.googleusercontent.com/_FY955G6x8cRVOLb-seFqoZfIVWBGprb6WzaGDx8bqTi1KuOKqlqPKWt5KXyjm8lVyA" class="card-img-top" alt="error" height="300">
      <div class="card-body">
          <h5 class="card-title">${i.contactName}</h5>
          <p class="card-text"><b>Number:</b>${i.contactNumber}</p>
          <a href="#" class="btn btn-primary btn-danger delete-contact-btn">Delete</a>
          <a href="#" class="btn btn-primary btn-secondary update-contact-btn" data-bs-toggle="modal"
          data-bs-target="#staticBackdrop">Update</a>
      </div>
      </div>
      `;
    });
    if (data.length === 0) return;
    addDeleteEvent()
    addUpdateEvent()
  }
  render();
  

//create contact start

function createContact() {
  let contactsObj = {
    id: Date.now(),
    contactName: ContactNameInput.value,
    contactNumber: ContactNumberInput.value,
  };

  let contacts = getContactsFromStorage();
  contacts.push(contactsObj);
  setContactsToStorage(contacts);

  ContactNameInput.value = "";
  ContactNumberInput.value = "";

  let btnClose = document.querySelector(".btn-close");
  btnClose.click(); 
  render();
}

let addContactBtn = document.querySelector(".add-contact-btn");
addContactBtn.addEventListener("click", createContact);

//create contact end

// delete contact start

function deleteContact(e) {
    let contactId = e.target.parentNode.parentNode.id;
    let contacts = getContactsFromStorage();
    contacts = contacts.filter((i) => i.id != contactId);
    setContactsToStorage(contacts);
    render();
  }
  
  function addDeleteEvent() {
    let delBtns = document.querySelectorAll(".delete-contact-btn");
    delBtns.forEach((i) => {
      i.addEventListener("click", deleteContact);
    });
  }
  
  // delete contact end

  // update contact start

function updateContact(e) {
    let contactId = e.target.parentNode.parentNode.id;
    console.log(contactId);
    let contacts = getContactsFromStorage();
    let contactsObj = contacts.find((i) => i.id == contactId);
    ContactNameInput.value = contactsObj.contactName;
    ContactNumberInput.value = contactsObj.contactNumber;
  
    saveChangesBtn.setAttribute("id", contactId);
  }
  
  function addUpdateEvent() {
    let updateBtns = document.querySelectorAll(".update-contact-btn");
    updateBtns.forEach((i) => i.addEventListener("click", updateContact));
  }
  
  function saveChanges(e) {
    if (!saveChangesBtn.id) return;
    let contacts = getContactsFromStorage();
    let contactsObj = contacts.find((i) => i.id == saveChangesBtn.id);
    console.log(contactsObj);
    contactsObj.contactName = ContactNameInput.value;
    contactsObj.contactNumber = ContactNumberInput.value;
    setContactsToStorage(contacts);
    saveChangesBtn.removeAttribute("id");
    ContactNameInput.value = "";
    ContactNumberInput.value = "";
    let btnClose = document.querySelector(".btn-close");
    btnClose.click();
    render();
  }
  
  saveChangesBtn.addEventListener("click", saveChanges);
  
  // update contact end