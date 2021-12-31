# Getting `Error: ECONNRESET read` while trying to connect to a Selenium Standalone running on a Docker container on Windows 10 host.
To reproduce this bug, there should be a Docker container running on a Windows Host machine. Moreover, there is a Node.js file in this repository that reproduces this bug. I have provided the step-by-step explanation of how to setup the environment and reproduce this bug further in this document.

## Required Technologies:
- Windows 10 Operation System as a Docker host
- VcXsrv to share the display with a Docker container from a Windows host
- Docker Engine with WSL

## Step 1 (Install VcXsrv and configure it)
Please refer to [this blog](https://dev.to/darksmile92/run-gui-app-in-linux-docker-container-on-windows-host-4kde) under the (Install VcXsrv and configure it) section and do all the steps as said.

## Step 2 (Run the Docker container):
`docker run -it -p <YOUR HOST PORT>:4444 -e DISPLAY=<YOUR HOST IP ADDRESS>:0.0 -v c:/tmp/X11-unix:/tmp/.X11-unix redbolder/selenium_standalone_firefox_centos`
- Replace the `<YOUR HOST IP ADDRESS>` with your ip that you can find using `ipconfig` output from your command prompt.
- Replace the `<YOUR HOST PORT>` with an unused port that (e.g: 4444, 4445).

## Step 3 (Connect to the Selenium Server via running run.js)
```
npm init -y
npm install
node run.js
```

## Expected Behaviour:
- The URL `http://localhost:<YOUR HOST PORT>` will be reachable without any issue (The Selenium Standalone server runs without any error).
- The Selenium Server will have no reaction after running the run.js (Node.js script).
- No browser instances (sessions) will be created.
- run.js will throw an error very similar to this (Same Error Name):
```
ECONNRESET read ECONNRESET
    at ClientRequest.<anonymous> (C:\path-to-my-script\node_modules\selenium-webdriver\http\index.js:297:15)
    at ClientRequest.emit (events.js:400:28)
    at Socket.socketErrorListener (_http_client.js:475:9)
    at Socket.emit (events.js:400:28)
    at emitErrorNT (internal/streams/destroy.js:106:8)
    at emitErrorCloseNT (internal/streams/destroy.js:74:3)
    at processTicksAndRejections (internal/process/task_queues.js:82:21)
```
*Be aware that the error will be visible from the console after a few seconds.*
### Important Notes to take into Consideration:
1. This bug only exists on Windows as a Docker host. Meaning, there are now issues while running this container on a Linux Docker host.
2. This bug does not exist for other Webdrivers such as: PHP Webdriver available at [this github link](https://github.com/php-webdriver/php-webdriver)
