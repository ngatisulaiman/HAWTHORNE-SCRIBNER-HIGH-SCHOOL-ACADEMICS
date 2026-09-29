const search=document.getElementById('subjectSearch');const cards=[...document.querySelectorAll('.subject')];const chips=[...document.querySelectorAll('.chip')];function filterSubjects(){const term=(search?.value||'').toLowerCase().trim();const active=document.querySelector('.chip.active')?.dataset.filter||'all';cards.forEach(card=>{const matchText=card.dataset.name.includes(term);const matchCat=active==='all'||card.dataset.category===active;card.style.display=matchText&&matchCat?'block':'none'})}search?.addEventListener('input',filterSubjects);chips.forEach(c=>c.addEventListener('click',()=>{chips.forEach(x=>x.classList.remove('active'));c.classList.add('active');filterSubjects()}));document.querySelector('.menu-toggle')?.addEventListener('click',()=>{const n=document.querySelector('.nav');n.style.display=n.style.display==='flex'?'none':'flex';n.style.position='absolute';n.style.top='68px';n.style.left='0';n.style.right='0';n.style.padding='18px';n.style.background='#fff';n.style.flexDirection='column';n.style.borderBottom='1px solid #e8edf4'});const modal=document.getElementById('modal');const title=document.getElementById('modalTitle');const text=document.getElementById('modalText');function openModal(t,m){title.textContent=t;text.textContent=m;modal.classList.add('show')}document.getElementById('portalDemo')?.addEventListener('click',()=>openModal('Student Portal','Portal access is ready to connect to your school authentication and student database. The interface is prepared for results, announcements, resources and academic progress.'));document.getElementById('calendarBtn')?.addEventListener('click',()=>openModal('Academic Calendar','The calendar area is ready for term dates, examinations, holidays, parent meetings, academic events and revision periods.'));document.getElementById('closeModal')?.addEventListener('click',()=>modal.classList.remove('show'));document.getElementById('modalOk')?.addEventListener('click',()=>modal.classList.remove('show'));modal?.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('show')});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('.nav').removeAttribute('style')}));
const papersDemo=document.getElementById('papersDemo');const papersCard=document.getElementById('pastPapersCard');papersDemo?.addEventListener('click',()=>openModal('Past Papers','The Past Papers library is ready for subject-by-subject exam papers. Connect your PDF files or paper database here and students can access them from this page.'));papersCard?.addEventListener('click',()=>document.getElementById('past-papers')?.scrollIntoView({behavior:'smooth'}));

/* === Interaction upgrade === */
(() => {
  const header=document.querySelector('.header');
  const progress=document.createElement('div');
  progress.className='scroll-progress';
  document.body.appendChild(progress);

  const back=document.createElement('button');
  back.className='back-top';
  back.type='button';
  back.setAttribute('aria-label','Back to top');
  back.textContent='↑';
  document.body.appendChild(back);

  const sections=[...document.querySelectorAll('main section[id]')];
  const navLinks=[...document.querySelectorAll('.nav a[href^="#"]')];

  const updateScrollUI=()=>{
    const max=document.documentElement.scrollHeight-window.innerHeight;
    const pct=max>0?(window.scrollY/max)*100:0;
    progress.style.width=pct+'%';
    header?.classList.toggle('scrolled',window.scrollY>18);
    back.classList.toggle('show',window.scrollY>500);
  };
  window.addEventListener('scroll',updateScrollUI,{passive:true});
  updateScrollUI();

  back.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  const revealItems=[
    ...document.querySelectorAll('.section-head,.feature,.subject,.resource,.results-card,.portal-box,.contact-card,.papers-box,.stats-grid>div')
  ];
  revealItems.forEach((el,i)=>{
    el.classList.add('reveal');
    const type=i%3===0?'slide-left':i%3===1?'slide-up':'slide-right';
    el.classList.add(type);
    el.style.setProperty('--reveal-delay',Math.min((i%5)*70,280)+'ms');
  });
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12});
  revealItems.forEach(el=>observer.observe(el));

  const sectionObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      navLinks.forEach(link=>{
        link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id);
      });
    });
  },{rootMargin:'-35% 0px -55% 0px',threshold:0});
  sections.forEach(section=>sectionObserver.observe(section));

  const originalFilter=window.filterSubjects;
  if(search && cards.length){
    search.addEventListener('input',()=>{
      setTimeout(()=>{
        const visible=cards.filter(card=>card.style.display!=='none');
        document.querySelector('.empty-state')?.remove();
        if(!visible.length){
          const empty=document.createElement('div');
          empty.className='empty-state';
          empty.textContent='No subjects found. Try another search.';
          document.getElementById('subjectGrid')?.appendChild(empty);
        }
      },0);
    });
  }
})();
