#!/bin/sh


# shellcheck disable=SC2046
if [ $(id -u) = 0 ]
then
  chown -R liviuxyz:liviuxyz ../Licenta
else
  echo "You must be root to run this command."
fi

#test


