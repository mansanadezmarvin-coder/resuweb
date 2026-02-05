// script.js — Resume Builder behavior
// - Real-time preview updates
// - Renders skills as pills and experience as bulleted list
// - Hides empty sections
// - Exports to PDF via window.print() (print CSS used)

function $id(id){ return document.getElementById(id) }

// --- Data collection ---
function collectData(){
  return {
    name: $id('name').value.trim(),
    title: $id('title').value.trim(),
    email: $id('email').value.trim(),
    phone: $id('phone').value.trim(),
    age: $id('age').value.trim(),
    linkedin: $id('linkedin').value.trim(),
    address: $id('address').value.trim(),
    citycountry: $id('citycountry').value.trim(),
    summary: $id('summary').value.trim(),
    skills: $id('skills').value.split(',').map(s => s.trim()).filter(Boolean),
    experience: $id('experience').value.split(/\r?\n/).map(l => l.trim()).filter(Boolean),
    education: $id('education').value.split(/\r?\n/).map(l => l.trim()).filter(Boolean),
    certifications: $id('certifications').value.split(/\r?\n/).map(l => l.trim()).filter(Boolean),
    projects: $id('projects').value.split(/\r?\n/).map(l => l.trim()).filter(Boolean),
    languages: $id('languages').value.split(/\r?\n/).map(l => l.trim()).filter(Boolean),
    awards: $id('awards').value.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
  }
}

// --- Preview rendering ---
function renderPreview(data){
  $id('pv-name').textContent = data.name || 'Your Name'
  $id('pv-title').textContent = data.title || 'Your Title'

  // Contact line: email • phone • city
  const contactParts = [data.email, data.phone, data.citycountry].filter(Boolean)
  let contactLine = contactParts.join(' • ')
  if(data.linkedin) contactLine += (contactLine ? ' • ' : '') + data.linkedin
  $id('pv-contact').textContent = contactLine || 'email • phone'

  // Summary
  const summaryEl = $id('pv-summary')
  const secSummary = $id('sec-summary')
  if(data.summary){ summaryEl.textContent = data.summary; secSummary.style.display = '' }
  else { summaryEl.textContent = ''; secSummary.style.display = 'none' }

  // Skills as pills
  const skillsWrap = $id('pv-skills')
  const secSkills = $id('sec-skills')
  skillsWrap.innerHTML = ''
  if(data.skills.length){
    data.skills.forEach(s =>{
      const span = document.createElement('span')
      span.className = 'skill-pill'
      span.textContent = s
      skillsWrap.appendChild(span)
    })
    secSkills.style.display = ''
  } else { secSkills.style.display = 'none' }

  // Experience
  const expUl = $id('pv-experience')
  const secExp = $id('sec-experience')
  expUl.innerHTML = ''
  if(data.experience.length){
    data.experience.forEach(item =>{ const li = document.createElement('li'); li.textContent = item; expUl.appendChild(li) })
    secExp.style.display = ''
  } else { secExp.style.display = 'none' }

  // Education
  const eduUl = $id('pv-education')
  const secEdu = $id('sec-education')
  eduUl.innerHTML = ''
  if(data.education.length){ data.education.forEach(it => { const li = document.createElement('li'); li.textContent = it; eduUl.appendChild(li) }); secEdu.style.display = '' }
  else { secEdu.style.display = 'none' }

  // Projects
  const projUl = $id('pv-projects')
  const secProj = $id('sec-projects')
  projUl.innerHTML = ''
  if(data.projects.length){ data.projects.forEach(it => { const li = document.createElement('li'); li.textContent = it; projUl.appendChild(li) }); secProj.style.display = '' }
  else { secProj.style.display = 'none' }

  // Certifications
  const certUl = $id('pv-certifications')
  const secCert = $id('sec-certifications')
  certUl.innerHTML = ''
  if(data.certifications.length){ data.certifications.forEach(it => { const li = document.createElement('li'); li.textContent = it; certUl.appendChild(li) }); secCert.style.display = '' }
  else { secCert.style.display = 'none' }

  // Languages
  const langUl = $id('pv-languages')
  const secLang = $id('sec-languages')
  langUl.innerHTML = ''
  if(data.languages.length){ data.languages.forEach(it => { const li = document.createElement('li'); li.textContent = it; langUl.appendChild(li) }); secLang.style.display = '' }
  else { secLang.style.display = 'none' }

  // Awards
  const awardUl = $id('pv-awards')
  const secAward = $id('sec-awards')
  awardUl.innerHTML = ''
  if(data.awards.length){ data.awards.forEach(it => { const li = document.createElement('li'); li.textContent = it; awardUl.appendChild(li) }); secAward.style.display = '' }
  else { secAward.style.display = 'none' }
}

