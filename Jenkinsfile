pipeline {
    agent { docker { image 'node:18.12.1' } }
    stages {
        stage('build') {
            steps {
                sh 'node --version'
            }
        }
    }
}