#!groovy
node {
    stage('Checkout') {
      checkout scm
    }
    stage('Build') {
      sh 'npm install'
      sh 'npm run build'
    }
    stage('Test') {
      sh 'npm run lint'
   }
}

