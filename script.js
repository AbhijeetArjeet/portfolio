/**
 * ============================================================================
 * JAVASCRIPT CORE IMPLEMENTATION - Abhijeet Arjeet Portfolio
 * Compliant with Course Syllabus CO-2:
 * - Data Types, Variables (let, const), Operators & Control Structures
 * - Functions (Declarations & Arrow Functions)
 * - Array & Object Manipulation, Destructuring & Template Literals
 * - DOM Manipulation & Event Handling
 * - Asynchronous JavaScript: Promises, Async/Await & Fetch API
 * - HTML5 Form Validation & Error Handling
 * - LocalStorage API for Data Persistence
 * ============================================================================
 */

// 1. CONFIGURATION & CONSTANTS
const GITHUB_USERNAME = "AbhijeetArjeet";
const GITHUB_USER_API = `https://api.github.com/users/${GITHUB_USERNAME}`;
const GITHUB_REPOS_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`;

// Pre-configured fallback projects from Abhijeet's GitHub (Guarantees display if GitHub API rate-limits)
const FALLBACK_PROJECTS = [
    {
        name: "OpenDisplay-USB",
        html_url: "https://github.com/AbhijeetArjeet/OpenDisplay-USB",
        description: "Turn Android devices into genuine secondary displays for Windows PCs over USB with low latency, hardware acceleration, multi-touch, and audio.",
        language: "Python",
        updated_at: "2026-09-22"
    },
    {
        name: "AniScribe",
        html_url: "https://github.com/AbhijeetArjeet/AniScribe",
        description: "Production-grade offline AI subtitle engine, multilingual speech recognition (Whisper INT8), VLC-parity media player, and anime download manager.",
        language: "TypeScript",
        updated_at: "2026-09-19"
    },
    {
        name: "vayu-cpi",
        html_url: "https://github.com/AbhijeetArjeet/vayu-cpi",
        description: "Academic CPI calculation and student portal engine built for college courses, deployed on Vercel with responsive user experience.",
        language: "TypeScript",
        updated_at: "2026-08-30"
    },
    {
        name: "AURA",
        html_url: "https://github.com/AbhijeetArjeet/AURA",
        description: "Spotify/Winamp-Inspired Local Music Universe & DJ Suite with AutoMix, visualizers, and On-Device Media Downloader.",
        language: "Kotlin",
        updated_at: "2026-08-31"
    },
    {
        name: "wifi-portal-tester",
        html_url: "https://github.com/AbhijeetArjeet/wifi-portal-tester",
        description: "Mobile-first Progressive Web App (PWA) for testing captive portal Wi-Fi systems and network diagnostics.",
        language: "JavaScript",
        updated_at: "2026-08-25"
    },
    {
        name: "yt_downloader",
        html_url: "https://github.com/AbhijeetArjeet/yt_downloader",
        description: "Modern Android audio/video extraction application featuring background threading, audio conversion, and clean UI.",
        language: "Kotlin",
        updated_at: "2026-08-31"
    },
    {
        name: "dualboot-clock-fix",
        html_url: "https://github.com/AbhijeetArjeet/dualboot-clock-fix",
        description: "Fixes Windows/Linux dual-boot clock desynchronization issues between hardware RTC local time and system UTC time.",
        language: "PowerShell",
        updated_at: "2026-08-09"
    }
];

const DEFAULT_LINKEDIN_URL = "https://www.linkedin.com/in/abhijeet-arjeet-1aa62b3a7/";

// Global state for projects
let allProjects = [];

// ----------------------------------------------------------------------------
// 2. DOM CONTENT LOADED EVENT LISTENER
// ----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio application initialized.");
    
    // Initialize Profile Photo (from LocalStorage or Default)
    initProfilePhoto();

    // Initialize LinkedIn Profile Links (from LocalStorage or Default)
    initLinkedIn();

    // Load Peer Portfolios from LocalStorage
    initPeerPortfolios();
    
    // Fetch GitHub Repositories using Async/Await & Fetch API
    loadGitHubData();

    // Initialize Search & Filter Event Listeners
    initProjectFilters();

    // Initialize Form Validation & Submission
    initContactForm();

    // Check LocalStorage status
    updateLocalStorageCount();

    // Initialize User / Evaluator Session
    initAuthSession();
});

// ----------------------------------------------------------------------------
// AUTHENTICATION & EVALUATOR SESSION MANAGEMENT (Suneetha Mam vs Regular Users)
// ----------------------------------------------------------------------------
function initAuthSession() {
    const sessionData = localStorage.getItem("portfolio_session");
    const navAuthBtn = document.getElementById("nav-auth-btn");
    const banner = document.getElementById("authWelcomeBanner");
    const bannerMsg = document.getElementById("bannerUserMsg");
    const noticeBanner = document.getElementById("facultyNoticeBanner");
    const noticeMsg = document.getElementById("facultyNoticeMsg");

    // Display Faculty Notice / Evaluation Note if posted by Suneetha Mam
    const facultyMsg = localStorage.getItem("portfolio_faculty_message");
    if (noticeBanner && noticeMsg) {
        if (facultyMsg) {
            noticeMsg.textContent = facultyMsg;
            noticeBanner.style.display = "block";
        } else {
            noticeBanner.style.display = "none";
        }
    }

    if (sessionData) {
        try {
            const user = JSON.parse(sessionData);
            const isMam = user.username && (user.username.toLowerCase() === "suneetha mam" || user.username.toLowerCase() === "suneetha");

            if (navAuthBtn) {
                if (isMam) {
                    navAuthBtn.innerHTML = `🎓 Admin Portal`;
                    navAuthBtn.href = "admin.html";
                    navAuthBtn.title = "Open Faculty Admin Dashboard";
                    navAuthBtn.className = "btn btn-primary";
                } else {
                    navAuthBtn.innerHTML = `👤 ${user.displayName || user.username} <span style="font-size: 0.75rem; opacity: 0.8; margin-left: 4px;">(Logout)</span>`;
                    navAuthBtn.href = "javascript:logoutUser()";
                    navAuthBtn.title = "Click to log out";
                    navAuthBtn.className = "btn btn-secondary";
                }
            }
            if (banner && bannerMsg) {
                if (isMam) {
                    bannerMsg.innerHTML = `Welcome, <strong>Prof. Suneetha Mam</strong>! Logged in as Faculty Evaluator. <a href="admin.html" style="color:#fef08a; text-decoration:underline; font-weight:700; margin-left:8px;">Open Faculty Admin Dashboard &rarr;</a>`;
                } else {
                    bannerMsg.textContent = `Welcome, ${user.displayName || user.username}! Logged in as ${user.role || 'Registered User'}.`;
                }
                banner.style.display = "flex";
            }
        } catch (e) {
            console.error("Error parsing user session:", e);
        }
    } else {
        if (navAuthBtn) {
            navAuthBtn.textContent = "Sign In / Login";
            navAuthBtn.href = "login.html";
            navAuthBtn.className = "btn btn-primary";
            navAuthBtn.title = "Sign In or Sign Up";
        }
        if (banner) {
            banner.style.display = "none";
        }
    }
}

window.logoutUser = function() {
    localStorage.removeItem("portfolio_session");
    alert("You have logged out successfully.");
    initAuthSession();
};

// ----------------------------------------------------------------------------
// PROFILE PHOTO MANAGEMENT & LOCALSTORAGE
// ----------------------------------------------------------------------------
function initProfilePhoto() {
    const savedPhoto = localStorage.getItem("portfolio_profile_photo");
    const imgEl = document.getElementById("profile-img");
    if (imgEl) {
        if (savedPhoto) {
            imgEl.src = savedPhoto;
        } else {
            imgEl.src = "profile.jpg?v=2";
        }
    }
}

/**
 * Allows the user to paste their direct LinkedIn image URL or custom image URL.
 * Persists in LocalStorage.
 */
window.updateProfilePhotoPrompt = function() {
    const current = localStorage.getItem("portfolio_profile_photo") || "";
    const newPhotoUrl = prompt(
        "Enter your LinkedIn photo image URL (Right-click your LinkedIn profile photo -> 'Copy image address') or any direct image URL:\n\n(Tip: You can also place an image file named 'profile.jpg' in your portfolio folder)",
        current
    );
    if (!newPhotoUrl || !newPhotoUrl.trim()) return;

    const cleanUrl = newPhotoUrl.trim();
    localStorage.setItem("portfolio_profile_photo", cleanUrl);
    const imgEl = document.getElementById("profile-img");
    if (imgEl) {
        imgEl.src = cleanUrl;
    }
    alert("Profile photo updated successfully!");
};

// ----------------------------------------------------------------------------
// LINKEDIN PROFILE INTEGRATION & LOCALSTORAGE
// ----------------------------------------------------------------------------
function initLinkedIn() {
    const savedUrl = localStorage.getItem("portfolio_linkedin") || DEFAULT_LINKEDIN_URL;
    updateLinkedInLinks(savedUrl);
}

function updateLinkedInLinks(url) {
    const linkIds = [
        "nav-linkedin-link",
        "hero-linkedin-btn",
        "quickfacts-linkedin-link",
        "linkedin-display-link",
        "linkedin-cta-btn",
        "contact-linkedin-link",
        "footer-linkedin-link"
    ];

    linkIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.href = url;
            if (id === "quickfacts-linkedin-link" || id === "linkedin-display-link" || id === "contact-linkedin-link") {
                el.textContent = url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
            }
        }
    });
}

/**
 * Allows the user to dynamically edit/verify their LinkedIn profile URL.
 * Saved in LocalStorage so it persists across refreshes.
 */
window.editLinkedInUrl = function() {
    const current = localStorage.getItem("portfolio_linkedin") || DEFAULT_LINKEDIN_URL;
    const newUrl = prompt("Enter your LinkedIn Profile URL:", current);
    if (!newUrl || !newUrl.trim()) return;

    const cleanUrl = newUrl.trim();
    localStorage.setItem("portfolio_linkedin", cleanUrl);
    updateLinkedInLinks(cleanUrl);
    alert("LinkedIn profile URL updated successfully!");
};

// ----------------------------------------------------------------------------
// 3. FETCH API & ASYNC/AWAIT (GitHub Data Loading)
// ----------------------------------------------------------------------------
/**
 * Asynchronously fetches user profile and repositories from GitHub REST API
 * Demonstrates: Promises, Async/Await, Error Handling, JSON Parsing
 */
async function loadGitHubData() {
    const loadingStatus = document.getElementById("loadingStatus");

    try {
        // Fetch user metadata (Followers, public repos count)
        const userPromise = fetch(GITHUB_USER_API);
        // Fetch repositories list
        const reposPromise = fetch(GITHUB_REPOS_API);

        // Await both promises concurrently
        const [userResponse, reposResponse] = await Promise.all([userPromise, reposPromise]);

        if (userResponse.ok) {
            const userData = await userResponse.json();
            // ES6 Destructuring
            const { followers, public_repos } = userData;
            
            const followersEl = document.getElementById("gh-followers");
            if (followersEl) followersEl.textContent = followers;
        }

        if (reposResponse.ok) {
            const repos = await reposResponse.json();
            
            // Filter out forks and format
            const filtered = repos
                .filter(repo => !repo.fork && repo.name !== GITHUB_USERNAME)
                .map(repo => ({
                    name: repo.name,
                    html_url: repo.html_url,
                    description: repo.description || "Open source project repository created by Abhijeet Arjeet.",
                    language: repo.language || "General",
                    updated_at: repo.updated_at ? repo.updated_at.split("T")[0] : "Recently"
                }));

            if (filtered.length > 0) {
                allProjects = filtered;
                loadingStatus.innerHTML = `✅ Successfully loaded <strong>${filtered.length}</strong> live projects from GitHub API.`;
            } else {
                allProjects = FALLBACK_PROJECTS;
                loadingStatus.innerHTML = `ℹ️ Displaying featured repositories from GitHub.`;
            }
        } else {
            // Fallback if rate limited
            allProjects = FALLBACK_PROJECTS;
            loadingStatus.innerHTML = `ℹ️ Displaying top verified GitHub projects (API rate limit fallback).`;
        }

    } catch (error) {
        console.warn("GitHub API fetch encountered an issue, loading local projects:", error);
        allProjects = FALLBACK_PROJECTS;
        loadingStatus.innerHTML = `ℹ️ Displaying top verified GitHub projects.`;
    }

    // Render projects inside the CSS Grid container
    renderProjects(allProjects);
}

// ----------------------------------------------------------------------------
// 4. DOM MANIPULATION (Rendering Cards into CSS Grid)
// ----------------------------------------------------------------------------
/**
 * Renders project cards into the CSS Grid container
 * Demonstrates: DOM Creation, Template Literals, Array.forEach
 * @param {Array} projectsList - List of repository objects
 */
function renderProjects(projectsList) {
    const gridContainer = document.getElementById("projectsGrid");
    if (!gridContainer) return;

    gridContainer.innerHTML = ""; // Clear existing

    if (projectsList.length === 0) {
        gridContainer.innerHTML = `<p class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">No matching projects found. Try another search keyword.</p>`;
        return;
    }

    projectsList.forEach(project => {
        // ES6 Destructuring
        const { name, html_url, description, language, updated_at } = project;
        const langClass = (language || "general").toLowerCase();

        // Create HTML element for the card
        const card = document.createElement("article");
        card.className = "project-card";
        
        card.innerHTML = `
            <div>
                <div class="project-card-header">
                    <span class="project-lang-pill ${langClass}">${language || "Code"}</span>
                    <span class="project-date">${updated_at || "Recent"}</span>
                </div>
                <h3>${escapeHTML(name)}</h3>
                <p>${escapeHTML(description)}</p>
            </div>
            <div class="project-card-footer">
                <a href="${html_url}" target="_blank" rel="noopener noreferrer" class="card-link">
                    View on GitHub &rarr;
                </a>
            </div>
        `;

        gridContainer.appendChild(card);
    });
}

