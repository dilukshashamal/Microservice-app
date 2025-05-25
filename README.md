# 🌐 Microservice Application 🚀

This repository is hands-on guide to understanding the fundamental concepts behind modern web application development, containerization, and orchestration. We'll build a simple full-stack application using cutting-edge technologies and deploy it with industry-standard tools.

## 🎯 Project Overview: First Dive into Distributed Systems

This project aims to demystify the core components of a scalable web application. We'll be creating a simple application (e.g., a "Hello World" or a basic note-taking app) that consists of:

- A sleek, responsive frontend built with **Next.js**.
- A powerful, efficient backend API powered by **Python FastAPI**.
- Containerization using **Docker** to package our applications.
- Orchestration with **Kubernetes** to manage our containers in a production-like environment.

This setup is a microcosm of what you'll encounter in real-world professional development, offering a fantastic learning opportunity for intern engineers.

## 🧠 Core Concepts: Unpacking the Tech Stack

### 1. Frontend: Next.js (React Framework)
- **What it is**: Next.js is a React framework for building production-ready web applications.
- **Why we use it**: For creating fast, SEO-friendly, and maintainable user interfaces.

### 2. Backend: FastAPI (Python Web Framework)
- **What it is**: FastAPI is a high-performance web framework based on standard Python type hints.
- **Why we use it**: For building robust, asynchronous, and self-documenting backend APIs quickly.

### 3. Containerization: Docker
- **What it is**: Docker is a platform for developing, shipping, and running applications in containers.
- **Why we use it**: To ensure consistency across environments and simplify deployment.

### 4. Orchestration: Kubernetes
- **What it is**: Kubernetes (K8s) is a container orchestration system.
- **Why we use it**: For managing Docker containers in distributed environments with scalability and resilience.

## 🏗️ High-Level Architecture

```
+-------------------+      +-------------------+      +-------------------+
|                   |      |                   |      |                   |
|   User's Browser  |----->|   API Gateway     |----->|   Next.js App     |
|                   |      | (e.g., Ingress)   |      | (Frontend)        |
+-------------------+      +-------------------+      +-------------------+
                                   |
                                   | Requests for API data
                                   V
                          +-------------------+
                          |                   |
                          |   FastAPI App     |
                          |   (Backend API)   |
                          +-------------------+

          ^                   ^                   ^
          |                   |                   |
          | Docker Containers | Docker Containers | Docker Containers
+-----------------------------------------------------------------------+
|                               Kubernetes Cluster                      |
|   (Manages and orchestrates all containers, handles scaling, healing) |
+-----------------------------------------------------------------------+
```

## 📂 Project Structure

```
.
├── frontend/
│   ├── app/
│   ├── public/
│   ├── .gitignore
│   ├── Dockerfile
│   ├── README.md
│   ├── eslint.config.mjs
│   ├── next.config.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── backend/
│   ├── __pycache__/
│   ├── .gitignore
│   ├── Dockerfile
│   ├── main.py
│   └── requirements.txt
├── k8s/
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-configmap-runtime.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── .gitignore
│   └── README.md
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 🚀 Getting Started: Running Locally (Without Docker/Kubernetes)

### Prerequisites

- Node.js (LTS version, e.g., 18.x or 20.x)
- Python 3.9+
- Git
- Your favorite IDE

### 1. Frontend Setup (Next.js)

```bash
cd frontend
npm install
```

Create a `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Run the frontend:

```bash
npm run dev
```

### 2. Backend Setup (FastAPI)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Check docs:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 📦 Containerization with Docker

### Prerequisites

- Docker Desktop

### 1. Dockerfiles

- **frontend/Dockerfile**
- **backend/Dockerfile**

### 2. Build Docker Images

```bash
docker build -t nextjs-frontend ./frontend
docker build -t fastapi-backend ./backend
```

### 3. Docker Compose

```bash
docker-compose up --build
```

To stop:

```bash
docker-compose down
```

## ☸️ Orchestration with Kubernetes

### Prerequisites

- Minikube or Docker Desktop with Kubernetes
- kubectl

### 1. Kubernetes Concepts

- **Pod**
- **Deployment**
- **Service**
- **Ingress**

### 2. Apply Kubernetes Manifests

If using Minikube:

```bash
eval $(minikube docker-env)
docker build -t nextjs-frontend ./frontend
docker build -t fastapi-backend ./backend
```

Apply manifests:

```bash
cd k8s
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f frontend-configmap-runtime.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
```

### 3. Accessing the App

Port forwarding:

```bash
kubectl port-forward service/frontend-service 3000:3000
kubectl port-forward service/backend-service 8000:8000
```

Ingress (if configured):

```bash
minikube ip
# Add entry to /etc/hosts or Windows hosts file
# 192.168.49.2  my-app.local
```

Access via http://my-app.local

### 4. Clean Up

```bash
kubectl delete -f .
minikube stop
minikube delete
```

## 💡 Key Learnings for Intern Engineers

- Frontend & Backend Separation
- API Communication
- Dependency Management
- Docker & Kubernetes Fundamentals
- Declarative Configuration
- Scalability & Resilience Concepts
