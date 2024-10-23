docker_build('fyc-auth', '.', dockerfile="Dockerfile", live_update=[sync("server.js", "/app/server.js")])
k8s_yaml('deployment.yml')
k8s_resource('fyc-auth', port_forwards='8001:3000')
