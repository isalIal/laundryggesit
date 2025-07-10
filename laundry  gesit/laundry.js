document.addEventListener("DOMContentLoaded", function () {
  // Order Now
  const orderButton = document.getElementById("orderBtn");
  if (orderButton) {
    orderButton.addEventListener("click", function () {
      window.location.href = "order.html";
    });
  }

  // Navigasi Footer
  function showPage(pageId) {
    ["homePage", "accountPage", "adminPage"].forEach((id) =>
      document.getElementById(id).classList.add("hidden")
    );
    document.getElementById(pageId).classList.remove("hidden");
  }

  document.getElementById("navHome").addEventListener("click", function (e) {
    e.preventDefault();
    showPage("homePage");
  });

  document.getElementById("navAccount").addEventListener("click", function (e) {
    e.preventDefault();
    showPage("accountPage");
  });

  document
    .getElementById("accountForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      showPage("homePage");
    });

  // Highlight Navigasi Aktif
  const navLinks = document.querySelectorAll("footer a");
  const currentFile = window.location.pathname.split("/").pop();
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentFile || (href === "index.html" && currentFile === "")) {
      link.classList.add("text-white");
    } else {
      link.classList.remove("text-white");
    }
  });

  // Tombol Admin ⚙️
  const adminBtn = document.getElementById("adminToggle");
  const modal = document.getElementById("adminLoginModal");
  const loginForm = document.getElementById("adminLoginForm");
  const cancelBtn = document.getElementById("cancelAdminLogin");

  adminBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    if (isLoggedIn) {
      showPage("adminPage");
    } else {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }
  });

  cancelBtn.addEventListener("click", function () {
    modal.classList.add("hidden");
  });

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    localStorage.setItem("isAdminLoggedIn", "true");
    modal.classList.add("hidden");
    showPage("adminPage");
  });

  // Logout Admin
  window.logoutAdmin = function () {
    localStorage.removeItem("isAdminLoggedIn");
    showPage("homePage");
  };

  // Kirim pesan dari Admin
  window.sendAdminMessage = function () {
    const input = document.getElementById("adminChatInput");
    if (input.value.trim()) {
      const chatDiv = document.createElement("div");
      chatDiv.className = "flex justify-end";
      chatDiv.innerHTML = `
        <div class="message-admin px-4 py-2 max-w-xs">
          <p>${input.value}</p>
          <p class="text-xs text-[#a5c8ff] text-right mt-1">${new Date().toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
          )}</p>
        </div>`;
      const chatBox = document.getElementById("adminChatMessages");
      chatBox.appendChild(chatDiv);
      input.value = "";
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  };

  // Kode Promo
  const discountCards = document.querySelectorAll(".discount-code");
  discountCards.forEach((card) => {
    card.addEventListener("click", function () {
      const code = this.getAttribute("data-code");
      if (code) {
        navigator.clipboard.writeText(code).then(() => {
          alert(`Kode promo "${code}" disalin ke clipboard!`);
        });
      }
    });
  });

  // Search toggle
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  searchBtn.addEventListener("click", () => {
    searchInput.classList.toggle("hidden");
    searchInput.focus();
  });
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchInput.classList.add("hidden");
    }
  });

  // Chat Pelanggan 💬
  const chatToggle = document.getElementById("chatToggle");
  const customerBox = document.getElementById("customerChatBox");
  if (chatToggle && customerBox) {
    chatToggle.addEventListener("click", function () {
      customerBox.classList.toggle("hidden");
    });
  }

  window.sendCustomerMessage = function () {
    const input = document.getElementById("customerChatInput");
    const message = input.value.trim();
    if (!message) return;

    const messageDiv = document.createElement("div");
    messageDiv.className =
      "bg-[#dbeafe] p-2 rounded-lg self-end text-sm text-right max-w-[75%]";
    messageDiv.innerText = message;

    const chatBox = document.getElementById("customerChatMessages");
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    input.value = "";

    // Simulasi balasan
    setTimeout(() => {
      const reply = document.createElement("div");
      reply.className =
        "bg-[#e0e7ff] p-2 rounded-lg self-start text-sm max-w-[75%]";
      reply.innerText = "Terima kasih! Kami akan segera merespon 😊";

      chatBox.appendChild(reply);
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
  };
});
