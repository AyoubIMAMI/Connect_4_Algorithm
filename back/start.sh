echo "-------------------- Building the Docker image --------------------"
docker build -f Dockerfile -t connect4 .

echo "-------------------- Up the container --------------------"
docker compose up -d