// Helper to prevent XSS in dynamic rendering
function escapeHTML(str) {
    if (!str) return "";
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// ----------------------------------------------------------------------------
// 5. EVENT HANDLING: SEARCH & FILTERING (Arrow Functions & Array Methods)
// ----------------------------------------------------------------------------
function initProjectFilters() {
    const searchInput = document.getElementById("projectSearch");
    const filterButtons = document.querySelectorAll(".filter-btn");

    let currentFilter = "all";
    let searchQuery = "";

    const applyFilterAndSearch = () => {
        const query = searchQuery.trim().toLowerCase();
        
        const filtered = allProjects.filter(project => {
            const matchesCategory = currentFilter === "all" || 
                (project.language && project.language.toLowerCase() === currentFilter.toLowerCase());
            
            const matchesQuery = query === "" || 
                project.name.toLowerCase().includes(query) || 
                (project.description && project.description.toLowerCase().includes(query)) ||
                (project.language && project.language.toLowerCase().includes(query));

            return matchesCategory && matchesQuery;
        });

        renderProjects(filtered);
    };

    // Search input listener
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value;
            applyFilterAndSearch();
        });
    }

    // Category button listeners
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentFilter = btn.getAttribute("data-filter");
            applyFilterAndSearch();
        });
    });
}

