# See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src

COPY ["initiatives.csproj", "./"]
# Adjust the path to match the location of "fund-entities" in your directory structure
RUN dotnet restore "./initiatives.csproj"

COPY . .
RUN dotnet publish -c Debug -o /app/publish

FROM base AS final
WORKDIR /app/publish
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "initiatives.dll"]
