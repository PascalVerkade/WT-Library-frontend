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
    showAdmin()
  })
  .catch(error => {
    console.error('Error loading sidebar:', error);
  });

function showAdmin() {
  const adminTabs = document.getElementsByClassName("admin");
  // Iterate over the admin class and show them if the user is an admin
  if (localStorage.getItem("admin")) {
    for (let i = 0; i < adminTabs.length; i++) {
      adminTabs[i].style.visibility = "visible";
    }
  }
}

function logout() {
  localStorage.clear()
}