// ----------------------------------------------------------------------------
// 6. PEER PORTFOLIOS & LOCAL STORAGE (CONNECTING WITH 2 FRIENDS)
// ----------------------------------------------------------------------------
/**
 * Loads and displays the 2 friends' portfolio links.
 * Stored in localStorage so Abhijeet can update them anytime and have them persist!
 */
const DEFAULT_PEERS = {
    peer1: {
        name: "D. Sri Sarvagna",
        desc: "Computer Science Student & Developer exploring AI/ML, algorithmic systems, and modern web technologies.",
        url: "https://dsrisarvagna-sudo.github.io/portfolio/"
    },
    peer2: {
        name: "Hritik Kumar",
        desc: "B.Tech CSE Student · Web Development & Cybersecurity enthusiast.",
        url: "https://hritikkumar-2543.github.io/Student-Portfolio/"
    }
};

function initPeerPortfolios() {
    const savedPeers = localStorage.getItem("portfolio_peers");
    let peers = DEFAULT_PEERS;
    if (savedPeers) {
        try {
            peers = JSON.parse(savedPeers);
            // Migrate placeholders if old keys were stored
            if (peers.peer1 && (peers.peer1.url.includes("classmate1") || peers.peer1.url.includes("friend1"))) {
                peers.peer1 = DEFAULT_PEERS.peer1;
            }
            if (peers.peer2 && (peers.peer2.url.includes("classmate2") || peers.peer2.url.includes("friend2") || peers.peer2.url !== DEFAULT_PEERS.peer2.url)) {
                peers.peer2 = DEFAULT_PEERS.peer2;
            }
            localStorage.setItem("portfolio_peers", JSON.stringify(peers));
        } catch (e) {
            peers = DEFAULT_PEERS;
        }
    }

    // Render Peer 1
    updatePeerDisplay(1, peers.peer1);
    // Render Peer 2
    updatePeerDisplay(2, peers.peer2);
}

