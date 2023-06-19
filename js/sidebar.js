window.onload = toLogin();

function toLogin() {
  if (localStorage.getItem("token") === null) {
      window.location.href = "login.html";
  }
}

fetch('sidebar.html')
.then(response => response.text())
.then(html => {
  // Inject the sidebar HTML into the sidebar container
  const sidebarContainer = document.getElementById('sidebarContainer');
  sidebarContainer.innerHTML = html;
})
.catch(error => {
  console.error('Error loading sidebar:', error);
});

function logout() {
  localStorage.clear()
}
