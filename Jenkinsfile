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
                sh 'export npm_config_cache=/tmp'
                sh 'npm cache clean --force && rm package-lock.json && npm install --prefix /tmp'
                sh 'npm run build'
            }
        }
    }
}