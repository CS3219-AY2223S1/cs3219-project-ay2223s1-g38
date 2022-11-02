# Deployment

## Docker Images
Images are at `taubar` account, e.g. user-service image is stored at: https://hub.docker.com/repository/docker/taubar/algohike-user-service

## Setting up a multi-container app with Kubernetes
1. Create deployment file for each service e.g. question-deployment.yaml
2. Create cluster ip service file for each service e.g. question-cluster-ip-service.yaml
3. To apply manifests file, run `kubectl apply -f k8s/manifests`. This create all deployments/services within the folder.

### Special Configurations
For MongoDB and RabbitMQ we need to create PersistentVolumeClaim objects to help store data.

### Creating Secrets
For specific configurations like FIREBASE_PRIVATE_KEY, it should be hidden.

Secrets can be created imperatively using the following format (for single use):
```
kubectl create secret generic <KEY> --from-literal <NAME>=<SECRET_VALUE>
```
* <KEY> is the name used by k8s to know what secret to use. e.g. pgpassword
* <NAME> is the name of the environment variable, e.g. PGPASSWORD.
* <SECRET_VALUE> is the actual value of the environment variable.

If creating a secret from an `.env` file:
```
kubectl create secret generic <SECRET_NAME> --from-env-file=./user-service/.env
```
* <SECRET_NAME> is used by k8s to identify which secret to use.


## Updating Kubernetes deployment images imperatively
1. kubectl set image deployment/<DEPLOYMENT_NAME> <CONTAINER_NAME>=<DOCKER_HUB_IMAGE>:<VERSION>
2. Example: kubectl set image deployment/question-service-deployment question-service=taubar/algohike-question-service:v2  

## Deploying onto production
