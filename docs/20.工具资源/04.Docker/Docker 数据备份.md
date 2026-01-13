---
categories:
- 工具资源
- Docker
coverImg: /home/bg22.webp
date: 2025-08-23 00:38:12
permalink: /Tool/Docker/backups
title: Docker 数据备份
---
## 背景

服务器到期前需备份 Docker 数据，分别备份容器文件系统与数据卷，或把容器保存成镜像备份

## 创建备份目录

```bash
mkdir -p /root/docker_backups  # 在/root下创建备份文件夹
```

## 备份所有容器（二选一）

::: code-group
```bash [导出容器文件系统（推荐，保留容器当前状态）]
# 批量导出所有容器到/root/docker_backups目录
for container in $(docker ps -aq --format "{{.Names}}"); do
  echo "备份容器: $container"
  docker stop $container  # 停止容器确保数据一致性
  docker export $container -o /root/docker_backups/${container}_backup.tar
  docker start $container  # 重启容器
done
```
```bash [保存为镜像（包含完整镜像层，体积可能较大）]
# 批量将容器保存为镜像并导出
for container in $(docker ps -aq --format "{{.Names}}"); do
  echo "备份容器为镜像: $container"
  docker commit $container backup_$container
  docker save -o /root/docker_backups/${container}_image.tar backup_$container
done
```
::: 

## 备份数据卷

针对使用数据卷的容器（如数据库），需单独备份数据卷：

```bash
# 备份所有数据卷
for volume in $(docker volume ls --format "{{.Name}}"); do
  echo "备份数据卷: $volume"
  docker run --rm -v $volume:/source -v /root/docker_backups:/backup alpine \
  tar czvf /backup/volume_${volume}.tar /source
done
```

## 备份容器配置信息

```bash
docker inspect $(docker ps -aq) > /root/docker_backups/all_containers_config.json
```

## 完成后检查

备份完成后，查看 /root/docker_backups 目录确认文件是否生成：

```bash
ls -lh /root/docker_backups
```

输出：

```bash
-rw------- 1 root root 263M 8月  23 00:28 03457273992e_backup.tar
-rw------- 1 root root 422M 8月  23 00:28 0500bf48fe6c_backup.tar
-rw------- 1 root root 1.1G 8月  23 00:28 1d51813500da_backup.tar
-rw------- 1 root root  19M 8月  23 00:30 451bd1f59a6b_backup.tar
-rw------- 1 root root 718M 8月  23 00:30 a4922a7e728c_backup.tar
-rw------- 1 root root 319M 8月  23 00:29 c3d0d0806b52_backup.tar
-rw------- 1 root root  62M 8月  23 00:27 d9b6dd07df80_backup.tar
-rw------- 1 root root 290M 8月  23 00:29 dc43659872fe_backup.tar
-rw-r--r-- 1 root root   92 8月  23 00:32 volume_3c39113c1fbbff9879cfb256aed8f11c40c9c0a77b1879075916fe28fa66c37f.tar
-rw-r--r-- 1 root root   96 8月  23 00:32 volume_4c05d8dabaf33486c65d4b63b4a79b620ce6db76e347e7ebc1ef8298a3c15c6a.tar
-rw-r--r-- 1 root root   91 8月  23 00:32 volume_7eeb232fb7e46d3397bdc2b758cd8a8c5e0279db229b419507adeac0f82351ea.tar
-rw-r--r-- 1 root root 1.3M 8月  23 00:32 volume_8f36307dd83e4e6ba75608645cfa964e8b316cd74aec9797e30dea80fc07585d.tar
-rw-r--r-- 1 root root  14K 8月  23 00:32 volume_adf84cc961f5bfa3624b8bdc78e163b93b0f5ac0576de5311078465ebc703a5a.tar
-rw-r--r-- 1 root root   91 8月  23 00:32 volume_bca1143de5742bbf59b2b445139d201b905900e3058e19ac80619e66ff9480af.tar
-rw-r--r-- 1 root root   92 8月  23 00:32 volume_e1263790b85b0407e48bd893e67af8739834e0544aac43017654fe38798c8ee7.tar
-rw-r--r-- 1 root root   91 8月  23 00:32 volume_f683b163d2215fbc7fe2c2a8de47e3638c851840cb9b47b440951c26ddc68eaf.tar
-rw-r--r-- 1 root root  35M 8月  23 00:32 volume_umami_umami-db-data.tar
-rw-r--r-- 1 root root  28M 8月  23 00:32 volume_uptime-kuma.tar
-rw-r--r-- 1 root root  82K 8月  23 00:33 容器配置信息-all_containers_config.json
```

