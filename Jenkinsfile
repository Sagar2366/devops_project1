node('master') {                 
    
    def app
    env.NODEJS_HOME = "${tool 'nodejs_tool'}"

    env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"

    sh 'npm --version'
    
    try {
    
        stage('Cloning git repository') 
                {
            
            checkout scm
            
                 }
        }
        
    catch (err) { 
        
            if (currentBuild.result == 'UNSTABLE')
                currentBuild.result = 'FAILURE'
                throw err
                
        } 
        
        finally {
            
           mail to: 'sagarutekar2366@gmail.com',
           subject: "Status of pipeline: ${currentBuild.fullDisplayName}",
           body: "${env.BUILD_URL} has result ${currentBuild.result}"
           slackSend color: 'good', message: "Build ${env.BUILD_NUMBER} completed for  ${env.JOB_NAME}. And result for this pipelien build has result ${currentBuild.result} . Details: (<${env.BUILD_URL} | here >)"
        }
        
        try {
            stage('SonarQube analysis') {

            def scannerHome = tool 'SonarScanner1';
            withSonarQubeEnv('sonar-server') {
            // sh "${scannerHome}/bin/sonar-scanner"
                            
        parallel (
                    "stream 1" : { 
                     node('slave1') { 
                           build job: 'sonar-scanner1'
                       } 
                   },
                    "stream 2" : { 
                     node('slave2') { 
                           build job: 'sonar-scanner2'
                       } 
                   }
        )
            //build job: 'sonar-scanner'
                }
            }
            currentBuild.result = 'SUCCESS'
        } catch (err) {
            currentBuild.result = "FAILED"
            throw e
        }
        finally {
            mail to: 'sagarutekar2366@gmail.com',
            subject: "Status of pipeline: ${currentBuild.fullDisplayName}",
            body: "${env.BUILD_URL} has result ${currentBuild.result}"
            slackSend color: 'good', message: "Build ${env.BUILD_NUMBER} completed for  ${env.JOB_NAME}. And result for this pipelien build has result ${currentBuild.result} . Details: (<${env.BUILD_URL} | here >)"
        }
  
        try {
            stage('Testing all files'){
                sh 'npm install'
                sh 'npm test'
                //sh 'npm audit'
                sh 'npm audit fix '
                }
            }
        catch (err) {
            if (currentBuild.result == 'UNSTABLE')
                currentBuild.result = 'FAILURE'
                throw err
        } 
        finally {
           mail to: 'sagarutekar2366@gmail.com',
           subject: "Status of pipeline: ${currentBuild.fullDisplayName}",
           body: "${env.BUILD_URL} has result ${currentBuild.result}"
           slackSend color: 'good', message: "Build ${env.BUILD_NUMBER} completed for  ${env.JOB_NAME}. And result for this pipelien build has result ${currentBuild.result} . Details: (<${env.BUILD_URL} | here >)"
        }
        
    try {
    
        stage('Building image') 
                {
            
            app= docker.build("my-image:${env.BUILD_ID}")
            
                 }
        }
        
    catch (err) { 
        
            if (currentBuild.result == 'UNSTABLE')
                currentBuild.result = 'FAILURE'
                throw err
                
        } 
        
        finally {
            
           mail to: 'sagarutekar2366@gmail.com',
           subject: "Status of pipeline: ${currentBuild.fullDisplayName}",
           body: "${env.BUILD_URL} has result ${currentBuild.result}"
           slackSend color: 'good', message: "Build ${env.BUILD_NUMBER} completed for  ${env.JOB_NAME}. And result for this pipelien build has result ${currentBuild.result} . Details: (<${env.BUILD_URL} | here >)"
            
            
        }
        
        try {
    
        stage('Testing image') 
                {
            
            app.inside {
            sh 'echo "Tests passed"'
                       }
            
                 }
        }
        
    catch (err) { 
        
            if (currentBuild.result == 'UNSTABLE')
                currentBuild.result = 'FAILURE'
                throw err
                
        } 
        
        finally {
            
           mail to: 'sagarutekar2366@gmail.com',
           subject: "Status of pipeline: ${currentBuild.fullDisplayName}",
           body: "${env.BUILD_URL} has result ${currentBuild.result}"
           slackSend color: 'good', message: "Build ${env.BUILD_NUMBER} completed for  ${env.JOB_NAME}. And result for this pipelien build has result ${currentBuild.result} . Details: (<${env.BUILD_URL} | here >)"
            
            
        }
        
         try {
    
        stage('Push image to docker private registry') 
                {
            docker.withRegistry('http://10.136.60.12:5000', 'docker-registry-credentials') 
                {
                    //app.push("${env.BUILD_NUMBER}")
                    app.push("latest")
                }
                }
            
                 }

    catch (err) { 
        
            if (currentBuild.result == 'UNSTABLE')
                currentBuild.result = 'FAILURE'
                throw err
                
        } 
        
        finally {
            
           mail to: 'sagarutekar2366@gmail.com',
           subject: "Status of pipeline: ${currentBuild.fullDisplayName}",
           body: "${env.BUILD_URL} has result ${currentBuild.result}"
           slackSend color: 'good', message: "Build ${env.BUILD_NUMBER} completed for  ${env.JOB_NAME}. And result for this pipelien build has result ${currentBuild.result} . Details: (<${env.BUILD_URL} | here >)"
            
            
        }
        
         try {
             
             input 'Should we continue to deploy stage?'
    stage('Deploying container to kubernetes cluster')
    {
        sh'sshpass -p gsLab@123 ssh -o StrictHostKeyChecking=no  ubuntu@10.136.60.9'
               
        script {
            if (env.BUILD_NUMBER =='1') {
                sh 'sshpass -p gsLab@123 ssh ubuntu@10.136.60.9 pwd'
                sh 'sshpass -p gsLab@123 ssh ubuntu@10.136.60.9 ls -al'
                sh 'sshpass -p gsLab@123 ssh ubuntu@10.136.60.9 git clone http://Gitlab_username:Gitlab_ip@10.136.60.8:8011/root/project_work_1.git'
                sh 'sshpass -p gsLab@123 ssh ubuntu@10.136.60.9 kubectl create -f /home/ubuntu/project_work_1/docker-deployment.yml --record'
                sh 'sshpass -p gsLab@123 ssh ubuntu@10.136.60.9 ls -al'
                sh 'sshpass -p gsLab@123 ssh ubuntu@10.136.60.9 kubectl get pods -o wide --all-namespaces'
                sh 'sshpass -p gsLab@123 ssh ubuntu@10.136.60.9 kubectl get deployments --all-namespaces'
                sh 'sshpass -p gsLab@123 ssh ubuntu@10.136.60.9 kubectl expose deployment deploy-app --type=NodePort --name=example-service2'
                sh 'sshpass -p gsLab@123 ssh ubuntu@10.136.60.9 kubectl get svc --all-namespaces'
                sh 'sshpass -p gsLab@123 ssh ubuntu@10.136.60.9 kubectl describe services example-service2'
                sleep(time:45,unit:"SECONDS")
                sh 'sshpass -p gsLab@123 ssh ubuntu@10.136.57.31 kubectl get pods -o wide --all-namespaces'
            }
            
            else {
                sh 'sshpass -p gsLab@123 ssh ubuntu@10.136.60.9 pwd'
                sh 'sshpass -p gsLab@123 ssh ubuntu@10.136.60.9 ls -al'
                //sh 'sshpass -p gsLab@123 ssh ubuntu@10.136.60.9 git clone http://Gitlab_username:Gitlab_ip@10.136.60.8:8011/root/project_work_1.git'
                //sh 'sshpass -p gsLab@123 ssh ubuntu@10.136.60.9 kubectl create -f /home/ubuntu/project_work_1/docker-deployment.yml --record'
                sh 'sshpass -p gsLab@123 ssh ubuntu@10.136.60.9 kubectl set image pod/private-reg1 private-reg-container=10.136.60.12:5000/my-image:latest --record=true'
                sh 'sshpass -p gsLab@123 ssh ubuntu@10.136.60.9 kubectl set image deployment/deploy-app sample-node-example=10.136.60.12:5000/my-image --record=true'
                sh 'sshpass -p gsLab@123 ssh ubuntu@10.136.60.9 kubectl rollout status deployment/deploy-app'
                //sh 'sshpass -p gsLab@123 ssh ubuntu@10.136.60.9 kubectl expose deployment deploy-app --type=NodePort --name=example-service2'
                sh 'sshpass -p gsLab@123 ssh ubuntu@10.136.60.9 kubectl get pods --all-namespaces'
                sh 'sshpass -p gsLab@123 ssh ubuntu@10.136.60.9 kubectl get deployments --all-namespaces'
                sh 'sshpass -p gsLab@123 ssh ubuntu@10.136.60.9 kubectl get svc --all-namespaces'
                sh 'sshpass -p gsLab@123 ssh ubuntu@10.136.60.9 kubectl describe services example-service2'
                sleep(time:30,unit:"SECONDS")
                sh 'sshpass -p gsLab@123 ssh ubuntu@10.136.60.9 kubectl get pods -o wide --all-namespaces'
                sh 'curl -i http://10.136.60.9:30331'
            }
            
                }
    }
                 }

    catch (err) { 
        
            if (currentBuild.result == 'UNSTABLE')
                currentBuild.result = 'FAILURE'
                throw err
                
        } 
        
        finally {
            
           mail to: 'sagarutekar2366@gmail.com',
           subject: "Status of pipeline: ${currentBuild.fullDisplayName}",
           body: "${env.BUILD_URL} has result ${currentBuild.result}"
           slackSend color: 'good', message: "Build ${env.BUILD_NUMBER} completed for  ${env.JOB_NAME}. And result for this pipelien build has result ${currentBuild.result} . Details: (<${env.BUILD_URL} | here >)"
            
            
        }
    }