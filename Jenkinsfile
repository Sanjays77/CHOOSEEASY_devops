pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Jenkins will automatically pull the code from the configured Git repository
                checkout scm
            }
        }

        stage('Install Server Dependencies') {
            steps {
                dir('server') {
                    // Using 'bat' for Windows nodes. Change to 'sh' if running on Linux.
                    bat 'npm install'
                }
            }
        }

        stage('Install Client Dependencies') {
            steps {
                dir('client') {
                    bat 'npm install'
                }
            }
        }

        stage('Test Server') {
            steps {
                dir('server') {
                    bat 'npm test'
                }
            }
        }

        stage('Test Client') {
            steps {
                dir('client') {
                    bat 'npm test'
                }
            }
        }

        stage('Deploy (Docker Compose)') {
            steps {
                // This will stop the existing containers, build new images, and start them
                bat 'docker-compose down'
                bat 'docker-compose up -d --build'
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed.'
        }
        success {
            echo 'Deployment successful! Application is running on ports 80 (Frontend) and 5000 (Backend).'
        }
        failure {
            echo 'Pipeline failed. Check the logs for errors.'
        }
    }
}
