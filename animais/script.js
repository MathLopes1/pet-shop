const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sEspecie = document.querySelector('#m-especie')
const sRaca = document.querySelector('#m-raca')
const sNome = document.querySelector('#m-nome')
const sDono = document.querySelector('#m-dono')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id
let data
let linkImgData

  fetch('https://dog.ceo/api/breeds/image/random')
  .then(response => {
      return response.json();
  })
  .then(r => {
      linkImgData = r;
      console.log(linkImgData);
  })  

  function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }
  if (edit) {
    sEspecie.value = itens[index].especie
    sRaca.value = itens[index].raca
    sNome.value = itens[index].nome
    sDono.value = itens[index].dono
    id = index

  } else {
    sEspecie.value = ''
    sRaca.value = ''
    sNome.value = ''
    sDono.value = ''
  }
}

function editItem(index) {
  console.log('aqui')

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.especie}</td>
    <td>${item.raca}</td>
    <td>${item.nome}</td>
    <td>${item.dono}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sEspecie.value == '' || sRaca.value == '' || sNome.value == '' || sDono.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].especie = sEspecie.value
    itens[id].raca = sRaca.value
    itens[id].nome = sNome.value
    itens[id].dono = sDono.value
  } else {
    itens.push({'especie': sEspecie.value, 'raca': sRaca.value, 'nome': sNome.value, 'dono': sDono.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()