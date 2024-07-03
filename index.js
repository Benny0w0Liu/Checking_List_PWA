import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSettings = {
    databaseURL: "https://playground-checklist-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const ItemInDB = ref(database, "Items");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value;
    push(ItemInDB, inputValue);
    inputFieldEl.value = "";
})

onValue(ItemInDB, function (snapshot) {
    shoppingListEl.innerHTML = "";
    if (snapshot.val() == null) {
        shoppingListEl.innerHTML = "No items here...yet";
        return;
    }
    let items_array = Object.entries(snapshot.val());
    for (var i = 0; i < items_array.length; i++) {
        let newEl = document.createElement("li");
        newEl.textContent = items_array[i][1];
        newEl.id = items_array[i][0];
        shoppingListEl.append(newEl);
        newEl.addEventListener("click", function () {
            let exactLocationOfItem = ref(database, `Items/${newEl.id}`);
            remove(exactLocationOfItem);
            shoppingListEl.removeChild(newEl.id);
        });
    }

});