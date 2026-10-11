document.getElementById("year").textContent=new Date().getFullYear();
const menuToggle=document.getElementById("menu-toggle"),primaryNavigation=document.getElementById("primary-navigation");
menuToggle.addEventListener("click",()=>{const expanded=menuToggle.getAttribute("aria-expanded")==="true";menuToggle.setAttribute("aria-expanded",String(!expanded));primaryNavigation.classList.toggle("open",!expanded);menuToggle.querySelector(".menu-label").textContent=expanded?"Menu":"Close";menuToggle.querySelector(".menu-icon").textContent=expanded?"☰":"×"});
primaryNavigation.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{primaryNavigation.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");menuToggle.querySelector(".menu-label").textContent="Menu";menuToggle.querySelector(".menu-icon").textContent="☰"}));
const messageField=document.getElementById("message"),messageCount=document.getElementById("message-count");
function updateMessageCount(){messageCount.textContent=messageField.value.length+" / 2000"}
messageField.addEventListener("input",updateMessageCount);updateMessageCount();
const serviceCarousel=document.getElementById("service-carousel"),servicePrev=document.getElementById("service-prev"),serviceNext=document.getElementById("service-next");
function updateServiceControls(){if(!serviceCarousel)return;const max=serviceCarousel.scrollWidth-serviceCarousel.clientWidth;servicePrev.disabled=serviceCarousel.scrollLeft<=2;serviceNext.disabled=serviceCarousel.scrollLeft>=max-2}
servicePrev.addEventListener("click",()=>serviceCarousel.scrollBy({left:-serviceCarousel.clientWidth*.85,behavior:"smooth"}));
serviceNext.addEventListener("click",()=>serviceCarousel.scrollBy({left:serviceCarousel.clientWidth*.85,behavior:"smooth"}));
serviceCarousel.addEventListener("scroll",updateServiceControls,{passive:true});
window.addEventListener("resize",updateServiceControls);
updateServiceControls();
document.querySelectorAll("[data-service]").forEach(a=>a.addEventListener("click",()=>{document.getElementById("service").value=a.dataset.service;}));
const form=document.getElementById("enquiry-form"),status=document.getElementById("status"),submit=document.getElementById("submit-btn");
status.setAttribute("aria-live","polite");
form.addEventListener("submit",async e=>{e.preventDefault();status.textContent="Sending enquiry…";submit.disabled=true;const d=Object.fromEntries(new FormData(form).entries());try{const r=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)});const j=await r.json();if(!r.ok)throw new Error(j.error||"Unable to send enquiry.");status.textContent="Enquiry sent successfully. The team will contact you.";form.reset()}catch(err){status.textContent=err.message+" ";const a=document.createElement("a");a.className="btn green";a.target="_blank";a.rel="noopener noreferrer";a.href="https://wa.me/919822791005?text="+encodeURIComponent("Pump service enquiry\nName: "+d.name+"\nPhone: "+d.phone+"\nService: "+d.service+"\nArea in Pune: "+(d.area||"Not provided")+"\nDetails: "+d.message);a.textContent="Continue on WhatsApp";status.appendChild(a)}finally{submit.disabled=false}});