// --- Job suggestion engine ---
// Simple dataset of job roles and keywords/skills
const JOB_ROLES = [
  // ===== WEB & SOFTWARE =====
  { title: 'Frontend Developer', skills: ['html','css','javascript','react','vue','angular'], keywords: ['frontend','ui','ux','client'] },
  { title: 'Backend Developer', skills: ['node','express','python','django','java','golang','sql','postgres','mysql'], keywords: ['backend','server','api','microservice'] },
  { title: 'Fullstack Developer', skills: ['html','css','javascript','node','react','python'], keywords: ['fullstack','full stack','end-to-end'] },
  { title: 'Software Engineer', skills: ['java','python','c++','javascript','algorithms','system design'], keywords: ['software','engineer','development'] },
  { title: 'Software Engineer Intern', skills: ['java','python','c++','algorithms','data structures'], keywords: ['intern','internship','student'] },

  // ===== MOBILE =====
  { title: 'Mobile App Developer', skills: ['android','ios','react native','flutter','swift','kotlin'], keywords: ['mobile','android','ios','flutter','react native'] },

  // ===== UI / DESIGN =====
  { title: 'UI/UX Designer', skills: ['figma','adobe','sketch','ux','ui','design'], keywords: ['design','ui','ux','prototype'] },
  { title: 'Graphic Designer', skills: ['photoshop','illustrator','canva','branding','typography'], keywords: ['graphic','design','visual','branding'] },
  { title: 'Web Designer', skills: ['html','css','figma','responsive design'], keywords: ['web design','layout','ui'] },

  // ===== DATA & AI =====
  { title: 'Data Analyst', skills: ['sql','python','excel','r','pandas','tableau'], keywords: ['data','analysis','analytics','etl','report'] },
  { title: 'Data Scientist', skills: ['python','machine learning','statistics','tensorflow','pytorch'], keywords: ['data science','ml','ai','model'] },
  { title: 'Machine Learning Engineer', skills: ['python','tensorflow','pytorch','ml','data pipelines'], keywords: ['machine learning','ai','model'] },

  // ===== DEVOPS & CLOUD =====
  { title: 'DevOps Engineer', skills: ['docker','kubernetes','ci/cd','aws','azure'], keywords: ['devops','ci','cd','infrastructure'] },
  { title: 'Cloud Engineer', skills: ['aws','azure','gcp','terraform','linux'], keywords: ['cloud','infrastructure','deployment'] },

  // ===== IT & NETWORK =====
  { title: 'IT Support', skills: ['troubleshoot','windows','linux','network','helpdesk'], keywords: ['support','helpdesk','troubleshoot'] },
  { title: 'Network Administrator', skills: ['networking','cisco','firewall','tcp/ip','routing'], keywords: ['network','administrator','infrastructure'] },
  { title: 'System Administrator', skills: ['linux','windows server','bash','monitoring'], keywords: ['sysadmin','system','server'] },

  // ===== CYBERSECURITY =====
  { title: 'Cybersecurity Analyst', skills: ['security','network security','siem','risk assessment'], keywords: ['cybersecurity','security','threat'] },
  { title: 'Penetration Tester', skills: ['ethical hacking','kali linux','burp suite','metasploit'], keywords: ['pentest','hacking','security'] },

  // ===== BUSINESS & MANAGEMENT =====
  { title: 'Project Manager', skills: ['project management','agile','scrum','communication'], keywords: ['project','manager','timeline'] },
  { title: 'Business Analyst', skills: ['requirements','documentation','data analysis','excel'], keywords: ['business','analysis','process'] },
  { title: 'Product Manager', skills: ['roadmap','user stories','stakeholder management'], keywords: ['product','manager','strategy'] },

  // ===== MARKETING & CONTENT =====
  { title: 'Digital Marketing Specialist', skills: ['seo','social media','google ads','analytics'], keywords: ['marketing','digital','seo'] },
  { title: 'Content Writer', skills: ['writing','copywriting','seo','editing'], keywords: ['content','writer','blog'] },
  { title: 'Social Media Manager', skills: ['content planning','analytics','branding'], keywords: ['social media','marketing'] },

  // ===== QA & TESTING =====
  { title: 'QA Engineer', skills: ['testing','manual testing','automation','selenium'], keywords: ['qa','quality','testing'] },
  { title: 'Test Automation Engineer', skills: ['selenium','cypress','playwright','javascript'], keywords: ['automation','testing'] },

  // ===== ENTRY LEVEL / GENERAL =====
  { title: 'Junior Developer', skills: ['html','css','javascript','python'], keywords: ['junior','entry level','developer'] },
  { title: 'IT Intern', skills: ['computer basics','networking','troubleshooting'], keywords: ['intern','it','student'] },
  { title: 'Technical Support Engineer', skills: ['communication','troubleshooting','software support'], keywords: ['technical support','customer support'] }
]


// Lowercase helper
function lc(s){ return String(s||'').toLowerCase() }

