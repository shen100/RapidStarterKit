# consul-cluster
`consul-cluster` 可以快速启动3个server组成的cluster集群，以及运行2个`consul client`

| Consul | IP |
| ------- | ------- |
| Server1| 172.16.10.11 |
| Server2 | 172.16.10.12 |
| Server3 | 172.16.10.13 |
| Client1 | 172.16.10.21 |
| Client2 | 172.16.10.22 |

进入`consul-cluster`目录, 运行 `docker-compose up -d`