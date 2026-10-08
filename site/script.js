const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const placeholder = value => !value || /^\[.*\]$/.test(value);
function safeUrl(value) {
  if (placeholder(value)) return null;
  try { const url = new URL(value, location.href); return ["http:", "https:"].includes(url.protocol) ? url.href : null; }
  catch { return null; }
}
function node(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
function action(label, value, cls) {
  const a = node("a", cls, label); const url = safeUrl(value);
  if (url) { a.href = url; a.target = "_blank"; a.rel = "noreferrer"; }
  else { a.href = "#"; a.classList.add("is-placeholder"); a.textContent = `${label} ${value || "[ADD LINK]"}`; a.setAttribute("aria-label", `${label}: ${value || "[ADD LINK]"}`); a.addEventListener("click", e => e.preventDefault()); }
  return a;
}
function render(data) {
  document.title = `${data.name} — ${data.role}`;
  $$('[data-content]').forEach(n => { n.textContent = data[n.dataset.content] || ""; });
  $$('[data-link="resume"]').forEach(a => {
    const url = safeUrl(data.resume);
    if (url) { a.href = url; if (a.hasAttribute("download")) a.download = "Toyeeb-AbdAzeez-CV"; }
    else { a.href = "#"; a.classList.add("is-placeholder"); a.textContent += ` ${data.resume}`; a.setAttribute("aria-label", `CV link: ${data.resume}`); a.addEventListener("click", e => e.preventDefault()); }
  });
  ["linkedin", "github", "kaggle"].forEach(key => $$(`[data-link="${key}"]`).forEach(a => {
    const url = safeUrl(data[key]);
    if (url) { a.href = url; a.target = "_blank"; a.rel = "noreferrer"; }
    else { a.href = "#"; a.classList.add("is-placeholder"); a.textContent = `${key[0].toUpperCase()}${key.slice(1)} ${data[key] || "[ADD LINK]"} ↗`; a.setAttribute("aria-label", `${key} link: ${data[key] || "[ADD LINK]"}`); a.addEventListener("click", e => e.preventDefault()); }
  }));
  if (safeUrl(data.photo)) { const img = node("img", "", ""); img.src = safeUrl(data.photo); img.alt = "Portrait of Toyeeb A. Abd’Azeez"; $("#portrait").replaceChildren(img); }

  data.skills.forEach(group => {
    const article = node("article", "skill-card"); article.append(node("h3", "", group.group));
    const list = node("ul", ""); group.items.forEach(item => list.append(node("li", "", item)));
    article.append(list); $("#skills-grid").append(article);
  });
  data.projects.forEach(project => {
    const article = node("article", "project-card");
    const header = node("div", "project-card-heading"); header.append(node("span", "project-number", project.number), node("span", "project-type", project.type));
    article.append(header, node("h3", "", project.title), node("p", "project-idea", project.idea));
    const tools = node("div", "tool-list"); project.tools.forEach(tool => tools.append(node("span", "", tool))); article.append(tools);
    const result = node("p", "project-result"); result.append(node("strong", "", "End result"), document.createTextNode(project.result)); article.append(result);
    const links = node("div", "project-links"); links.append(action("GitHub Repository ↗", project.github, "text-link"), action("Live Demo ↗", project.demo, "text-link")); article.append(links);
    article.addEventListener("click", event => { if (event.target.closest("a")) return; openProject(project); });
    article.addEventListener("keydown", event => { if (event.key === "Enter") openProject(project); }); article.tabIndex = 0; article.setAttribute("role", "button"); article.setAttribute("aria-label", `View details for ${project.title}`);
    $("#project-list").append(article);
  });
}
function openProject(project) {
  const box = $("#dialog-content"); box.replaceChildren();
  box.append(node("span", "section-no", project.number), node("h2", "", project.title), node("p", "project-type", project.type));
  [["Project Idea", project.idea], ["Approach", project.approach], ["Tools", project.tools.join(" · ")], ["End Result", project.result]].forEach(([heading, text]) => { const section = node("section", "detail-section"); section.append(node("h3", "", heading), node("p", "", text)); box.append(section); });
  const links = node("div", "project-links detail-links"); links.append(action("GitHub Repository ↗", project.github, "button button-primary"), action("Live Demo ↗", project.demo, "button button-outline")); box.append(links);
  $("#project-dialog").showModal();
}
fetch("/content.json").then(r => { if (!r.ok) throw new Error("Profile content could not be loaded."); return r.json(); }).then(render).catch(console.error);
$("#year").textContent = new Date().getFullYear();
const menuButton = $(".menu-toggle"), nav = $(".navigation");
menuButton.addEventListener("click", () => { const open = menuButton.getAttribute("aria-expanded") === "true"; menuButton.setAttribute("aria-expanded", String(!open)); menuButton.setAttribute("aria-label", open ? "Open navigation" : "Close navigation"); nav.classList.toggle("is-open", !open); });
nav.addEventListener("click", e => { if (e.target.closest("a")) { menuButton.setAttribute("aria-expanded", "false"); nav.classList.remove("is-open"); } });
$(".dialog-close").addEventListener("click", () => $("#project-dialog").close());
$("#project-dialog").addEventListener("click", e => { if (e.target === e.currentTarget) e.currentTarget.close(); });
