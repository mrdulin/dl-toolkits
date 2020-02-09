#!/bin/bash
K8S_PATH=$PWD/k8s
FILE_NAME=cronjob.yaml

check_dir_exist() {
  local dir=$1
  if [ ! -d "${dir}" ] 
  then
    echo "Directory ${dir} DOES NOT exist"
    return 1
  fi
  return 0
}

check_arguments() {
  local env=$1
  local env_names=$2
  if [ -z "${env}" ]; 
  then 
    echo "No environment argument passed"
    return 1
  fi

  if [[ ! "${env_names[*]}" == *"${env}"* ]]
  then
    echo "Environment argument should be one of (${env_names[@]})"
    return 1
  fi

  return 0
}


get_dir_names_by_path() {
  local dir_path=$1
  local dir_names=()
  for d in $dir_path/**; do
    if [ -d "$d" ]; then
      local dir_name=$(basename $d)
      dir_names+=("${dir_name}")
    fi
  done
  echo ${dir_names[@]}
}

check_exit() {
  if [ $? -eq 1 ] 
  then 
    exit $?
  fi
}

remove_old_file() {
  local file=$1
  if [ -e "${file}" ]
  then 
    rm "${file}"
  fi
}

concat_all() {
  local source=$1
  local dest=$2

  cat ${source} > ${dest}
}

main() {
  local env_names=$(get_dir_names_by_path "${K8S_PATH}")
  local env=$1
  # echo ${env_names[@]}

  check_dir_exist "${K8S_PATH}"
  check_arguments "${env}" "${env_names}"
  check_exit 
  check_dir_exist "${K8S_PATH}/${env}"  
  check_exit
  remove_old_file "${K8S_PATH}/${env}/${FILE_NAME}"
  concat_all "${K8S_PATH}/${env}/*" "${K8S_PATH}/${env}/${FILE_NAME}"
}

main $1




