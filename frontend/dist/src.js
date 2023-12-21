// const mainFormWidth = document.getElementById('mainForm').offsetWidth
// const halfForm = mainFormWidth/2;
// const Floatinfo = document.getElementById('Floatinfo')
// const getShaContent = document.getElementById('getShaContent')
// const rightInfo = document.getElementById('rightInfo')
// //rightInfo.classList.add(`w-[${mainFormWidth/2}px]`)
// //info.classList.add('right-0')
// getShaContent.addEventListener('click', function() {
//    // if (info.classList.contains('right-0')) {
//         //alert(12)
//         Floatinfo.classList.add("-translate-x-full")
//    // }
// })

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

   rightForm.classList.remove('opacity-0')
  rightForm.classList.remove('z-10')
   rightForm.classList.add('opacity-100')
   rightForm.classList.add('z-50')
   rightForm.classList.add('animate-show')
})
// if we wanna replace a property with a new value it's better to remove the old value and add the new value
dataPanel.addEventListener('click', function () {
   floatPanelContainer.classList.remove('-translate-x-full')
   floatPanel.classList.remove('translate-x-[50%]')
   leftPanel.classList.remove('translate-x-0')
   rightPanel.classList.remove('translate-x-[30%]')

   leftForm.classList.remove('translate-x-full')


})