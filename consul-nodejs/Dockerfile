FROM node:18.16.0

COPY . /tmp/

WORKDIR /consul/

RUN mkdir -p /consul/data && \
    mkdir -p /consul/config && \
    mkdir -p /consul/log && \
    cd /tmp && \
    unzip consul_1.15.1_linux_arm64.zip && \
    mv consul /usr/bin/consul && \
    cd /consul

EXPOSE 8300
EXPOSE 8301
EXPOSE 8302
EXPOSE 8500
EXPOSE 8600

ENTRYPOINT ["consul", "agent", "-config-dir=/consul/config"]


