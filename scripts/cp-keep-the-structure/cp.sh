#!/bin/bash

## 
# copy specific files and preserve the directory structure
## 
rm -rf ./dist \
&& mkdir dist \
&& find ./src -name '*.js' -exec rsync -R '{}' ./dist \;