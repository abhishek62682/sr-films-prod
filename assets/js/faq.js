function toggleFaq(item) {
  const isOpen = item.dataset.open === "true";

  document.querySelectorAll("[data-open='true']").forEach((el) => {
    el.dataset.open = "false";
    el.querySelector(".faq-answer").style.maxHeight = "0px";
    const icon = el.querySelector(".faq-icon");
    icon.style.transform   = "";
    icon.style.background  = "";
    icon.style.borderColor = "";
    icon.style.color       = "";
  });

  if (!isOpen) {
    item.dataset.open = "true";
    const answer = item.querySelector(".faq-answer");
    answer.style.maxHeight = answer.scrollHeight + "px";
    const icon = item.querySelector(".faq-icon");
    icon.style.transform   = "rotate(45deg)";
    icon.style.background  = "#ffe05c";
    icon.style.borderColor = "none";
    icon.style.color       = "#000";
  }
}