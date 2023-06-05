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