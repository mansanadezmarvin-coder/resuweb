// landing/script.js — small interactions for landing page
// - Smooth scroll for internal links
// - Scroll reveal for sections (simple)
// - Hook CTA to open the builder (opens root index.html)

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const target = this.getAttribute('href')
      if(!target || target === '#') return
      const el = document.querySelector(target)
      if(el){
        e.preventDefault()
        el.scrollIntoView({behavior:'smooth',block:'start'})
      }
    })
  })

  // Simple reveal on scroll
  const revealItems = document.querySelectorAll('.feature, .steps li, .benefits li')
  const io = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if(ent.isIntersecting){ ent.target.style.opacity = 1; ent.target.style.transform = 'translateY(0)'; io.unobserve(ent.target) }
    })
  }, {threshold: 0.12})
  revealItems.forEach(it => { it.style.opacity = 0; it.style.transform = 'translateY(8px)'; io.observe(it) })

  // Hook CTAs to open the resume builder (builder.html)
  const openBuilder = () => { window.location.href = 'builder.html' }
  document.getElementById('start-btn').addEventListener('click', openBuilder)
  document.getElementById('create-now').addEventListener('click', openBuilder)

  // No landing back button here — back button exists in the builder instead.
})
