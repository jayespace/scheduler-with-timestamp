FROM golang:alpine AS builder
WORKDIR /app
COPY . .
# RUN go mod tidy
RUN go get -u -d -v ./...
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -ldflags '-s -w' -o main ./cmd/main.go

FROM scratch
COPY --from=builder ./app /
EXPOSE 8080
CMD ["/main"]