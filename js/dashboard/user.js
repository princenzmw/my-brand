document.addEventListener('DOMContentLoaded', () => {

  fetch('https://prinko-backend.onrender.com/api/user/getAllUsers')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const usersList = document.getElementById('usersList');
      data.forEach(user => {
        const tr = document.createElement('tr');
        tr.id = `user-${user._id}`;
        tr.innerHTML = `
        <td>${user._id}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.username}</td>
        <td>${user.phone}</td>
        <td>${user.email}</td>
        <td><img src="https://prinko-backend.onrender.com/api${user.profilePic}" alt="Profile Pic" style="width: 50px; height: auto;"></td>
        <td>${user.role}</td>
        <td>${user.likedBlogs.length} blogs</td>
        <td>
          <button onclick="NotifyUser('${user._id}')">Notify</button>
          <button onclick="deleteUser('${user._id}')">Delete</button>
        </td>
      `;
        usersList.appendChild(tr);
      });
    })
    .catch(error => console.error('Fetch error:', error));
});

function NotifyUser(userId) {
  // Send a notification (message) to the user
  document.getElementById('editUserModal').style.display = 'block';
}

function deleteUser(userId) {
  const deleteUserModal = document.getElementById('deleteUserModal');
  deleteUserModal.setAttribute('data-userId', userId);

  deleteUserModal.style.display = 'block';
}

document.querySelectorAll('.modal .close').forEach(closeButton => {
  closeButton.addEventListener('click', () => {
    closeButton.closest('.modal').style.display = 'none';
  });
});

// Close the modal When the user clicks anywhere outside of it
window.addEventListener('click', (event) => {
  document.querySelectorAll('.modal').forEach(modal => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});

// Handle delete confirmation (Yes button)
document.getElementById('confirmDelete').addEventListener('click', () => {
  const userId = document.getElementById('deleteUserModal').getAttribute('data-userId');
  const API_URL = `https://prinko-backend.onrender.com/api/user/delete/${userId}`;
  const token = localStorage.getItem('token');

  fetch(API_URL, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      return response.json();
    })
    .then(() => {
      console.log('User deleted successfully');
      // Remove the user's row from the table
      document.getElementById(`user-${userId}`).remove();
      // Close the modal
      document.getElementById('deleteUserModal').style.display = 'none';
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

// Handle delete cancellation (No button)
document.getElementById('cancelDelete').addEventListener('click', () => {
  // Close the modal
  document.getElementById('deleteUserModal').style.display = 'none';
});


