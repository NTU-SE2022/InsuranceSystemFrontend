pipeline {
    agent { 
        docker { 
            image 'node:18.12.1'
            args '-v $WORKSPACE:/opt/code'
     } }
    stages {
        stage('build') {
            steps {
                sh 'node --version'
                sh 'npm install'
            }
        }
    }
}