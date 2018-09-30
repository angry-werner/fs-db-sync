# fs-db-sync
Synchronizing file system access with db locks doodling around

Starting the local DB in docker: kow@louie:~$ sudo docker run -d --name oracle-db --shm-size=1g -p 1521:1521 -e ORACLE_PWD=kow-init -v /opt/oracle/oradata:/u01/app/oracle/oradata oracle/database:11.2.0.2-xe
