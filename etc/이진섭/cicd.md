# 1. ****Install Docker Engine on Ubuntu****

## Uninstall old versions

```docker
$ sudo apt-get remove docker docker-engine docker.io containerd runc
```

## ****Install using the apt repository****

### ****Set up the repository****

1. Update the apt package index and install packages to allow apt to use a repository over HTTPS:

```docker
$ sudo apt-get update
$ sudo apt-get install \
    ca-certificates \
    curl \
    gnupg
```

1. Add Docker’s official GPG key:

```docker
$ sudo install -m 0755 -d /etc/apt/keyrings
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
$ sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

1. Use the following command to set up the repository:

```docker
$ echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

## Install Docker Engine

1. Update the apt package index:

```docker
$ sudo apt-get update
```

1. Install Docker Engine, containerd, and Docker Compose.

```docker
$ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

1. Verify that the Docker Engine installation is successful by running the hello-world image:

```docker
$ sudo docker run hello-world
```

# 2. Install Nginx ****on Ubuntu****

```docker
$ sudo apt update
$ sudo apt-get install nginx
```

# 3. Configure SSL Certificate on Nginx

## Install Let’s Encrypt

```docker
$ sudo apt-get install letsencrypt
```

## **Apply certificate and issue .pem key**

```docker
$ sudo letsencrypt certonly --standalone -d k8b205.p.ssafy.io

$ cd /etc/letencrypt/live/k8b205.p.ssafy.io
```

## M**odify the Nginx default configuration file**

```
$ cd /etc/nginx/sites-available

$ sudo vi default
```

### default

```
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        server_name k8b205.p.ssafy.io;

        location / {
                return 301 https://k8b205.p.ssafy.io$request_uri;
        }
}

server {
        listen 443 ssl;
        ssl_certificate /etc/letsencrypt/live/k8b205.p.ssafy.io/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/k8b205.p.ssafy.io/privkey.pem;

        location / {
                proxy_pass http://localhost:3000;
        }

        location /api {
                proxy_pass http://localhost:8080;
        }
}
```

### Restart Nginx

```
$ sudo systemctl resstart nginx

$ sudo systemctl status nginx
```

# 4. Setting up CI/CD pipeline using Jenkins

## Install and run jenkins

```
$ sudo docker pull jenkins/jenkins

$ docker run -p 8080:8080 -p 50000:50000 -v /data/jenkins:/var/jenkins_home [image id]
```