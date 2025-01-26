# Use an official OpenJDK runtime for Java 19
FROM openjdk:19-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the built jar file into the container
COPY build/libs/portfolio-site-backend-1.0-SNAPSHOT.jar app.jar

# Expose the port your application runs on (default 8080)
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
