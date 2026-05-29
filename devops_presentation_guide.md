# CHOOSEEASY: Comprehensive DevOps, Git, Docker & Jenkins Guide

This document provides a complete guide to presenting the DevOps, Git/GitHub, Docker, and Jenkins implementations of the **CHOOSEEASY** project. It is structured into presentation notes for your evaluator ("Sir"), step-by-step explanations of all automated activities, and a dedicated bank of **20 Viva Questions** with expert answers.

---

# PART 1: Separate Presentation Summaries (For "Sir")

Copy or print these individual sections to show your instructor/evaluator.

### 📂 GIT & GITHUB SUMMARY
* **Goal**: Establish version control, collaborative branching workflows, and integration pipelines.
* **Activities Performed**:
  * Initialized local Git repository (`git init`) and linked it to GitHub (`git remote add`).
  * Implemented a structured branching strategy using `master` for production, `feature` for active development, and `bugfix`/`experiment` for isolated testing.
  * Successfully resolved intentional **Merge Conflicts** between the `test` and `master` branches by manually editing and committing the resolution.
  * Demonstrated **Octopus Merging** (merging multiple feature branches, e.g., `octo-feat-1` and `octo-feat-2`, into a single target branch in one command).
  * Released versions using Git Tagging (`git tag v1.0.0`) and pushed them to GitHub (`git push origin --tags`).

### 🐋 DOCKER CONTAINERIZATION SUMMARY
* **Goal**: Solve the "works on my machine" problem by ensuring consistent environments.
* **Activities Performed**:
  * **Frontend Client (React.js)**: Configured a multi-stage Dockerfile that builds the static assets using Node 20 and serves them using a lightweight HTTP server (`serve`).
  * **Backend Server (Node.js)**: Created a container running the Express API server on port 5000.
  * **AI Microservice (Python)**: Created a container with Python dependencies (`Flask`, `requests`) to handle Gemini AI prompts on port 5001.
  * **Orchestration (Docker Compose)**: Multi-container deployment managing MongoDB, Node.js, Flask, and React.js.
  * **Networking**: Containers communicate securely via a custom bridge network (`chooseeasy-network`) using service names as hosts (e.g., `http://ai-service:5001`).
  * **Data Persistence**: Configured Docker Volumes (`mongo_data`) to prevent MongoDB database loss when containers are stopped.

### ⚙️ JENKINS CI/CD PIPELINE SUMMARY
* **Goal**: Automate integration testing and live deployment on every code push.
* **Activities Performed**:
  * Authored a declarative **`Jenkinsfile`** to define the pipeline stages.
  * **Checkout Stage**: Automatically downloads the latest code from GitHub on commit.
  * **Build Stages**: Installs Node dependencies (`npm install`) on both client and server layers.
  * **Test Stages**: Automated execution of test suites (`npm test`) to guarantee application stability before release.
  * **Deploy Stage**: Automates container updates by stopping old containers (`docker-compose down`) and building/running new ones (`docker-compose up -d --build`) in a single run.
  * **Post-build Actions**: Logs success/failure states and triggers alerts.

---

# PART 2: Deep Dive into Docker & Jenkins Activities

### 1. Docker Activity Explanation
Your project is completely containerized. Instead of forcing users to install Node.js, Python, MongoDB, and various system packages locally, everything is packaged into isolated virtual environments (containers).

* **client/Dockerfile**:
  * **Stage 1 (Build)**: Uses a standard Node 20 environment to install packages (`npm install`) and run the build script (`npm run build`). This creates the optimized `/dist` folder.
  * **Stage 2 (Run)**: Discards the heavy node modules, installs `serve` globally, copies *only* the small `/dist` folder, and exposes port `80`. This reduces the image size drastically.
* **server/Dockerfile**:
  * Pulls `node:18-alpine`, copies the Node backend, installs production dependencies, and exposes the Express server port `5000`.
* **docker-compose.yml**:
  * Acts as the orchestration script. It spins up all 4 containers simultaneously, wires them to `chooseeasy-network`, mounts the `mongo_data` volume to `/data/db` inside MongoDB, and passes environment variables (such as the database URI `mongodb://mongodb:27017/chooseeasy` and `AI_SERVICE_URL`).

---

### 2. Jenkins Activity Explanation
Jenkins acts as the **Continuous Integration (CI) and Continuous Deployment (CD)** engine.

