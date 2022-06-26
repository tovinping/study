# GIT

## commit后怎么回退
1. git reset [commitId]
2. git reset --soft head^ // --soft保存更改内容(新增文件不会删除),--hard完全回退代码(新增文件也会删除)

## add后怎么回退
1. git reset [file]

# 本地文件修改后还没有add怎么回退
1. git checkout [file]