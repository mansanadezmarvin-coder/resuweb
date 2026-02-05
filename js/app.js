function $(id){return document.getElementById(id)}

function updatePreview(){
  $('pv-name').textContent = $('name').value || 'Your Name'
  $('pv-title').textContent = $('title').value || 'Your Title'
  const email = $('email').value || ''
  const phone = $('phone').value || ''
  $('pv-contact').textContent = [email, phone].filter(Boolean).join(' • ')
  $('pv-summary').textContent = $('summary').value || 'A short professional summary.'
  $('pv-skills').textContent = $('skills').value || 'Skill1, Skill2'

  const expRaw = $('experience').value.trim()
  const container = $('pv-experience')
  container.innerHTML = ''
  if(!expRaw){
    const p = document.createElement('p')
    p.textContent = 'Company • Role • Years'
    container.appendChild(p)
    return
  }
  const lines = expRaw.split(/\r?\n/).filter(Boolean)
  for(const ln of lines){
    const p = document.createElement('p')
    p.textContent = ln
    container.appendChild(p)
  }
}

function exportPDF(){
  const el = $('resume-preview')
  const opt = {
    margin: 0.4,
    filename: (`${$('name').value || 'resume'}`).replace(/[^a-z0-9\-_. ]/ig,'') + '.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  }
  html2pdf().set(opt).from(el).save()
}

document.addEventListener('DOMContentLoaded', ()=>{
  $('update').addEventListener('click', ()=>{
    updatePreview()
  })
  $('export').addEventListener('click', ()=>{
    updatePreview()
    exportPDF()
  })
  // populate preview with defaults
  updatePreview()
})
