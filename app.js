const menuBtn=document.getElementById('menuBtn');const nav=document.getElementById('nav');menuBtn?.addEventListener('click',()=>nav.classList.toggle('open'));nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const fields=['name','phone','pickup','dropoff','date','time','passengers','details'];
function requestText(){const v=Object.fromEntries(fields.map(id=>[id,document.getElementById(id).value.trim()]));return `ExecDrive Ride Request
Name: ${v.name}
Phone: ${v.phone}
Pickup: ${v.pickup}
Drop-off: ${v.dropoff}
Date: ${v.date}
Time: ${v.time}
Passengers: ${v.passengers}
Details: ${v.details||'None'}`}
const form=document.getElementById('rideForm');form?.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const body=encodeURIComponent(requestText());window.location.href=`sms:+17204252202?&body=${body}`;document.getElementById('formNote').textContent='Your text message is ready to send to George at 720-425-2202.'});
document.getElementById('copyBtn')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(requestText());document.getElementById('formNote').textContent='Ride request copied. You can paste it into a text or email.'}catch{document.getElementById('formNote').textContent='Select and copy your ride details manually if your browser blocks clipboard access.'}});
let deferredPrompt;const installBtn=document.getElementById('installBtn');window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;installBtn.hidden=false});installBtn?.addEventListener('click',async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;installBtn.hidden=true});
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));}
