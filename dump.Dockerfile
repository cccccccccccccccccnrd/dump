FROM denoland/deno:latest

WORKDIR /app/back
EXPOSE 8782

COPY ./src /app

RUN deno install

CMD ["deno", "run", "--allow-net", "--allow-read", "--allow-write", "main.ts"]