# Overview

Image manipulation tool that allows users to resize images and reuse the resized image as a placeholder

# Usage

1. Copy images you want to manipulate to the project directory "assets/src"
2. Start the project by typing "npm run start" in your terminal

- Open up http://localhost:8080/api/img/?filename={your filename} to open an image

- http://localhost:8080/api/img/?filename={your filename}&width={ width }&height={ height } add custom width and height to resize the image

exampe:
http://localhost:8080/api/img/?filename=fjord.jpg&width=100&height=100

- http://localhost:8080/api/img/?filename={your filename}&width={ width }&height={ height }&top={ top }&left={left} add custom top and left to crop the image

exampe:
http://localhost:8080/api/img/?filename=fjord.jpg&width=100&height=100&top=100&left=200

- http://localhost:8080/api/img/?filename={your filename}&grayscale={ any number } apply grayscale filter on image

example:
http://localhost:8080/api/img/?filename=fjord.jpg&grayscale=1

you can merge between two functionality
- http://localhost:8080/api/img/?filename={your filename}&width={ width }&height={ height }&top={ top }&left={left}&grayscale={ any number }
add custom top and left to crop the image with scalegray

example:
http://localhost:8080/api/img/?filename=fjord.jpg&width=500&height=500&top=100&left=200&grayscale=1

Go to http://localhost:8080 to list all of your images

# Functionality

1. API Placeholder
2. Image Scaling
3. Image Cropping
4. Image Grayscale

# Scripts

Starting

> npm run start

Testing

> npm run test

Building

> npm run build
