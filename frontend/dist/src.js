go = document.querySelector('.goTitle')
node = document.querySelector('.nodeTitle')
goForm = document.querySelector('.goForm')
nodeForm = document.querySelector('.nodeForm')

go.addEventListener('click', function () {
    go.classList.remove('bg-slate-300')
    node.classList.add('bg-slate-300')
    goForm.classList.remove('hidden')
    nodeForm.classList.remove('flex')
    nodeForm.classList.add('hidden')
})
node.addEventListener('click', function () {
    node.classList.remove('bg-slate-300')
    go.classList.add('bg-slate-300')
    nodeForm.classList.remove('hidden')
    nodeForm.classList.add('flex')
    goForm.classList.add('hidden')
})

goInput = document.getElementById('goInput').value
nodeInput = document.getElementById('nodeInput').value

function submitText(pElement,value) {
    if (value.length < 8) {
        pElement.innerHTML = "Eror: Less than 8 chars"
    } else {
        pElement.innerHTML = "Ok"
    }
}