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
                sh 'cd /opt/code && ls -al'
                sh 'npm cache clean --force && rm package-lock.json && npm install --prefix ./'
                sh 'npm run build'
            }
        }
    }
}