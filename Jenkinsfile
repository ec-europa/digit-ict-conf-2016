#!groovy
node {
    stage('Checkout') {
      checkout scm
    }
    stage('Build') {
      sh 'npm install -g yarn --no-progress --silent'
      sh 'yarn install --no-progress'
      sh 'npm run build'
    }
    stage('Test') {
      sh 'npm run lint'
   }
}

