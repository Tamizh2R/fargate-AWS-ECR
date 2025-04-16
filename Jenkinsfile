pipeline {
    agent any

    environment {
        AWS_REGION = "ap-southeast-2"
        ECR_REPO_NAME = "fargate-ecs-example"
        AWS_ACCOUNT_ID = "772693223647"
        ECR_REGISTRY = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    credentialsId: 'github-credentials',
                    url: 'https://github.com/Tamizh2R/fargate-AWS-ECR.git'

                script {
                    env.COMMIT_SHA = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t $ECR_REPO_NAME:$COMMIT_SHA .
                docker tag $ECR_REPO_NAME:$COMMIT_SHA $ECR_REGISTRY/$ECR_REPO_NAME:$COMMIT_SHA
                docker tag $ECR_REPO_NAME:$COMMIT_SHA $ECR_REGISTRY/$ECR_REPO_NAME:latest
                '''
            }
        }

        stage('Login to ECR') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'AWS Credentials'
                ]]) {
                    sh 'aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY'
                }
            }
        }

        stage('Push to ECR') {
            steps {
                sh '''
                docker push $ECR_REGISTRY/$ECR_REPO_NAME:$COMMIT_SHA
                docker push $ECR_REGISTRY/$ECR_REPO_NAME:latest
                '''
            }
        }

        stage('Deploy to ECS Fargate') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'AWS Credentials'
                ]]) {
                    sh '''
                    aws ecs update-service \
                      --cluster fargate-example-cluster1 \
                      --service Fargate-service  \
                      --force-new-deployment \
                      --region $AWS_REGION
                    '''
                }
            }
        }
    }
}
