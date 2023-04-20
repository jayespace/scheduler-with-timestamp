FROM golang:alpine AS builder
RUN apk update && \
    apk add --no-cache ca-certificates && \
    apk add --update-cache tzdata && \
    update-ca-certificates
WORKDIR /app
COPY . .
RUN go get -u -d -v ./...
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -ldflags '-s -w' -o main ./cmd/main.go

FROM scratch
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /usr/local/go/lib/time/zoneinfo.zip /usr/local/go/lib/time/zoneinfo.zip
COPY --from=builder ./app /
ENV TZ=Asia/Seoul
EXPOSE 8080
CMD ["/main"]