document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.getElementById("menu-toggle");
const primaryNavigation = document.getElementById("primary-navigation");

if (menuToggle && primaryNavigation) {
  const menuIcon = menuToggle.querySelector("span:first-child");
  const menuLabel = menuToggle.querySelector(".menu-label");

  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    primaryNavigation.classList.toggle("open", !expanded);
    menuLabel.textContent = expanded ? "Menu" : "Close";
    menuIcon.textContent = expanded ? "☰" : "×";
  });

  primaryNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      primaryNavigation.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuLabel.textContent = "Menu";
      menuIcon.textContent = "☰";
    });
  });
}

const messageField = document.getElementById("message");
const messageCount = document.getElementById("message-count");

if (messageField && messageCount) {
  function updateMessageCount() {
    messageCount.textContent = messageField.value.length + " / 2000";
  }

  messageField.addEventListener("input", updateMessageCount);
  updateMessageCount();
}

const serviceCarousel = document.getElementById("service-carousel");
const servicePrev = document.getElementById("service-prev");
const serviceNext = document.getElementById("service-next");

if (serviceCarousel && servicePrev && serviceNext) {
  function updateServiceControls() {
    const max = serviceCarousel.scrollWidth - serviceCarousel.clientWidth;
    servicePrev.disabled = serviceCarousel.scrollLeft <= 2;
    serviceNext.disabled = serviceCarousel.scrollLeft >= max - 2;
  }

  servicePrev.addEventListener("click", () => {
    serviceCarousel.scrollBy({ left: -serviceCarousel.clientWidth * 0.85, behavior: "smooth" });
  });
  serviceNext.addEventListener("click", () => {
    serviceCarousel.scrollBy({ left: serviceCarousel.clientWidth * 0.85, behavior: "smooth" });
  });
  serviceCarousel.addEventListener("scroll", updateServiceControls, { passive: true });
  window.addEventListener("resize", updateServiceControls);
  updateServiceControls();
}

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const serviceField = document.getElementById("service");
    if (serviceField) serviceField.value = link.dataset.service;
  });
});

const form = document.getElementById("enquiry-form");
const status = document.getElementById("status");
const submit = document.getElementById("submit-btn");

if (form && status && submit) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "Sending enquiry…";
    submit.disabled = true;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send enquiry.");

      status.textContent = "Enquiry sent successfully. The team will contact you.";
      form.reset();
      if (messageField && messageCount) messageCount.textContent = "0 / 2000";
    } catch (error) {
      status.textContent = (error instanceof Error ? error.message : "Unable to send enquiry.") + " ";
      const link = document.createElement("a");
      link.className = "btn green";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.href = "https://wa.me/919822791005?text=" + encodeURIComponent(
        "Pump service enquiry\nName: " + data.name +
        "\nPhone: " + data.phone +
        "\nService: " + data.service +
        "\nArea in Pune: " + (data.area || "Not provided") +
        "\nDetails: " + data.message
      );
      link.textContent = "Continue on WhatsApp";
      status.appendChild(link);
    } finally {
      submit.disabled = false;
    }
  });
}
