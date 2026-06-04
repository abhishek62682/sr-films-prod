const SERVICES = [
  { label: "Residential interior design", icon: "ri-home-4-line" },
  { label: "Modular kitchen design",       icon: "ri-knife-line" },
  { label: "Living room design",           icon: "ri-sofa-line" },
  { label: "Bedroom renovation",           icon: "ri-hotel-bed-line" },
  { label: "Bathroom renovation",          icon: "ri-drop-line" },
  { label: "Lighting & ceiling design",    icon: "ri-lightbulb-line" },
  { label: "Custom furniture & cabinetry", icon: "ri-layout-line" },
  { label: "Complete turnkey project",     icon: "ri-building-2-line" },
];

const selected = new Set();

function buildList() {
  const list = document.getElementById("combo-list");
  list.innerHTML = "";
  SERVICES.forEach(s => {
    const li = document.createElement("li");
    if (selected.has(s.label)) li.classList.add("sel");
    li.innerHTML = `<i class="${s.icon} opt-icon"></i><span>${s.label}</span><i class="ri-check-line chk"></i>`;
    li.onclick = (e) => {
      e.stopPropagation();
      toggleService(s.label);
    };
    list.appendChild(li);
  });
}

function toggleService(label) {
  if (selected.has(label)) selected.delete(label);
  else selected.add(label);
  buildList();
  renderTrigger();
}

function renderTrigger() {
  const tc  = document.getElementById("trigger-content");
  const arr = [...selected];
  if (!arr.length) {
    tc.innerHTML = '<span id="trigger-placeholder" style="font-size:14px;color:#b0a9a1;white-space:nowrap;">Select services...</span>';
    return;
  }
  tc.innerHTML =
    arr.slice(0, 2).map(s => `<span class="t-pill">${s}</span>`).join("") +
    (arr.length > 2 ? `<span class="t-more">+${arr.length - 2}</span>` : "");
}

function toggleCombo() {
  const panel   = document.getElementById("combo-panel");
  const chev    = document.getElementById("combo-chev");
  const trigger = document.getElementById("combo-trigger");
  const open    = panel.classList.contains("hidden");
  panel.classList.toggle("hidden", !open);
  chev.style.transform      = open ? "rotate(180deg)" : "";
  trigger.style.borderColor = open ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.1)";
}

document.addEventListener("click", e => {
  if (!document.getElementById("combo-wrap").contains(e.target)) {
    document.getElementById("combo-panel").classList.add("hidden");
    document.getElementById("combo-chev").style.transform = "";
    document.getElementById("combo-trigger").style.borderColor = "rgba(0,0,0,0.1)";
  }
});

function sendToWhatsApp() {
  const nameEl    = document.getElementById("name-input");
  const emailEl   = document.getElementById("email-input");
  const messageEl = document.getElementById("message-input");

  const name     = nameEl.value.trim();
  const email    = emailEl.value.trim();
  const message  = messageEl.value.trim();
  const services = selected.size ? [...selected].join(", ") : "Not specified";

  if (!name || !message) {
    alert("Please fill in your name and message.");
    return;
  }

  const text = `Hi Space4You! \n\nName: ${name}\nEmail: ${email}\n\nServices:\n${services}\n\nMessage:\n${message}`;
  window.open(`https://wa.me/918850886835?text=${encodeURIComponent(text)}`, "_blank");

  // clear inputs
  nameEl.value    = "";
  emailEl.value   = "";
  messageEl.value = "";

  // reset services
  selected.clear();
  buildList();
  renderTrigger();
}

buildList();