* **Checkout SCM**: Jenkins automatically connects to your Git repository and downloads the code.
* **Continuous Integration (Stages 2-5)**: Jenkins builds the node environments and runs automated test commands (`npm test`). If any unit test fails, Jenkins instantly stops the pipeline, marks it red, and **refuses to deploy**. This keeps bugs out of your production server.
* **Continuous Deployment (Stage 6)**: Once tests pass, Jenkins executes shell commands to restart the containers. Because it runs `docker-compose up -d --build`, Docker rebuilds only the containers that had code updates (like your updated `Home.jsx` card) and restarts them seamlessly, ensuring zero downtime.

---

# PART 3: Top 20 DevOps & Git Viva Questions & Answers

### 🔍 Category 1: Git & GitHub

#### Q1: What is version control, and why is it important in a project like CHOOSEEASY?
* **Answer**: Version control (like Git) keeps a historical record of all code changes. In CHOOSEEASY, it allows multiple developers to work on different features (like the AI recommendations or Auth modules) simultaneously on separate branches without overwriting each other's work. If a bug is introduced, we can easily revert to a previous working state.

#### Q2: What is the difference between Git and GitHub?
* **Answer**: **Git** is a local command-line tool used by developers to track changes and manage history. **GitHub** is a cloud-based hosting service that stores the remote Git repository, offering collaboration tools, pull requests, issue trackers, and webhook triggers for CI/CD tools like Jenkins.

#### Q3: What is a merge conflict, and how did you resolve it in this project?
* **Answer**: A merge conflict occurs when Git attempts to merge two branches that modified the same lines of the same file, and cannot decide which version to use. I resolved it by opening the conflicted file, removing the Git conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), deciding which code blocks to keep, saving the file, staging it (`git add`), and committing the resolved merge.

#### Q4: What is an Octopus Merge in Git? When is it used?
* **Answer**: An Octopus Merge is a Git operation that merges more than two branches into a single branch in a single commit. It is used when a lead developer wants to merge multiple independent feature branches (e.g. `octo-feat-1` and `octo-feat-2`) into the main integration branch at once. It keeps the commit history cleaner than running separate sequential merges.
* **Command**: `git merge branch-a branch-b branch-c`

#### Q5: What is Git Tagging, and why did you use it?
* **Answer**: Git Tagging marks specific points in git history as important release milestones (e.g., v1.0.0). We use tags to mark stable release versions, allowing the deployment pipeline or team to easily identify and roll back to specific release versions when needed.

#### Q6: What is the difference between `git pull` and `git fetch`?
* **Answer**: `git fetch` downloads the latest commits and branches from the remote repository to your local system but does not merge them into your working files. `git pull` is a combination of `git fetch` followed immediately by `git merge`, bringing the remote changes straight into your active branch.

#### Q7: What is the purpose of a `.gitignore` file?
* **Answer**: It specifies untracked files and folders that Git should intentionally ignore. In our project, we include `node_modules/`, `venv/`, `.env` files, and build folders so we don't upload heavy libraries or sensitive credentials (API keys) to GitHub.

---

### 🐋 Category 2: Docker & Containerization

#### Q8: What is a Docker Image, and how does it differ from a Docker Container?
* **Answer**: A **Docker Image** is a read-only blueprint (or template) that contains the code, runtime, libraries, environment variables, and config files needed to run an application. A **Docker Container** is a runnable, live instance of that image, isolated from other containers and the host OS.

#### Q9: Explain the concept of "Multi-stage builds" used in your client Dockerfile.
* **Answer**: Multi-stage builds use multiple `FROM` instructions in a single Dockerfile. 
  * In the first stage, we use a full Node.js image to install packages and compile the React application (`npm run build`), which generates the static assets.
  * In the second stage, we start from a clean, lightweight Node image, install `serve` globally, and copy *only* the compiled static assets from the first stage. This discards all the heavy development dependencies (like `node_modules`), resulting in a much smaller production image.

#### Q10: What is Docker Compose, and why did you use it?
* **Answer**: Docker Compose is a tool used to define and run multi-container applications. It uses a single YAML file (`docker-compose.yml`) to configure services, networks, and volumes. We use it in CHOOSEEASY to launch all four services (React frontend, Node API server, Python AI service, and MongoDB database) simultaneously with a single command: `docker-compose up`.

