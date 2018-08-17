## room-grace-scripts

### install
```bash
$ apt-get update
$ apt-get install libfontconfig
$ npm install
```

### usage
```bash
$ npm start
```

### deploy
```bash
$ docker build -t jnuPoster:0.0.1 .
$ docker run -d -e ID=[ID] -e PW=[PW] --name jnuPoster:0.0.1 jnuPoster.0.0.1 /bin/bash -c "npm start"
```