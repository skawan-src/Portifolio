var S = [
  ["Manutenção de computadores e notebooks", "hw", 90],
  ["Montagem e diagnóstico de falhas", "hw", 85],
  ["Impressoras, monitores e periféricos", "hw", 80],
  ["Reparo de aparelhos eletrônicos", "hw", 75],
  ["Redes de computadores", "rd", 75],
  ["CFTV IP e controle de acesso", "rd", 70],
  ["IoT (Internet das Coisas)", "rd", 60],
  ["Instalação e configuração de SO e Office", "sw", 85],
  ["Suporte remoto e presencial", "sw", 85],
  ["Linux básico", "sw", 45],
  ["Desenvolvimento de software (web)", "sw", 60],
  ["Automação de processos com apoio de IA", "sw", 60],
  ["Banco de dados (MySQL)", "db", 50],
  ["Inglês intermediário", "ot", 60],
  ["CNH categoria AB", "ot", 0],
];
var sk = document.getElementById("sk");
S.forEach(function (s) {
  var d = document.createElement("div");
  d.className = "card";
  d.dataset.c = s[1];
  d.innerHTML =
    "<b></b>" +
    (s[2] ? '<div class="bar"><i data-w="' + s[2] + '"></i></div>' : "");
  d.firstChild.textContent = s[0];
  sk.appendChild(d);
});
function bars() {
  document.querySelectorAll(".bar i").forEach(function (i) {
    i.style.width = i.dataset.w + "%";
  });
}
document.getElementById("chips").addEventListener("click", function (e) {
  var b = e.target.closest(".chip");
  if (!b) return;
  document.querySelectorAll(".chip").forEach(function (c) {
    c.classList.toggle("on", c === b);
  });
  document.querySelectorAll("#sk .card").forEach(function (c) {
    c.classList.toggle(
      "hide",
      b.dataset.f !== "all" && c.dataset.c !== b.dataset.f,
    );
  });
});
var io =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        function (es) {
          es.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              if (e.target.querySelector(".bar")) bars();
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 },
      )
    : null;
document.querySelectorAll(".rv").forEach(function (r) {
  if (io) io.observe(r);
  else {
    r.classList.add("in");
    bars();
  }
});
var r = document.documentElement;
try {
  var t = localStorage.getItem("tema");
  if (t) r.dataset.theme = t;
} catch (e) {}
document.getElementById("tg").addEventListener("click", function () {
  var dark = r.dataset.theme
    ? r.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme:dark)").matches;
  r.dataset.theme = dark ? "light" : "dark";
  try {
    localStorage.setItem("tema", r.dataset.theme);
  } catch (e) {}
});
