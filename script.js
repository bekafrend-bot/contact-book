let data = JSON.parse(localStorage.getItem('myContacts')) || [];
let filter = 'all';

const listDiv = document.getElementById('list');
const form = document.getElementById('myBtnForm');

function show() {
    listDiv.innerHTML = '';
    let search = document.getElementById('findInput').value.toLowerCase();

    data.forEach((person, index) => {
        if (filter !== 'all' && person.group !== filter) return;
        if (!person.name.toLowerCase().includes(search) && !person.phone.includes(search)) return;

        let div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            <div class="info">
                <b>${person.name}</b>
                <span>${person.phone}</span><br>
                <small>${person.email}</small><br>
                <span class="tag">${person.group}</span>
            </div>
            <div class="btns">
                <button class="edit" onclick="edit(${index})">Изм.</button>
                <button class="del" onclick="remove(${index})">Удалить</button>
            </div>
        `;
        listDiv.appendChild(div);
    });
}

form.onsubmit = (e) => {
    e.preventDefault();
    let id = document.getElementById('editId').value;
    let obj = {
        name: document.getElementById('userName').value,
        phone: document.getElementById('userPhone').value,
        email: document.getElementById('userEmail').value,
        group: document.getElementById('userGroup').value
    };

    if (id === "") {
        data.push(obj);
    } else {
        data[id] = obj;
        document.getElementById('editId').value = "";
        document.getElementById('saveBtn').innerText = "Сохранить";
        document.getElementById('stopEdit').style.display = "none";
    }

    localStorage.setItem('myContacts', JSON.stringify(data));
    form.reset();
    show();
};

function remove(i) {
    if (confirm("Точно удалить?")) {
        data.splice(i, 1);
        localStorage.setItem('myContacts', JSON.stringify(data));
        show();
    }
}

function edit(i) {
    let p = data[i];
    document.getElementById('userName').value = p.name;
    document.getElementById('userPhone').value = p.phone;
    document.getElementById('userEmail').value = p.email;
    document.getElementById('userGroup').value = p.group;
    document.getElementById('editId').value = i;
    
    document.getElementById('saveBtn').innerText = "Обновить";
    document.getElementById('stopEdit').style.display = "inline";
}

document.getElementById('stopEdit').onclick = () => {
    form.reset();
    document.getElementById('editId').value = "";
    document.getElementById('saveBtn').innerText = "Сохранить";
    document.getElementById('stopEdit').style.display = "none";
};

function setFilter(f) {
    filter = f;
    let btns = document.querySelectorAll('.tab-btn');
    btns.forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    show();
}

document.getElementById('findInput').oninput = show;

show();
