const postsData = [
  {
    id: 1,
    title: "All about me",
    date: "May 13, 2025",
    category: ["Tech","All"],
    content:
      "Hi! My name is Ryan Jay C. Leoligao. I was born on July 27, 1997, in Quezon City, Philippines. My parents are Jolita C. Leoligao and Romualdo E. Leoligao. Why is my first name, Ryan Jay? My mom said that the first letters in their names were R from Romualdo and J from Jolita, but mom also thought of what to name me.",
  },
  {
    id: 2,
    title: "How did I become a web developer?",
    date: "May 13, 2025",
    category: ["Life","All"],
    content:
      "In July 2021, I was hired as a web developer by a private company due to my interest in programming. Initially unsure of programming, I found it fascinating and began studying it. Influenced by my brother-in-law, I gradually became interested in its operations.",
  },
  {
    id: 3,
    title: "Why am I still studying?",
    date: "May 13, 2025",
    category: ["Travel","All"],
    content:
      "In 2022, I continued my studies through ALS and graduated from Mary Queen College of Quezon City, pursuing an IT degree to prepare the country for innovation and change. I chose success over judgment",
  },
  {
    id: 4,
    title: "What is my most favorite quote?",
    date: "May 13, 2025",
    category: ["Tech","All"],
    content:
      "My favorite quote is from Seeca who says (We are more often frightened than hurt; and we suffer more from imagination than from reality.) Meaning, we spend so much time worried about how bad things are going to be, that we actually torture ourselves more than the thing we're worried about ever could",
  },
  {
    id: 5,
    title: "Why am I seated in a wheelchair?",
    date: "March 13, 2025",
    category: ["Life","All"],
    content:
      "In 2014, I had a stroke and was in a coma for 7 days. My mom thought it was the end of me, but because of her faith in God, God gave me a second life, so I'm still grateful. My mother, elder brother, and youngest brother took care of me until I got out of the hospital. They said I needed to undergo physical therapy to get back to my previous condition, but because we were short on money, we put it aside for now.",
  },
  {
    id: 6,
    title: "Looking back on my life",
    date: "May 13, 2025",
    category: ["Science","All"],
    content:
      "Looking back on my life, maybe I became stronger and more productive because if I had stayed in my comfort zone, then I would have thought that my life would be worthless now, and I would have just accepted every test that came into my life. I hope there are blessings to come, and my only goal is to finish my studies so that I can be rewarded for the hardships of my older brother and mother.",
  },
   {
    id: 7,
    title: "Best in Computer Programming 1",
    date: "May 13, 2025",
    category: "Tutorial",
    content:
      "This is my award for Best in Computer Programming 1 <img src='images/ryan1.jpg' width='100%'/>",
  },
  {
    id: 8,
    title: "Best in Computer Programming 2",
    date: "May 13, 2025",
    category: "Tutorial",
    content:
      "This is my second award for Best in Computer Programming 2.  <img src='images/ryan2.jpg' width='100%'/>",
    },
    {
    id: 9,
    title: "Certificate of Participation",
    date: "May 13, 2025",
    category: "Tutorial",
    content:
      " This is my certificate for attending the Webinar on April 15, 2025. <img src='images/ryan3.jpg' width='100%'/>",
    },
    {
    id: 10,
    title: "Certificate of Completion",
    date: "May 13, 2025",
    category: "Tutorial",
    content:
      "And this is how I finished my work immersion in Grade 12.  <img src='images/ryan6.jpg' width='100%'/>",
},
{
    id: 11,
    title: "Certificate of Participation",
    date: "May 13, 2025",
    category: "Tutorial",
    content:
      "The final instance occurred when I enrolled in a boot camp focused on Web Development.  <img src='images/ryan5.jpg' width='100%'/>",
}
];


const postsContainer = document.getElementById("posts");
const navLinks = document.querySelectorAll("nav a");
const modal = document.getElementById("postModal");
const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalContent = document.getElementById("modalContent");
const closeBtn = modal.querySelector(".close-btn");

function createPostCard(post) {
  const card = document.createElement("article");
  card.className = "card";
  card.tabIndex = 0;
  card.setAttribute("data-category", post.category);
  card.innerHTML = `
    <h4>${post.title}</h4>
    <div class="date">${post.date}</div>
    <p>${post.content.substring(0, 120)}...</p>
  `;
  card.addEventListener("click", () => openModal(post));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(post);
    }
  });
  return card;
}

function renderPosts(category = "all") {
  postsContainer.innerHTML = "";

  const filteredPosts = postsData.filter(post => {
    // Exclude the post with id = 1
    if (post.id === 1) return false;

    // Normalize to array if needed
    const postCategories = Array.isArray(post.category)
      ? post.category
      : [post.category];

    // If category is "all", only show posts that have "All" in their categories
    if (category === "all") {
      return postCategories.includes("All");
    }

    // Otherwise, show posts that match the selected category
    return postCategories.includes(category);
  });

  if (filteredPosts.length === 0) {
    postsContainer.innerHTML = "<p>No posts found in this category.</p>";
    return;
  }

  filteredPosts.forEach((post) => {
    postsContainer.appendChild(createPostCard(post));
  });
}




function openModal(post) {
  modalTitle.textContent = post.title;
  modalDate.textContent = post.date;
  modalContent.textContent = post.content;
  modal.classList.add("active");
  modal.focus();

const htmlString = post.content;

// Create a temporary DOM element
const tempDiv = document.createElement('div');
tempDiv.innerHTML = htmlString;

// Remove all <img> tags and store them
const imgs = tempDiv.querySelectorAll('img');
imgs.forEach(img => img.remove());

// Get cleaned HTML (without images)
const cleanedContent = tempDiv.innerHTML; 

// Clear modal content and add cleaned HTML
modalContent.textContent = ''; // Clear any existing content
modalContent.innerHTML = cleanedContent; 

// Optionally re-add the images at the end (or somewhere else)
imgs.forEach(img => modalContent.appendChild(img));




}

function closeModal() {
  modal.classList.remove("active");
}

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navLinks.forEach((lnk) => lnk.classList.remove("active"));
    link.classList.add("active");
    renderPosts(link.dataset.category);
  });
});

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

renderPosts();

