# Usage

### Build gh-service

```
docker build -t gh-service:latest .
```

### Pull postgres image if needed.

```
docker pull postgres:13.7-bullseye

```

### Create containers from root directory

```
docker-compose up --build
```

### Run tests

Enter bash or shell session in service container

```
docker exec -it gh-service-service bash
```

Run tests.

```
./test-server/run-tests.sh
```


### Remove containers when done:

```
docker-compose down
```

# Functions and their return values if request is successful

### createIssue

```
201
```

### getIssueID

```
a string with the issue's issueID
```
### getTsrcID

```
a string with the issue's tsrcID
```
