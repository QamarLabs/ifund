# Define the base image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

# Define the build image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# Copy and restore project files
COPY ["common.csproj", "common/"]
RUN dotnet restore "./common.csproj"

# Copy the entire project and build
COPY . .
WORKDIR "/src/common"
RUN dotnet build "./common.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "./common.csproj" -c Release -o /app/publish

# Create the final image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "common.dll"]
