#!/bin/bash
if ! type pm2 > /dev/null
then
    sudo npm install -g pm2 && pm2 start npm --name "companions-app" -- start
else
    pm2 restart companions-app
fi