function updatePeerDisplay(id, peerData) {
    const nameEl = document.getElementById(`peer${id}-name`);
    const descEl = document.getElementById(`peer${id}-desc`);
    const linkEl = document.getElementById(`peer${id}-link`);
    const visitBtn = document.getElementById(`peer${id}-visit-btn`);

    if (nameEl) nameEl.textContent = peerData.name;
    if (descEl) descEl.textContent = peerData.desc;
    if (linkEl) {
        linkEl.textContent = peerData.url;
        linkEl.href = peerData.url;
    }
    if (visitBtn) visitBtn.href = peerData.url;
}

/**
 * Global function called when user clicks "Edit Details" on a friend card.
 * Uses prompt() as covered in syllabus notes to take new URL & name, then saves in localStorage.
 */
window.editPeer = function(id) {
    const savedPeers = localStorage.getItem("portfolio_peers");
    const peers = savedPeers ? JSON.parse(savedPeers) : { ...DEFAULT_PEERS };
    const current = id === 1 ? peers.peer1 : peers.peer2;

    const newName = prompt(`Enter Friend ${id}'s Name / Title:`, current.name);
    if (!newName) return;

    const newUrl = prompt(`Enter Friend ${id}'s Portfolio URL (GitHub Pages / Website):`, current.url);
    if (!newUrl) return;

    const newDesc = prompt(`Short description:`, current.desc) || current.desc;

    if (id === 1) {
        peers.peer1 = { name: newName, url: newUrl, desc: newDesc };
        updatePeerDisplay(1, peers.peer1);
    } else {
        peers.peer2 = { name: newName, url: newUrl, desc: newDesc };
        updatePeerDisplay(2, peers.peer2);
    }

    // Save to LocalStorage
    localStorage.setItem("portfolio_peers", JSON.stringify(peers));
    alert(`Peer ${id} portfolio updated and saved in LocalStorage!`);
};

