# Use the official MySQL image from Docker Hub
FROM mysql:8.0

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=welcome123
ENV MYSQL_DATABASE=dcdslproject
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=welcome123

# Expose MySQL port
EXPOSE 3306

# By default, MySQL starts automatically
