#!/bin/bash

image_name=$1

if [ -z "${image_name}" ]
then
  echo "Image name is required."
  exit 0
fi

images=$(docker images --format '{{.Repository}}:{{.Tag}}' | grep "${image_name}")

if [ -z "${images}" ] 
then
  echo "No image found."
  exit 0
fi

printf "These images will be deleted: \n${images}\n"

read -r -p "Are you sure? [y/N] " response
case "${response}" in
    [yY][eE][sS]|[yY]) 
        docker rmi ${images}
        ;;
    *)
        exit 0
        ;;
esac