// ----------------------------------------------------------------------------
// 7. FORM VALIDATION & LOCAL STORAGE (CO-2 SYLLABUS)
// ----------------------------------------------------------------------------
function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const nameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("emailAddress");
    const messageInput = document.getElementById("messageBody");
    const feedbackEl = document.getElementById("formFeedback");

    // Real-time input clearing of error messages
    nameInput.addEventListener("input", () => clearError("nameError"));
    emailInput.addEventListener("input", () => clearError("emailError"));
    messageInput.addEventListener("input", () => clearError("messageError"));

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Stop normal HTTP submission
        
        let isValid = true;

        // 1. Validate Full Name
        if (nameInput.value.trim().length < 3) {
            showError("nameError", "Please enter your full name (minimum 3 characters).");
            isValid = false;
        } else {
            clearError("nameError");
        }

        // 2. Validate Email with Regular Expression
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            showError("emailError", "Please enter a valid email address (e.g. name@domain.com).");
            isValid = false;
        } else {
            clearError("emailError");
        }

        // 3. Validate Message Body
        if (messageInput.value.trim().length < 10) {
            showError("messageError", "Message must contain at least 10 characters.");
            isValid = false;
        } else {
            clearError("messageError");
        }

        if (!isValid) {
            feedbackEl.className = "form-feedback error";
            feedbackEl.textContent = "Please correct the errors indicated above before submitting.";
            return;
        }

        // Create inquiry object (ES6 Object syntax)
        const inquiryData = {
            fullName: nameInput.value.trim(),
            emailAddress: emailInput.value.trim(),
            phone: document.getElementById("contactNumber").value.trim() || "Not provided",
            reason: document.getElementById("inquiryType").value,
            message: messageInput.value.trim(),
            submittedAt: new Date().toLocaleString()
        };

        // Save to LocalStorage (CO-2 Requirement)
        saveInquiryToLocalStorage(inquiryData);

        // Display Success UI Feedback
        feedbackEl.className = "form-feedback success";
        feedbackEl.textContent = `Thank you, ${inquiryData.fullName}! Your message has been saved locally and logged.`;

        // Reset form
        form.reset();
        updateLocalStorageCount();
    });
}

