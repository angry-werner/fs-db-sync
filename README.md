# fs-db-sync
Synchronizing file system access with db locks doodling around

Starting the local Oracle DB in docker:
  sudo docker run -d --name oracle-db --shm-size=1g -p 1521:1521 -e ORACLE_PWD=kow-init -v /opt/oracle/oradata:/u01/app/oracle/oradata oracle/database:11.2.0.2-xe

Starting local Redis in docker:
  sudo docker run --name redis-db -d -p 6379:6379 -v /opt/redis/data:/data redis:4.0.11-stretch redis-server --appendonly yes

  sudo docker exec -it redis-db /bin/bash

sudo docker volume create portainer_data
  sudo docker run --rm httpd:2.4-alpine htpasswd -nbB admin '1234init' | cut -d ":" -f 2
  sudo docker run -d -p 9000:9000 --name portainer --restart always --privileged -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer:latest --admin-password '$2y$05$R9EE4/QlTz6J8fpbeNXoVepodRAuuWLXfE3Lsj3sZa/9qV952p.Wa'
