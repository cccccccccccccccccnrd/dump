#!/bin/bash

for f in ./data/n/*.mp4
do
  convert "$f[0]" -resize 33% "$f.png"
done
