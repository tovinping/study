#!/bin/bash

/usr/local/mysql/bin/mysqldump -u用户名 -p密码 数据库名 > /home/backup/数据库名_$(date +%Y%m%d_%H%M%S).sql

/usr/local/mysql/bin/mysqldump -u用户名 -p密码 数据库名 | gzip > /home/backup/数据库名_$(date +%Y%m%d_%H%M%S).sql.gz
