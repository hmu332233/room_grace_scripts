FROM node:8
MAINTAINER minung.han(hmu332233@gmail.com)

# libfontconfig 설치
RUN apt-get update
RUN apt-get install libfontconfig

# /app 디렉토리 생성
RUN mkdir -p /app
# /app 디렉토리를 WORKDIR 로 설정
WORKDIR /app
# 현재 Dockerfile 있는 경로의 모든 파일을 /app 에 복사
ADD . /app
# npm install 을 실행
RUN npm install