#### Q11: What is a Docker Volume, and why is it defined for MongoDB in your project?
* **Answer**: Docker containers are ephemeral; any data created inside a container is lost when the container is deleted. A **Docker Volume** is a storage directory mounted from the host system into the container. We configure `mongo_data` for MongoDB to ensure that all user profiles, test questions, and recommendation data persist safely even when the containers are stopped or restarted.

#### Q12: How do containers communicate with each other in this project?
* **Answer**: Docker Compose automatically configures a custom bridge network called `chooseeasy-network`. Because they are on the same network, containers can communicate with each other using their service names defined in the compose file as hostnames (e.g. the Node server contacts the Python service at `http://ai-service:5001` and MongoDB at `mongodb://mongodb:27017`).

#### Q13: Why did you update the client Dockerfile to use Node 20 (`node:20-alpine`) instead of Node 18?
* **Answer**: The frontend uses Vite and Rolldown-Vite to compile. Modern versions of Vite and Rolldown require Node 20.19+ because they rely on native node utilities (specifically `styleText` from the `node:util` module) that were not present in older versions of Node 18. Moving to `node:20-alpine` resolved the compile syntax error.

#### Q14: What does the `depends_on` parameter do in your `docker-compose.yml`?
* **Answer**: It defines startup order dependencies between services. For example, `client` depends on `server` and `ai-service`. This ensures that the database and API servers start booting up before the client container runs, preventing connection errors.

---

### ⚙️ Category 3: Jenkins & CI/CD

#### Q15: What is CI/CD, and what are its benefits?
* **Answer**: **Continuous Integration (CI)** automatedly builds and tests code changes on every commit to catch bugs early. **Continuous Delivery/Deployment (CD)** automatically packages and deploys the passing code directly to the staging or production server. It increases development speed, removes manual deployment human errors, and ensures code is always in a releasable state.

#### Q16: What is a Declarative Pipeline in Jenkins?
* **Answer**: A Declarative Pipeline is a structured way to write Jenkins automation scripts using a simple, readable block-based syntax. It is saved in a file named `Jenkinsfile` directly in the project codebase, allowing the pipeline to be version-controlled alongside the application code.

#### Q17: What is the difference between the `sh` and `bat` steps in a Jenkinsfile?
* **Answer**: `sh` executes shell commands on Linux or macOS Jenkins build nodes. `bat` executes batch/PowerShell commands on Windows Jenkins build nodes. Since our Jenkins environment runs on a Windows server, we use `bat` to execute npm commands and start Docker Compose.

#### Q18: What are Jenkins Build Triggers, and how did you configure yours?
* **Answer**: Build Triggers tell Jenkins when to start running a pipeline. We configure it using either **Webhooks** (where GitHub immediately notifies Jenkins about a code push over HTTP) or **Poll SCM** (where Jenkins periodically checks GitHub for new commits). Both automate the pipeline execution upon code push.

#### Q19: What is the `post` section in a Jenkinsfile, and how is it used in your project?
* **Answer**: The `post` section defines steps that run at the very end of the pipeline execution depending on the build status. In our pipeline:
  * `always`: Executes clean-up logs.
  * `success`: Informs the team that the build succeeded and the new containers are live.
  * `failure`: Alerts developers that a test broke or the build failed, allowing them to inspect the logs immediately.

#### Q20: If the "Test Client" stage fails in your Jenkins pipeline, will the application still deploy? Why?
* **Answer**: No, it will not. In our `Jenkinsfile`, the stages run sequentially. If the `Test Client` stage fails (meaning a unit test failed), the pipeline halts immediately with a failure status and does not execute the subsequent `Deploy` stage. This acts as a quality gate, preventing buggy or broken code from ever being deployed to the live website.

---

# PART 4: Quick-Reference Checklist for Your Exam/Viva
When presenting to your evaluator:
1. **Show GitHub**: Open your repository, show the branch history, and the commit log showing the merge conflict resolution.
2. **Show Jenkins Dashboard**: Open [http://localhost:7070](http://localhost:7070) and point out the Visual Stage View with all steps highlighted in green.
3. **Trigger Live Build**: Push a tiny change (e.g. edit a comment) to GitHub and let your evaluator see Jenkins automatically trigger, test, and deploy the change live.
4. **Show Docker Desktop**: Show the active `chooseeasy` group running 4 healthy containers with zero issues.
5. **Demonstrate App**: Open [http://localhost](http://localhost) and show the running career counseling platform!
