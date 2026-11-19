document.addEventListener("DOMContentLoaded", () => {
  const htmlEl = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const themeText = document.getElementById("themeText");
  const sparklesBg = document.getElementById("sparklesBg");

  // 1. MODO CLARO / OSCURO (guarda preferencia en localStorage)
  const savedTheme = localStorage.getItem("sparkle-theme") || "light";
  applyTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const current = htmlEl.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem("sparkle-theme", next);
  });

  function applyTheme(theme) {
    htmlEl.setAttribute("data-theme", theme);
    if (theme === "dark") {
      themeIcon.textContent = "☀️";
      themeText.textContent = "Modo Oscuro";
    } else {
      themeIcon.textContent = "🌙";
      themeText.textContent = "Modo Claro";
    }
  }

  // 2. GENERAR BRILLITOS FLOTANTES DE FONDO
  const sparkleSymbols = ["✦", "✧", "⋆", "✨", "♡", "˚"];
  for (let i = 0; i < 36; i++) {
    const span = document.createElement("span");
    span.className = "bg-sparkle";
    span.textContent =
      sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
    span.style.left = `${Math.random() * 100}%`;
    span.style.top = `${Math.random() * 100}%`;
    span.style.fontSize = `${10 + Math.random() * 12}px`;
    span.style.setProperty("--duration", `${3.5 + Math.random() * 4.5}s`);
    span.style.setProperty("--delay", `${Math.random() * 4}s`);
    sparklesBg.appendChild(span);
  }

  // 3. RASTRO DE BRILLITOS AL MOVER EL MOUSE Y HACER CLIC
  let lastSparkleTime = 0;
  document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastSparkleTime < 65) return; // limita frecuencia para fluidez
    lastSparkleTime = now;
    spawnSparkle(e.clientX, e.clientY);
  });

  document.addEventListener("click", (e) => {
    for (let i = 0; i < 6; i++) {
      const offsetX = (Math.random() - 0.5) * 40;
      const offsetY = (Math.random() - 0.5) * 40;
      spawnSparkle(e.clientX + offsetX, e.clientY + offsetY);
    }
  });

  function spawnSparkle(x, y) {
    const spark = document.createElement("span");
    spark.className = "cursor-sparkle";
    spark.textContent =
      sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.color = Math.random() > 0.5 ? "#ff6b9d" : "#c77dff";
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 800);
  }

  // 4. MOSTRAR / OCULTAR CONTRASEÑA Y VALIDACIÓN DEL LOGIN
  const togglePass = document.getElementById("togglePass");
  const passwordInput = document.getElementById("password");
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const passError = document.getElementById("passError");
  const statusBanner = document.getElementById("statusBanner");

  togglePass.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    togglePass.textContent = isPassword ? "🙈" : "👁️";
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    emailError.textContent = "";
    passError.textContent = "";
    statusBanner.textContent = "";

    let valid = true;
    const emailVal = emailInput.value.trim();
    const passVal = passwordInput.value.trim();

    if (!emailVal || !emailVal.includes("@")) {
      emailError.textContent = "Ingresa un correo válido ✨";
      valid = false;
    }

    if (passVal.length < 6) {
      passError.textContent =
        "La contraseña debe tener al menos 6 caracteres 🔐";
      valid = false;
    }

    if (!valid) return;

    statusBanner.textContent = `💖 ¡Bienvenida, ${emailVal.split("@")[0]}! Sesión iniciada con éxito ✨`;
  });

  // 5. FUNCIONALIDADES DE SCROLL (Barra de progreso, Parallax y Reveal)
  const scrollProgress = document.getElementById("scrollProgress");
  const backToTop = document.getElementById("backToTop");
  const parallaxOrbs = document.querySelectorAll("[data-parallax]");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;

    // Mostrar botón volver arriba
    if (scrollTop > 260) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }

    // Efecto parallax suave en las esferas de fondo
    parallaxOrbs.forEach((orb) => {
      const speed = parseFloat(orb.dataset.parallax);
      orb.style.transform = `translateY(${scrollTop * speed}px)`;
    });
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Animación de aparición de tarjetas al hacer scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.15 },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // 6. GENERADOR DE FRASES CUTE
  const quotes = [
    '"Hoy es un gran día para programar cosas lindas."',
    '"Tu código brilla más cuando lo haces con estilo ✨"',
    '"Modo pastel activado: cero estrés, puro flow 💖"',
    '"Cada commit te acerca más a tu próximo gran proyecto 🎀"',
    '"De día pastel kawaii, de noche cyber-berry neón 🌙"',
  ];
  const vibeQuote = document.getElementById("vibeQuote");
  const newVibeBtn = document.getElementById("newVibeBtn");

  newVibeBtn.addEventListener("click", () => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    vibeQuote.textContent = random;
  });
});
