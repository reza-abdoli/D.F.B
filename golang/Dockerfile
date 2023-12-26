FROM golang:1.21.4


# Set necessary environmet variables needed for our image

# Move to working directory /build
WORKDIR /app

# Copy and download dependency using go mod
COPY . .
#COPY go.mod .
#COPY go.sum .
#COPY main.go .
RUN go get
RUN go mod download

# Copy the code into the container
#

# Build the application
RUN go build -o bin .

# Move to /dist directory as the place for resulting binary folder
#WORKDIR /dist

# Copy binary from build to main folder
#RUN cp /build/main .
EXPOSE 3061

# Command to run when starting the container
ENTRYPOINT ["/app/bin"]