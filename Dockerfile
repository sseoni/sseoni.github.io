# Base image
FROM python:3.12-slim

# Install system package
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential git && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Working directory
WORKDIR /app

# Install python package
RUN pip install --no-cache-dir jupyter-book ghp-import

# Copy Source
COPY . /app

# Build Jupyter Book
RUN jupyter-book build .

# 기본 커맨드: 빌드 후 gh-pages로 배포 (원할 때 수동 실행 가능)
# CMD ["bash", "-c", "jupyter-book build . && ghp-import -n -p _build/html"]

CMD ["bash"]