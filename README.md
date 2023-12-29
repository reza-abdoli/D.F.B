# Getting Started 
* ## [Overview](#video)
* ## Installing Docker Compose
    If you have already installed Docker, skip this section; if not, continue with the following steps:
  
    Install Docker Engine on Ubuntu from [Docker Docs](https://docs.docker.com/engine/install/ubuntu/).
           
    Enter `docker compose version` to ensure Docker is installed correctly. If not, try reinstalling.

* ## Freeing Up Occupied Ports (Linux/Ubuntu)

    In the project, the following ports are used:
    | Port | Service |
    |------|---------|
    | 80   | Nginx   |
    | 6379 | Redis   |
    | 3060 | Node    |
    | 3061 | Go      |

    To run the project successfully, free up the ports:
    * ## Installing Netstat
        Install netstat from [Cyberithub](https://www.cyberithub.com/how-to-install-netstat-on-ubuntu-20-04-lts-focal-fossa/).
        
        `netstat --version` should return something like:
        ```
        net-tools 2.10-alpha
        Fred Baumgarten, Alan Cox, Bernd Eckenfels, Phil Blundell, Tuan Hoang, Brian Micek and others
        +NEW_ADDRT +RTF_IRTT +RTF_REJECT +FW_MASQUERADE +I18N +SELINUX
        AF: (inet) +UNIX +INET +INET6 +IPX +AX25 +NETROM +X25 +ATALK +ECONET +ROSE -BLUETOOTH
        HW:  +ETHER +ARC +SLIP +PPP +TUNNEL -TR +AX25 +NETROM +X25 +FR +ROSE +ASH +SIT +FDDI +HIPPI +HDLC/LAPB +EUI64 
        ```

    Enter `sudo netstat -tulpn`, and if none of the above ports are occupied, skip this section. If not, try 
    ```
    sudo lsof -i:<port>
    ```
    to see the process ID occupying the port, and then try to kill it using
    ```
    sudo kill -9 <process_id>
    ```
    If the above approach does not work, try the following commands:
    ```
    /etc/init.d/redis-server stop
    sudo /etc/init.d/apache2 stop
    ```

* ## Running the Project
    Run
    ```
    docker-compose up --build
    ```
    and then open `http://localhost`. 

# Video
[video.webm](https://github.com/reza-abdoli/D.F.B/assets/142052182/99fa45e9-3872-407a-925f-234b44b7e812)
