let addModal = document.querySelector(".add-modal");
let formAdd = document.querySelector(".form-add");
let closeAdd = document.querySelector(".close-add");
let wrapperPost = document.querySelector(".wrapper-post");
let formEdit = document.querySelector(".form-edit");
let closeEdit = document.querySelector(".close-edit");

// Data
let num = 2;

let data = [
  {
    id: 1,
    title: 1 + ". " + "Alex",
    password: "1234567",
    isComplete: false,
  },
];

function get() {
  wrapperPost.innerHTML = "";
  data.forEach((e) => {
    let orderList = document.createElement("ol");
    let listUser = document.createElement("li");
    listUser.innerHTML = e.title;
    let listPassword = document.createElement("p");
    listPassword.innerHTML = e.password;

    let btnEdit = document.createElement("p");
    btnEdit.innerHTML = "Edit";
    btnEdit.classList.add("btn-edit");
    let btnDelete = document.createElement("p");
    btnDelete.innerHTML = "Delete";
    btnDelete.classList.add("btn-delete");
    let btnChecked = document.createElement("input");
    btnChecked.type = "checkbox";
    btnChecked.checked = e.isComplete;
    orderList.append(listUser, listPassword, btnEdit, btnDelete, btnChecked);
    wrapperPost.append(orderList);
    // Delete Onclick
    btnDelete.addEventListener("click", () => {
      deletePost(e.id);
    });
    // Checked Onclick
    btnChecked.addEventListener("click", () => {
      checkedPost(e.id);
    });
    // Checked
    if (e.isComplete === true) {
      listUser.classList.add("line-checked");
      listPassword.classList.add("line-checked");
    } else {
      listUser.classList.remove("line-checked");
      listPassword.classList.remove("line-checked");
    }
    // Edit
    btnEdit.addEventListener("click", () => {
      editPost(e.id);
    });
  });
}
get();
// ShowModal event

addModal.addEventListener("click", () => {
  formAdd.style.display = "block";
});

// CloseModal event
closeAdd.addEventListener("click", () => {
  formAdd.style.display = "none";
});

// Add Post

formAdd.onsubmit = (event) => {
  event.preventDefault();
  let newData = {
    id: new Date().getTime(),
    title: num++ + ". " + event.target["username"].value,
    password: formAdd["password"].value,
    isComplete: false,
  };

  data.push(newData);
  get();
  formAdd.style.display = "none";
  event.target["username"].value = "";
  event.target["password"].value = "";
};

// Delete Post Function
function deletePost(id) {
  data = data.filter((e) => {
    return e.id !== id;
  });
  get();
}

// Checked Post Function
function checkedPost(id) {
  data = data.map((e) => {
    if (e.id === id) e.isComplete = !e.isComplete;
    return e;
  });
  console.log(data);
  get();
}

let newId = null;
// Функция Edit
function editPost(id) {
  formEdit.style.display = "block";
  let editData = data.find((e) => e.id === id);
  newId = id;
  formEdit["username"].value = editData.title;
  formEdit["password"].value = editData.password;
}

// Функция Save
formEdit.onsubmit = (event) => {
  event.preventDefault();
  data = data.map((e) => {
    if (e.id === newId) {
      e.title = event.target["username"].value;
      e.password = event.target["password"].value;
    }
    return e;
  });
  get();
  formEdit.style.display = "none";
};

// Close Edit Modal
closeEdit.addEventListener("click", () => {
  formEdit.style.display = "none";
});
