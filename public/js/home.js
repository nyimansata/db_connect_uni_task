document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  const res = await fetch("/api/v1/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    alert("Appointment submitted successfully!");
    location.reload();
  } else {
    alert("Error submitting appointment.");
  }
});

// DELETE USER
function deleteUser(id) {
  fetch(`/api/v1/users/${id}`, {
    method: "DELETE",
  })
    .then(() => location.reload())
    .catch((err) => console.error(err));
}

// EDIT USER (simple prompt version)
function editUser(id) {
  const name = prompt("Enter new name:");
  const lastName = prompt("Enter new last name:");
  const email = prompt("Enter new email:");
  const message = prompt("Enter new message:");

  fetch(`/api/v1/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, lastName, email, message }),
  })
    .then(() => location.reload())
    .catch((err) => console.error(err));
}