## 恢复备份的数据

### 将备份的数据恢复到新服务器上

需要分步骤还原容器、镜像和数据卷。

以下是详细的恢复流程：将备份文件传输到新服务器用 scp 或 rsync 将旧服务器 /root/docker_backups 目录下的所有文件传到新服务器的相同路径（如 /root/docker_backups）

```bash
# 在本地或旧服务器执行，将备份文件传到新服务器
scp -r /root/docker_backups root@新服务器IP:/root/
```
### 在新服务器安装 Docker

确保新服务器已安装 Docker，若未安装，以 Ubuntu 为例：

```bash
apt update && apt install -y docker.io
systemctl start docker && systemctl enable docker
```

### 恢复步骤

1. 恢复数据卷（优先操作，因为容器可能依赖数据卷）
如果之前备份了数据卷（volume_*.tar 文件），先恢复数据卷：

```bash
# 进入备份目录
cd /root/docker_backups

# 遍历所有数据卷备份文件并恢复
for vol_tar in $(ls volume_*.tar); do
  # 提取数据卷名称（去掉"volume_"前缀和".tar"后缀）
  vol_name=$(echo $vol_tar | sed 's/volume_//;s/.tar//')
  
  # 创建同名数据卷
  docker volume create $vol_name
  
  # 将备份内容恢复到数据卷
  docker run --rm -v $vol_name:/target -v $(pwd):/backup alpine \
  sh -c "tar xzvf /backup/$vol_tar -C /target --strip-components 1"
  
  echo "已恢复数据卷: $vol_name"
done
```

2. 恢复容器（两种方式对应之前的备份方式）
方式一：从容器导出文件（*_backup.tar）恢复
如果之前用 docker export 备份（文件名为 容器名_backup.tar）：

```bash
# 遍历所有容器备份文件
for container_tar in $(ls *_backup.tar); do
  # 提取容器名（去掉"_backup.tar"后缀）
  container_name=$(echo $container_tar | sed 's/_backup.tar//')
  
  # 导入为镜像
  docker import /root/docker_backups/$container_tar $container_name:restored
  
  # 查看原容器配置（端口、数据卷等），根据需要创建容器
  # 示例：若原容器有端口映射和数据卷，需手动指定（可参考 all_containers_config.json）
  docker run -d --name $container_name \
    -p 原端口映射（如3001:3001） \
    -v 数据卷名:容器内路径（如umami_data:/var/lib/postgresql/data） \
    $container_name:restored
  
  echo "已恢复容器: $container_name"
done
```

方式二：从镜像备份（*_image.tar）恢复
如果之前用 docker save 备份镜像（文件名为 容器名_image.tar）：

```bash
# 遍历所有镜像备份文件
for image_tar in $(ls *_image.tar); do
  # 提取镜像名（去掉"_image.tar"后缀）
  image_name=$(echo $image_tar | sed 's/_image.tar//')
  
  # 加载镜像
  docker load -i /root/docker_backups/$image_tar
  
  # 查看原容器配置，创建容器（参考 all_containers_config.json 中的参数）
  docker run -d --name $image_name \
    -p 原端口映射 \
    -v 数据卷名:容器内路径 \
    backup_$image_name  # 镜像名与备份时一致（backup_容器名）
  
  echo "已恢复容器: $image_name"
done
```

3. 检查恢复结果

```bash
#查看所有容器是否正常运行
docker ps -a
```

关键注意事项

- 容器配置还原：all_containers_config.json 保存了原容器的详细配置（端口、环境变量、数据卷挂载等），恢复时需对照配置手动指定参数（尤其是端口映射和数据卷）。

- 依赖顺序：若容器有依赖关系（如应用依赖数据库），需按顺序启动（先启动数据库，再启动应用）。

- 权限问题：恢复后若出现权限错误，可通过 chown 或在 docker run 时添加 --user 参数调整权限。