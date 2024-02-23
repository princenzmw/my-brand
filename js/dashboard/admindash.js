let myBlogsData = [];
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('blogs')) {
        myBlogsData = JSON.parse(localStorage.getItem('blogs'));
    }
    displayBlogs();
})

/********* The end of the Navbar functionality ********************/

// Get the navbar and toggle button elements
const navbar = document.getElementById('dashboard_navbar');
const toggleBtn = document.getElementById('toggleNav');
const navLinks = document.querySelectorAll('.dash_nav_links');

// Add click event listener to the toggle button
toggleBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // Stop the click event from propagating to the document
    navbar.classList.toggle('show_nav');
});

// Add click event listener to the links in the navbar to highlight selected link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(otherLink => {
            otherLink.classList.remove('side_selected');
        })
        link.classList.add('side_selected');
    })
});

// Add scroll event listener to close the navbar when user scrolls
document.addEventListener('scroll', () => {
    navbar.classList.remove('show_nav');
});
// Add click event listener to close the navbar when user clicks outside of it
document.addEventListener('click', function (event) {
    if (!navbar.contains(event.target) && event.target !== toggleBtn) {
        navbar.classList.remove('show_nav');
    }
});
/********* The end of the Navbar functionality ********************/

// Adding links

// Get the navbar and toggle button elements
const blogLink = document.getElementById('dsh_blg');
const projectLink = document.getElementById('dsh_prj');
const portfolioLink = document.getElementById('dsh_port');
const usersLink = document.getElementById('dsh_usrs');
const messagesLink = document.getElementById('dsh_posts');
const commentsLink = document.getElementById('dsh_comts');
const logoutLink = document.getElementById('dsh_lgt');

const blogsContainerDiv = document.getElementById('returnContainer');
const usersContainerDiv = document.getElementById('usersContainer');
const portfoliosContainerDiv = document.getElementById('portfolioContainer');
const projectsContainerDiv = document.getElementById('projectContainer');
const messageContainer = document.getElementById('messageContainer');
const commentsContainerDiv = document.getElementById('commentContainer');

blogLink.addEventListener('click', () => {
    usersContainerDiv.style.display = 'none';
    messageContainer.style.display = 'none';
    blogsContainerDiv.style.display = 'block';
})

usersLink.addEventListener('click', () => {
    blogsContainerDiv.style.display = 'none';
    messageContainer.style.display = 'none';
    usersContainerDiv.style.display = 'block';
})


/********* The end of the Navbar functionality ********************/

/**
 * Other functionalities to widen sidebar or make it small
 */
const navBigger = document.querySelector('.tog_off');
const navSmaller = document.querySelector('.tog_on');
const imgContainer = document.querySelector('.dash_profile');
const mainElement = document.querySelector('main');
const linksWord = document.querySelectorAll('.linkToShow');

navSmaller.addEventListener('click', () => {
    navbar.classList.add('small');
    imgContainer.classList.add('small');
    linksWord.forEach(link => {
        link.classList.add('small');
    })
    mainElement.classList.add('small');
    navSmaller.style.display = 'none';
    navBigger.style.display = 'block';
})
navBigger.addEventListener('click', () => {
    navbar.classList.remove('small');
    imgContainer.classList.remove('small');
    linksWord.forEach(link => {
        link.classList.remove('small');
    })
    mainElement.classList.remove('small');
    navBigger.style.display = 'none';
    navSmaller.style.display = 'block';
})
/**
 * Functions for dark and light mode
 */
const darkMode = document.querySelector('.dark_thm');
const lightMode = document.querySelector('.light_thm');

darkMode.addEventListener('click', () => {
    document.body.style.backgroundColor = '#000000';
    document.body.style.color = '#ffffff';
    darkMode.style.display = 'none';
    lightMode.style.display = 'block';
})
lightMode.addEventListener('click', () => {
    document.body.style.backgroundColor = '#e4dede';
    document.body.style.color = '#000000';
    lightMode.style.display = 'none';
    darkMode.style.display = 'block';
})

/**
 * Functions to add a blog
 */
const blogadder = document.getElementById('blogadder');
const addingBlogDiv = document.querySelector('.addingBlog');
const formClose = document.getElementById('formClose');
blogadder.addEventListener('click', () => {
    addingBlogDiv.style.display = 'block';
})
formClose.addEventListener('click', () => {
    addingBlogDiv.style.display = 'none';
})
// Array to store the blogs

