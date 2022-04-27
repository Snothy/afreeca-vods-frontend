# Lightweight afreeca client

## About
React application with custom class based components as a frontend for https://github.com/Snothy/afreeca-vods-backend. Most important documentation is present on that repo.</br> 
Live preview available at: https://afreeca-vods-frontend.vercel.app/. - turned off due to some people abusing it & collecting some weird vods :)</br> </br>
!!!!DISCLAIMER </br>
MOST of the styling has been done using AfreecaTVs existing css files. I take no credit for any of it. I prefer to focus on the functionality aspect of an application when working on personal projects, so I decided to use their existing styles. Plus I fancy their css.

## Features
- Browsing top livestreams
- Logging in
- Watching livestreams & using the chat
- Watching streamer vods 

## Installation
Use `npm i` or `npm install` to install all dependencies.
The backend url should be provided as an environment variable named `REACT_APP_backend_url` in the format of http/s://URL:PORT/api/. It can also be manually set inside of `/src/config.js`.

## Usage
Use either `npm run build` & serve the application or `npm start`.

## Issues / Future plans
1. Livestream bufferring
- Due to an origin CORS block from their servers, I had to set up a proxy to access the data. However, this for some reason slows down the download speed for each ~2MB segment by a lot (from 700ms to 2.2seconds), which causes a LOT of bufferring. There is no CORS block on the vod segments and they download at a normal speed, so I'm going to assume my proxy wasn't setup correctly & is causing a significant slowdown.
2. Incompatible with mobile interface
- The app has been primarily optimized for 1080p & 720p. I am planning on making the content adapt to different resolutions / windows sizes.
3. Multiple segments per vod
- Currently, each vod may consist of multiple m3u8 playlists. Afreeca, from what I've gathered so far, uses a custom in-house built video player that dynamically loads each new playlist by keeping track of when the current playlist will end. I did a lot of searching, but couldn't find any publicly available tools that perform this task, so I might build my own solution using hls. That along with previews when hovering over the timeline, as they already have a system in place for showing timestamped vod content. </br>
The current system of manually selecting each segment was inspired by bilibili, as they separate long vods into multiple sections.
4. Resolution change on vod/livestreams
- Setting up a master m3u8 playlist to dynamically change the resolution is pretty easy to do and will come in a future update. Currently the default is source (or highest available) resolution, but I will most likely only implement this if I develop my own video player.
5. Scale / user management system
- As of now, the project is built with a single user in mind with a very clunky authentication system, where the program simply holds the cookie from the login procedure and uses it when making requests to Afreeca's servers. There are currently no plans on scaling this up to support multiple users, each with their own individual section of favourite streamers. This is more of a proof of concept & for-fun project.
