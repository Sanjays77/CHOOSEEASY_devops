# CHOOSEEASY

Project for Git & GitHub Hands-On Assignment.

## Project Overview
CHOOSEEASY is a web-based career guidance application created to demonstrate Git and GitHub version-control operations. The project focuses on applying Git concepts such as repository initialization, branching strategies, octopus merging, tagging, conflict resolution, and remote repository management using GitHub. This repository is created specifically for academic Git evaluation purposes.

## Technologies Used
- React.js
- Tailwind CSS
- Node.js
- Express.js
- MongoDB
- HTML
- CSS
- JavaScript
- Git (Git Bash)
- GitHub

## Git Commands Used

### Repository Initialization
- `git init`: Initialized the repository.

### Staging & Committing
- `git add .`: Staged changes.
- `git commit -m "commit message"`: Committed changes.

### Branching
- `git branch`: Created and listed branches.
- `git checkout -b <branch_name>`: Created and switched to a new branch.

### Merging
- `git merge <branch_name>`: Merged branches.
- `git merge octo-feat-1 octo-feat-2`: Performed an Octopus Merge of multiple branches.

### Merge Conflict Resolution
- **Conflict created intentionally**: Conflict encountered during development.
- **Conflict resolved manually**: Edited files to resolve differences.
- **Final merged commit created**: Committed the resolved changes.

### Remote Repository
- `git remote add origin <repository_url>`: Connected to remote repository.
- `git push -u origin master`: Pushed master branch to GitHub.
- `git push origin <branch_name>`: Pushed feature/test branches to GitHub.
- `git tag`: Created version tags.
- `git push origin --tags`: Pushed tags to remote.
- `git log`: Viewed commit history.

## Branches Created
The following branches were created and used during development:
- master
- feature
- test
- bugfix
- experiment
- octo-feat-1
- octo-feat-2
Each branch contains at least one meaningful commit.

## Features
- Client-side React application
- NodeJS Server
- REST API integration

## Project Structure

```text
CHOOSEEASY/
├── client/
│   ├── public/
│   │   ├── images/
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   │   ├── chooseeasy.png
│   │   │   └── react.svg
│   │   ├── components/
│   │   │   ├── CareerCard.jsx
│   │   │   ├── FeatureCard.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── TestimonialCard.jsx
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   ├── data/
│   │   │   ├── careers.json
│   │   │   └── testData.js
│   │   ├── pages/
│   │   │   ├── Admin.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminUserDetails.jsx
│   │   │   ├── Auth.jsx
│   │   │   ├── CareerDetails.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Explore.jsx
│   │   │   ├── Feedback.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Test.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/
│   ├── data/
│   │   └── careersData.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Career.js
│   │   ├── Contact.js
│   │   ├── Feedback.js
│   │   ├── Question.js
│   │   ├── TestResult.js
│   │   ├── Testimonial.js
│   │   └── User.js
│   ├── routes/
│   │   ├── admin.js
│   │   ├── auth.js
│   │   ├── careers.js
│   │   ├── contact.js
│   │   ├── feedback.js
│   │   ├── questions.js
│   │   ├── testResults.js
│   │   ├── testimonials.js
│   │   └── user.js
│   ├── services/
│   │   └── onetService.js
│   ├── .env
│   ├── index.js
│   ├── package.json
│   ├── seed.js
│   ├── seedAdmin.js
│   └── seedQuestions.js
│
├── .gitignore
├── onet-web-services-openapi.json
└── README.md
```

## Roadmap

```text
CHOOSEEASY Project Roadmap
├── Phase 1: Foundation & Setup
│   ├── [x] Project Initialization & Git Setup
│   ├── [x] Server-Client Architecture Implementation
│   └── [x] Basic Routing & Navigation Setup
│
├── Phase 2: Authentication & User Management
│   ├── [x] User Authentication (Login/Signup)
│   ├── [x] Secure Password Validation
│   └── [x] Admin Dashboard with User Details View
│
├── Phase 3: Core Features
│   ├── [x] Home Page Development (Hero, Stats)
│   ├── [x] "About Us" Section Implementation
│   ├── [x] Explore Page (Content Locking)
│   └── [x] Comprehensive Career Test
│
├── Phase 4: UI/UX Enhancements
│   ├── [x] Mobile Responsiveness (Hamburger Menu)
│   └── [x] Visual Enhancements (AI Imagery)
│
└── Future Scope
    ├── [ ] Advanced Result Analysis
    ├── [ ] User Profile Customization
    ├── [ ] Performance Optimization
    └── [ ] Production Deployment
```

## Testing
- Unit testing with Jest
- Integration testing

## Challenges & Solutions
- **Merge Conflict**: Encountered a conflict when merging the `test` branch into `master` as both had modifications at the same location.
- **Resolution**: Manually edited the file to include both changes and committed the resolution.

## Conclusion
This project successfully demonstrates the use of Git for version control. I learned how to manage branches, resolve conflicts, and sync with a remote repository on GitHub.

## Proofs (Screenshots)
*(Please insert screenshots of your terminal here)*

![Git Log](placeholder-link-git-log)
![Merge Conflict](placeholder-link-merge-conflict)

## Author
Sanjays77
