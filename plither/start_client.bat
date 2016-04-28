@echo off
echo [BATCH] Starting Client
:loop
   cls
   node ./src/index.js
   echo -------------------------------------------------------
   echo [BATCH] Client Shutdown, waiting 15 seconds before a restart.
   timeout /t 15 > nul
   goto loop