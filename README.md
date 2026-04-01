# Sand Bottle

A real-time interactive system that combines physics simulation, device orientation input, and Arduino-based control.

## Live Demo

https://sonnyyy77.github.io/Sand-Bottle/
> Best experienced on iPhone. Device orientation input may be limited or unavailable on some browsers and devices.

## Overview

Sand Bottle explores how physical movement can directly influence a digital system. By tilting a device, users interact with a simulated environment where particles behave like sand inside a bottle. The project connects physical gestures, sensor data, and real-time simulation into a unified interactive experience.

## Features

- Real-time physics simulation using Matter.js
- Device orientation input for interactive control
- Integration with Arduino for physical input/output
- Live data flow between hardware and browser-based system
- Responsive visual feedback tied to user movement

## System Architecture

The system consists of:

- Frontend: JavaScript + Matter.js for physics simulation and rendering  
- Input: Device orientation data and Arduino sensors  
- Communication: Node-RED / UDP for real-time data transmission  
- Output: Visual simulation responding instantly to user interaction  

## Interaction

Users tilt or move the device to control the direction and behavior of particles. The system continuously reads input data and updates the simulation in real time, creating a direct connection between physical action and digital response.

## Tech Stack

- JavaScript  
- Matter.js  
- Node-RED  
- Arduino  
- UDP communication  

## Notes

This project focuses on building a responsive system where physical input, computation, and visual output are tightly coupled. It is less about a fixed interface and more about behavior emerging through interaction.
