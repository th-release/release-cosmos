FROM golang:1.24-alpine AS builder

WORKDIR /app

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY . .

RUN go build -o /released ./cmd/released/main.go

FROM alpine:latest

WORKDIR /app

COPY --from=builder /released ./

CMD ["./released"]