John Node.js respond service

Example node.js server json response app. Builded with docker, gitlab devops, nodejs. This includes gitlab yaml to automatically trigger once source code push requests are made to github.

Quick setup
    git clone https://github.com/johnny773/test2

For build image
    - docker build -t john/node .

    or pull latest gitlab build image
    - docker pull registry.gitlab.com/johnny773/test2:master

For test run
    docker run -p 49160:8080 -d registry.gitlab.com/johnny773/test2:master

After run
    open browser address http://localhost:49160/status

Gitlab CI Environments
    DOCKER_HOST: tcp://docker:2375
    DOCKER_DRIVER: overlay2
    CONTAINER_IMAGE: $CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG
    dockerTag: '$CI_BUILD_REF'

The Gitlab yaml pipeline is defined in two job functions the first job to build and stage the node.js docker image and the second stage to run tests and verify image. Execution is run as docker in docker.

Gitlab test through healthcheck curl request, the output of the healthcheck is displayed in gitlab logs. Also local mount on filesystem is referenced from the docker run command to output test results.

Gitlab tested builds from the pipeline are pushed to gitlab container registry and tagged with commit ref.

Additional enhancements could be to run lint of node code, do vulnerability scans or add mocha unit tests. 
Also currently only the master branch is in use to improve this would recommend gitflow feature>develop>master