// Build searchable text from resume data
function resumeText(data){
  return ([data.title, data.summary].concat(data.experience, data.education, data.projects, data.certifications)).join(' ').toLowerCase()
}

function suggestJobs(data){
  const text = resumeText(data)
  const skills = data.skills.map(s => lc(s))
  const results = []
  JOB_ROLES.forEach(job =>{
    const jobSkills = job.skills.map(lc)
    const matchedSkills = skills.filter(s => jobSkills.includes(s))
    // match keywords in free text
    const matchedKeywords = (job.keywords || []).filter(k => text.indexOf(lc(k)) !== -1)
    // match title words
    const matchedTitle = (job.title || '').split(/\s+/).map(lc).filter(t => text.indexOf(t)!==-1)
    const score = matchedSkills.length * 3 + matchedKeywords.length * 1 + matchedTitle.length * 2
    if(score>0){
      results.push({ job: job.title, score, matchedSkills, matchedKeywords, matchedTitle })
    }
  })
  results.sort((a,b)=>b.score-a.score)
  return results
}

function renderSuggestions(data){
  const list = $id('jobs-list')
  list.innerHTML = ''
  const suggestions = suggestJobs(data)
  if(!suggestions.length){
    list.innerHTML = '<p class="muted">No suggestions yet — add skills, title, or experience to get recommendations.</p>'
    return
  }
  suggestions.forEach(s =>{
    const item = document.createElement('div')
    item.className = 'job-item'
    const left = document.createElement('div')
    const title = document.createElement('div')
    title.className = 'job-title'
    title.textContent = s.job
    const reason = document.createElement('div')
    reason.className = 'job-reason'
    const parts = []
    if(s.matchedSkills.length) parts.push('Matched skills: ' + s.matchedSkills.join(', '))
    if(s.matchedKeywords.length) parts.push('Keywords: ' + s.matchedKeywords.join(', '))
    reason.textContent = parts.join(' • ')
    left.appendChild(title)
    left.appendChild(reason)

    const right = document.createElement('div')
    right.innerHTML = '<span class="muted">Score: ' + s.score + '</span>'

    const details = document.createElement('div')
    details.className = 'job-details'
    details.innerHTML = '<strong>Why:</strong> ' + (parts.length ? parts.join('; ') : 'Matches found')

    item.appendChild(left)
    item.appendChild(right)
    item.appendChild(details)

    // click toggles details and highlights matching skills in preview
    item.addEventListener('click', ()=>{
      const expanded = item.classList.toggle('expanded')
      // highlight skill pills that match
      const pills = Array.from(document.querySelectorAll('.skill-pill'))
      pills.forEach(p => p.classList.remove('highlight'))
      if(expanded && s.matchedSkills.length){
        pills.forEach(p => {
          if(s.matchedSkills.map(lc).includes(lc(p.textContent))){ p.classList.add('highlight') }
        })
      }
    })

    list.appendChild(item)
  })
}

// --- Button logic ---
function refreshButtons(data){
  const updateBtn = $id('update')
  const exportBtn = $id('export')
  const anyFilled = data.name || data.title || data.email || data.phone || data.summary || data.skills.length || data.experience.length
  updateBtn.disabled = !anyFilled
  exportBtn.disabled = !data.name
}

// Combined update: render preview + suggestions
function update(){
  const data = collectData()
  renderPreview(data)
  refreshButtons(data)
  renderSuggestions(data)
}

// Export: run update and open print dialog
function exportPDF(){
  update()
  // After collecting current resume content we open print — suggestions already updated
  window.print()
}

// --- Wire events ---
document.addEventListener('DOMContentLoaded', ()=>{
  const inputs = ['name','title','email','phone','summary','skills','experience','education','certifications','projects','languages','awards','citycountry']
  inputs.forEach(id =>{
    const el = $id(id)
    if(!el) return
    el.addEventListener('input', ()=>{
      if(el._deb) clearTimeout(el._deb)
      el._deb = setTimeout(()=>{ update() }, 180)
    })
  })

  $id('update').addEventListener('click', update)
  $id('export').addEventListener('click', exportPDF)

  // Profile image upload preview
  const profileInput = $id('profileImage')
  const pvPhoto = $id('pv-photo')
  if(profileInput && pvPhoto){
    profileInput.addEventListener('change', (e)=>{
      const file = e.target.files && e.target.files[0]
      if(!file) return
      const reader = new FileReader()
      reader.onload = function(ev){ pvPhoto.src = ev.target.result }
      reader.readAsDataURL(file)
    })
  }

  // Back button in the builder: go back if possible, otherwise open landing page
  const backBtn = $id('back-btn')
  if(backBtn){
    backBtn.addEventListener('click', ()=>{
      if(window.history.length > 1){ window.history.back() }
      else { window.location.href = 'landing/index.html' }
    })
  }

  // initial
  update()
})
