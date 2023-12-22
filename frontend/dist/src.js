const shaPanel = document.getElementById('shaPanel')
const dataPanel = document.getElementById('dataPanel')

const floatPanelContainer = document.getElementById('floatPanelContainer')
const floatPanel = document.getElementById('floatPanel')

const rightPanel = document.getElementById('rPanel')
const leftPanel = document.getElementById('lPanel')

const leftForm = document.getElementById('lForm')
const rightForm = document.getElementById('rForm')

shaPanel.addEventListener('click', function () {
   floatPanelContainer.classList.add('-translate-x-full')
   floatPanel.classList.add('translate-x-[50%]')
   leftPanel.classList.add('translate-x-0')
   rightPanel.classList.remove('translate-x-0')
   rightPanel.classList.add('translate-x-[30%]')

   leftForm.classList.add('translate-x-full')
   rightForm.classList.add('translate-x-full')

   rightForm.classList.add('opacity-100')
   rightForm.classList.add('z-50')
   rightForm.classList.add('animate-show')
})

dataPanel.addEventListener('click', function () {
   floatPanelContainer.classList.remove('-translate-x-full')
   floatPanel.classList.remove('translate-x-[50%]')
   leftPanel.classList.remove('translate-x-0')
   rightPanel.classList.remove('translate-x-[30%]')

   leftForm.classList.remove('translate-x-full')
   rightForm.classList.remove('translate-x-full')
   rightForm.classList.remove('opacity-100')
   rightForm.classList.remove('z-50')
   rightForm.classList.remove('animate-show')
})

const nodePost = document.getElementById('nodePost')
const goPost = document.getElementById('goPost')



const goURL = "http://localhost:3061/go/sha256";
const nodeURL = 'http://localhost:3060/node/sha256'


goPost.onclick = () => getSha(goURL);
 //goPost.addEventListener('click', getSha(goURL))   did not work :(

nodePost.onclick = () => getSha(nodeURL);

const shaResult = document.getElementById('shaResult')

function getSha(url) {
   data = document.getElementById('data').value;
   try {
      fetch(url, {
         method: "POST",
         body: JSON.stringify({ message: "", data: data }),
         headers: {
            "Content-type": "application/json",
         }
      })
         .then(res => res.json())
         .then(content => {
            shaResult.value = content.data
            if (content.message == "Error") {
               shaResult.classList.add('text-red-900')
               shaResult.classList.remove('placeholder-opacity-50')
               shaResult.classList.add('placeholder-opacity-100')
            } else {
               shaResult.classList.remove('text-red-900')
               shaResult.classList.remove('placeholder-opacity-100')
               shaResult.classList.add('placeholder-opacity-50')
            }
         })

   } catch (error) {
      console.error(`error: ${error.message}`)
   }
}

const nodeGet = document.getElementById('nodeGet')
const goGet = document.getElementById('goGet')

const dataResult = document.getElementById('dataResult')

goGet.onclick = () => getData(goURL); 

nodeGet.onclick = () => getData(nodeURL); 

function getData(url) {
   sha256 = document.getElementById('sha256').value;
   url += `?sha=${sha256}`
   try {
      fetch(url, {
         method: "GET",
         headers: {
            "Content-type": "application/json",
         }
      })
         .then(res => res.json())
         .then(content => {
            dataResult.value = content.data
            if (content.message == "Error") {
               dataResult.classList.add('text-red-900')
               dataResult.classList.remove('placeholder-opacity-50')
               dataResult.classList.add('placeholder-opacity-100')
            } else {
               dataResult.classList.remove('text-red-900')
               dataResult.classList.remove('placeholder-opacity-100')
               dataResult.classList.add('placeholder-opacity-50')
            }
         })

   } catch (error) {
      console.error(`error: ${error.message}`)
   }
}