function showError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) errorEl.textContent = message;
}

function clearError(elementId) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) errorEl.textContent = "";
}

/**
 * Stores inquiry objects into browser LocalStorage array
 */
function saveInquiryToLocalStorage(inquiry) {
    const existing = localStorage.getItem("portfolio_inquiries");
    const inquiries = existing ? JSON.parse(existing) : [];
    inquiries.push(inquiry);
    localStorage.setItem("portfolio_inquiries", JSON.stringify(inquiries));
    console.log("Inquiry saved to LocalStorage:", inquiry);
}

function updateLocalStorageCount() {
    const statusText = document.getElementById("storageStatusText");
    if (!statusText) return;

    const existing = localStorage.getItem("portfolio_inquiries");
    const count = existing ? JSON.parse(existing).length : 0;
    
    if (count === 0) {
        statusText.textContent = "No contact messages saved in LocalStorage yet.";
    } else {
        statusText.innerHTML = `<strong>${count}</strong> inquiry/message(s) stored in browser <code>localStorage</code>.`;
    }
}

/**
 * Allows viewing all saved contact messages (accessible via button)
 */
window.viewSavedMessages = function() {
    const existing = localStorage.getItem("portfolio_inquiries");
    if (!existing || JSON.parse(existing).length === 0) {
        alert("No inquiries stored in LocalStorage yet. Submit the contact form above to test!");
        return;
    }

    const inquiries = JSON.parse(existing);
    let output = `Saved Messages (${inquiries.length}):\n\n`;
    inquiries.forEach((item, index) => {
        output += `[${index + 1}] From: ${item.fullName} (${item.emailAddress})\nReason: ${item.reason}\nMessage: "${item.message}"\nTime: ${item.submittedAt}\n-----------------------\n`;
    });

    alert(output);
};
