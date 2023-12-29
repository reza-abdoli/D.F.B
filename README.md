# Getting Started 
* ## [Overview](#video)
* ## Installing docker compose
    if you have already installed docker skip this section if not keep on continuing
  
    Install Docker Engine on Ubuntu from [docker docks](https://docs.docker.com/engine/install/ubuntu/)
           
    enter `docker compose version` to make sure docker has installed correctly otherwise try reinstalling

* ## Freeing up occupied ports (Linux/Ubuntu)

    in the project the ports below have got used:
    | Port | Service |
    |------|---------|
    | 80 | nginx |
    | 6379 | redis |
    | 3060 | node |
    | 3061 | go |

    to run the project successfuly we have to free up the ports:
    * ## installing netstat
        install netstat from [cyberithub](https://www.cyberithub.com/how-to-install-netstat-on-ubuntu-20-04-lts-focal-fossa/)
        
        `netstat --version` must return something like:
        ```
        net-tools 2.10-alpha
        Fred Baumgarten, Alan Cox, Bernd Eckenfels, Phil Blundell, Tuan Hoang, Brian Micek and others
        +NEW_ADDRT +RTF_IRTT +RTF_REJECT +FW_MASQUERADE +I18N +SELINUX
        AF: (inet) +UNIX +INET +INET6 +IPX +AX25 +NETROM +X25 +ATALK +ECONET +ROSE -BLUETOOTH
        HW:  +ETHER +ARC +SLIP +PPP +TUNNEL -TR +AX25 +NETROM +X25 +FR +ROSE +ASH +SIT +FDDI +HIPPI +HDLC/LAPB +EUI64 
        ```

    enter `sudo netstat -tulpn` and if none of the above ports were occupied skip this section, if not try 
    ```
    sudo lsof -i:<port>
    ```
    to see process ID which is occuping the port and then try to kill it via
    ```
    sudo kill -9 <process_id>
    ```
    if the above approach does not try the following commands:
    ```
    /etc/init.d/redis-server stop
    sudo /etc/init.d/apache2 stop
    ```

* ## Running the project
    run
    ```
    docker-compose up --build
    ```
    and then open `http://localhost` 

# video
[video.webm](https://github.com/reza-abdoli/vvvvvv/assets/142052182/b1232105-6254-403f-89cc-6d3b7ca23fbe)