// get the blog
document.getElementById('new_blog_div').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Values from the form inputs
    const newImage = document.getElementById('new_blog_image').files[0];
    const newBlogTitle = document.getElementById('new_blog_ttle').value;
    const newDescription = document.getElementById('new_blog_bdy').value;
    const blogDate = new Date().toISOString().split('T')[0];

    // Check if an image is selected
    if (!newImage) {
        console.error('No image selected.');
        return;
    }

    try {
        // Read the image file as a data URL
        const imageSrc = await readImageAsDataURL(newImage);

        // Blog data to be rendered
        const blog = {
            id: Date.now(),
            photo: imageSrc,
            title: newBlogTitle,
            description: newDescription,
            date: blogDate
        };

        // Call the function for adding blogs
        addBlog(blog);
        addingBlogDiv.style.display = 'none';
    } catch (error) {
        console.error('Error reading image:', error);
    }
});

// Function to read the image file as a data URL
function readImageAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}


const addBlog = (blog) => {
    // add the blog to the blogsdata array
    myBlogsData.push(blog);
    // Store blogsdata in the Local Storage
    localStorage.setItem('blogs', JSON.stringify(myBlogsData));
    displayBlogs();
}

// Function to display the blogs on the webpage
const displayBlogs = () => {
    const blogList = document.querySelector('.available_blog');
    blogList.innerHTML = ''; // Clear previous content

    if (myBlogsData.length === 0) {
        blogList.innerHTML = `<h2>There is no blog yet!</h2>`;
        return;
    }

    myBlogsData.forEach((blog) => {
        const availableBlogElement = document.createElement('div');
        availableBlogElement.classList.add('av_blog_div');
        availableBlogElement.innerHTML = `
            <div class="av_blog_image">
                <img src="${blog.photo}" alt="blog number">
            </div>
            <h3 class="av_blog_title">${blog.title}</h3>
            <p class="av_blog_body">${blog.description}</p>
            <div class="av_blog_foot">
                <p class="av_blog_date">${blog.date}</p>
                <div class="av_blog_actions">
                    <b class="blog_view" onclick="openFullBlogView()"><i class="fa-solid fa-eye"></i></b>
                    <b class="blog_edt" onclick="openBlogEditForm()"><i class="fa-solid fa-pen-to-square"></i></b>
                    <b class="blog_del" onclick="openDeleteMessage(${blog.id})"><i class="fa-solid fa-trash"></i></b>
                </div>
            </div>
        `;
        blogList.appendChild(availableBlogElement);
    });
};

/**
 * Functions for deleting the blog
 */
const openDeleteMessage = (x) => {
    const modal = document.getElementById('av_blog_delete_msg');
    modal.style.display = 'block';
    const confirmBtn = document.getElementById('av_blg_del_confirmBtn');
    const cancelBtn = document.getElementById('av_blg_del_cancelBtn');

    confirmBtn.addEventListener('click', () => {
        deleteBlog(x);
        modal.style.display = 'none';
    });

    cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
};
const deleteBlog = (id) => {
    // functionalities of deleting a bookmark
    myBlogsData = myBlogsData.filter((blog) => {
        return blog.id !== id;
    });

    localStorage.setItem('blogs', JSON.stringify(myBlogsData));
    displayBlogs();
};

// Function to Logout the Admin
logoutLink.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/index.html';
});

/**
 * Get the user's messages
 */

let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];

function displayMessages(messages) {
    const addedmessages = document.getElementById('addedmessages');
    addedmessages.innerHTML = '';

    // Reverse the messages array to display the latest messages first
    messages.reverse();

    messages.forEach((message, index) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');

        const messageHTML = `
            <div class="msg_head_div">
                <div class="contact__pic">
                    <img src="../../images/ProfileIcon.webp" alt="Contact avatar">
                </div>
                <div class="contact_nm_mail">
                    <h4>Name: ${message.name}</h4>
                    <h6>Email: ${message.email}</h6>
                </div>
            </div>
            <div>
                <p>Title: ${message.title}</p>
                <p>Body: <br> <em>${message.body}</em></p>
                <div class="cont_msg_btns" style="display: flex; gap: 10px;">
                    <p class="msg__date">Date: ${message.sentAt}</p>
                    <button style="background-color: #1a551a;"">View</button>
                    <button>Reply</button>
                    <button style="background-color: #ff0000;" onclick="deleteMessage(${index})">Delete</button>
                </div>
            </div>
        `;

        messageDiv.innerHTML = messageHTML;

        addedmessages.appendChild(messageDiv);
    });
}

function deleteMessage(index) {
    messages.splice(index, 1);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    displayMessages(messages);
}

/**
 * Show the messages in the dashboard
 */
messagesLink.addEventListener('click', () => {
    displayMessages(messages);
    usersContainerDiv.style.display = 'none';
    blogsContainerDiv.style.display = 'none';
    messageContainer.style.display = 'block';
})
